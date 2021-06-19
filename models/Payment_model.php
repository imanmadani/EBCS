<?php

require_once "../Enum/BillType-Enum.php";
require_once "../Enum/ApproveState-Enum.php";
class Payment_model extends model
{
    public function verhoeff($value, $amount,$billId)
    {
        $value = (string)$value;
        $amount = (string)$amount;//'10000';
        $valuLength = strlen($value);
        $valueLoopCount = 11 - $valuLength;
        for ($i = $valueLoopCount; $i > 0; $i--) {
            $value = "0" . $value;
        }
        $amountLength = strlen($amount);
        $amountLoopCount = 15 - $amountLength;
        for ($i = $amountLoopCount; $i > 0; $i--) {
            $amount = "0" . $amount;
        }
        $staticNumber = "2" . "0579" . "74" . "293350" . "6617" . $value;
        $v1 = $staticNumber . $amount;
        $v2 = strrev($staticNumber) . strrev($amount);
        $multiplicationTable = array(
            array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9),
            array(1, 2, 3, 4, 0, 6, 7, 8, 9, 5),
            array(2, 3, 4, 0, 1, 7, 8, 9, 5, 6),
            array(3, 4, 0, 1, 2, 8, 9, 5, 6, 7),
            array(4, 0, 1, 2, 3, 9, 5, 6, 7, 8),
            array(5, 9, 8, 7, 6, 0, 4, 3, 2, 1),
            array(6, 5, 9, 8, 7, 1, 0, 4, 3, 2),
            array(7, 6, 5, 9, 8, 2, 1, 0, 4, 3),
            array(8, 7, 6, 5, 9, 3, 2, 1, 0, 4),
            array(9, 8, 7, 6, 5, 4, 3, 2, 1, 0)
        );
        $permutationTable = array(
            array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9),
            array(1, 5, 7, 6, 2, 8, 3, 0, 9, 4),
            array(5, 8, 0, 3, 7, 9, 6, 1, 4, 2),
            array(8, 9, 1, 6, 0, 4, 3, 5, 2, 7),
            array(9, 4, 5, 3, 1, 2, 6, 8, 7, 0),
            array(4, 2, 8, 6, 5, 7, 3, 9, 0, 1),
            array(2, 7, 9, 3, 8, 0, 6, 4, 1, 5),
            array(7, 0, 4, 6, 9, 1, 3, 2, 5, 8)
        );
        $inverseTable = array(0, 4, 3, 2, 1, 5, 6, 7, 8, 9);
        $c = 0;
        $len = strlen($v1);
        for ($i = 0; $i < $len; ++$i) {
            $c = $multiplicationTable[$c][$permutationTable[(($i + 1) % 8)][$v1[$len - $i - 1] - '0']];
        }
        $result1 = (string)$inverseTable[$c];
        $c = 0;
        $klen = strlen($v2);
        for ($i = 0; $i < $len; ++$i) {
            $c = $multiplicationTable[$c][$permutationTable[(($i + 1) % 8)][$v2[$len - $i - 1] - '0']];
        }
        $result2 = (string)$inverseTable[$c];
        $resultFinal = "2" . $result1 . $result2 . "0579" . "74" . "293350" . "6617" . $value;
        $sqlUpdateBill = "UPDATE `bills` SET `BillIdentity`='$resultFinal' , `Amount`=$amount WHERE `Id`=$billId";
        $row = $this->execQuery($sqlUpdateBill);
        $resPSP=$this->sendToPSP($amount,$resultFinal,BillTypeEnum::ExhibitionService,$billId);
        return $resPSP;
    }


    function sendToPSP($amount,$orderId,$billype,$billId)
    {

        $key = strval(IPGEnum::TerminalKey);
        $MerchantId = strval(IPGEnum::MerchantId);
        $TerminalId = strval(IPGEnum::TerminalId);
        $Amount = (int)$amount; //10000;Rials $amount
        $OrderId = strval($billId);
        $OrderIdentity=strval($orderId);
        $LocalDateTime = date("m/d/Y g:i:s a");
        $ReturnUrl = "https://design.iranfair.com/PaymentResult.php";
        $SignData = $this->encrypt("$TerminalId;$OrderId;$Amount", "$key");
        $data = array('TerminalId' => $TerminalId,
            'MerchantId' => $MerchantId,
            'Amount' => $Amount,
            'SignData' => $SignData,
            'ReturnUrl' => $ReturnUrl,
            'LocalDateTime' => $LocalDateTime,
            'PaymentIdentity' =>$OrderIdentity,
            'OrderId' => $OrderId);
        $str_data = json_encode($data);
        //$res = $this->CallAPI('https://sadad.shaparak.ir/vpg/api/v0/Request/PaymentRequest', $str_data);
        $res = $this->CallAPI('https://sadad.shaparak.ir/api/v0/PaymentByIdentity/PaymentRequest', $str_data);

        $arrres = json_decode($res);
        if ($arrres->ResCode == '0') {
            $Token = $arrres->Token;
            $url ="https://sadad.shaparak.ir/VPG/Purchase?Token=$Token";
            return $url;
            // header('Location:http://design.iranfair.com/');

        } else
            die($arrres->Description);

    }

    function verifyPayment($orderId,$token,$resCode){
        $key=strval(IPGEnum::TerminalKey);
        $OrderId=$orderId;
        $Token=$token;
        $ResCode=$resCode;
        if($ResCode==0)
        {
            $verifyData = array('Token'=>$Token,'SignData'=>encrypt($Token,$key));
            $str_data = json_encode($verifyData);
            $res=CallAPI('https://sadad.shaparak.ir/vpg/api/v0/Advice/Verify',$str_data);
            $arrres=json_decode($res);
        }
        if($arrres->ResCode!=-1 && $arrres->ResCode==0)
        {
            //Save $arrres->RetrivalRefNo,$arrres->SystemTraceNo,$arrres->OrderId to DataBase
            $sqlUpdateBill = "UPDATE `bills` SET `PayStatus`=1 AND `SystemTrace`=$arrres->SystemTraceNo AND `RetrivalRef`=$arrres->RetrivalRefNo WHERE `Id`=$arrres->OrderId";
            $row = $this->execQuery($sqlUpdateBill);
            return $arrres;
        }
        else
            return "تراکنش نا موفق بود در صورت کسر مبلغ از حساب شما حداکثر پس از 72 ساعت مبلغ به حسابتان برمی گردد.";
    }

    function encrypt($str, $key)
    {
        $key = base64_decode($key);
        $ciphertext = OpenSSL_encrypt($str, "DES-EDE3", $key, OPENSSL_RAW_DATA);
        return base64_encode($ciphertext);
    }
    function CallAPI($url, $data = false)
    {
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($data)));
        $result = curl_exec($curl);
        curl_close($curl);
        return $result;
    }
    function  getBillStatusByBooth($BoothId){
        $billType=BillTypeEnum::ExhibitionService;
        $sql = "SELECT	
	                myBill.Id,
                    myBill.BoothId,
                    myBill.PayStatus,
                    myBooth.Id,
                    myBooth.AreaRial,
                    myBooth.AreaArz,
                    myBooth.Area2,
                    myBooth.AreaType,
                    myBooth.ConstructionType
                FROM `bills` AS myBill
                INNER JOIN `booths` AS myBooth ON myBooth.Id = myBill.BoothId 
                WHERE
                myBill.BoothId=$BoothId 
                AND myBill.BillType=$billType 
                AND myBill.FlagDelete=0 
                AND myBill.FlagBlock=0";
        $rows = $this->getRow($sql);
        return $rows;
    }
    function getBillById($OrderId){
        $sql = "SELECT 
                    myBooth.Name,
                    myPartyDetail.CompanyName
                FROM `bills` AS myBill
                INNER JOIN `booths` As myBooth ON myBill.BoothId=myBooth.Id
                INNER JOIN `participants` AS myParty ON myBooth.ParticipantId=myParty.Id
                INNER JOIN `participantdetails` AS myPartyDetail ON myParty.Id=myPartyDetail.ParticipantId
                WHERE myBill.Id=$OrderId";
        $rows = $this->getRow($sql);
        return $rows;
    }

}
