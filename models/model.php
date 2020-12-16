<?php
require_once "../Enum/IPG-Enum.php";

class model
{
    protected $conn;

    public function __construct()
    {
        //3306
        $this->conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, 3308);
        mysqli_query($this->conn, "SET NAMES " . DB_COLL);

    }

    public function execQuery($sql)
    {
        $res = mysqli_query($this->conn, $sql);
        return $res;
    }


    public function getAll($sql)
    {
        $res = mysqli_query($this->conn, $sql);
        $rows = array();
        while ($row = mysqli_fetch_assoc($res))
            $rows[] = $row;
        return $rows;
    }

    public function getRow($sql)
    {
        $res = mysqli_query($this->conn, $sql);
        $row = mysqli_fetch_assoc($res);
        return $row;
    }

    public function getUserByToken($token, $ip)
    {
        $row = $this->getRow("SELECT * FROM `token` AS myToken INNER JOIN users As myUser ON myToken.UserId=myUser.Id WHERE TokenCode='$token' and Ip='$ip'");
        return ($row);
    }

    public function checkToken($token, $ip)
    {
        $row = $this->getRow("SELECT myToken.Id FROM `token` AS myToken INNER JOIN users As myUser ON myToken.UserId=myUser.Id WHERE TokenCode='$token' and Ip='$ip'");
        return ($row);
    }

    public function getTokenHistoryByTokenId($token)
    {
        $row = $this->getRow("SELECT * FROM tokenhistory WHERE TokenId=$token AND InsertTime<=NOW() ORDER BY Id LIMIT 1");
        return ($row);
    }

    public function setTokenHistory($tokenId, $controller, $method)
    {
        $sqlTokenHistory = "INSERT INTO `tokenhistory`(`TokenId`, `Controller`, `Method`)
                                                  VALUES($tokenId,'$controller','$method')";
        $row = $this->execQuery($sqlTokenHistory);
        return ($row);
    }

    public function unvalidToken($tokenId)
    {
        $sqlTokenHistory = "UPDATE `token` SET `FlagValid`=0 WHERE `Id`=$tokenId";
        $row = $this->execQuery($sqlTokenHistory);
        return ($row);
    }

    public function sendSms($mobile, $text)
    {
        $text = $text . "\n" . "نمایشگاه بین المللی تهران";
        $sms_client = new SoapClient('http://payamak-service.ir/SendService.svc?wsdl', array('encoding' => 'UTF-8'));
        $parameters['userName'] = "c.malek64";
        $parameters['password'] = "06831";
        $parameters['fromNumber'] = "10009611";
        $parameters['toNumbers'] = array($mobile);
        $parameters['messageContent'] = $text;
        $parameters['isFlash'] = false;
        $recId = array(0);
        $status = 0x0;
        $parameters['recId'] = &$recId;
        $parameters['status'] = &$status;
        $result = $sms_client->SendSMS($parameters)->SendSMSResult;
        if ($result == 0) {
            return true;
        } else {
            return false;
        }

    }

    public function saleRequest()
    {
        $url = 'https://sadad.shaparak.ir/VPG/Purchase';
        $data = array(
            'MerchantId' => IPGEnum::MerchantId,
            'TerminalId' => IPGEnum::TerminalId,
            'Amount' => 'value2',
            'OrderId' => 'value2',
            'LocalDateTime' => 'value2',
            'ReturnUrl' => 'value2',
            'SignData' => 'value2',
            'PaymentIdentity' => 'value2'
        );
        $options = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ),
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
    }

    public function verhoeff($value, $amount)
    {
        $value = (string)$value;
        $amount = (string)$amount;
        $valuLength = strlen($value);
        $valueLoopCount = 11 - $valuLength;
        for ($i = $valueLoopCount; $i > 0; $i--) {
            $value = "0".$value;
        }
        $amountLength = strlen($amount);
        $amountLoopCount = 15 - $amountLength;
        for ($i = $amountLoopCount; $i > 0; $i--) {
            $amount = "0".$amount;
        }
        $staticNumber = "2"."0579"."74"."293350"."6617".$value;
        $v1 = $staticNumber.$amount;
        $v2 = strrev($staticNumber).strrev($amount);
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
        //verhof
        $c = 0;
        $len = strlen($v1);
        for ($i = 0; $i < $len; ++$i) {
            $c = $multiplicationTable[$c][$permutationTable[(($i + 1) % 8)][$v1[$len - $i - 1] - '0']];
        }
        $result1 = (string)$inverseTable[$c];
        //verhofRev
        $c = 0;
        $klen = strlen($v2);
        for ($i = 0; $i < $len; ++$i) {
            $c = $multiplicationTable[$c][$permutationTable[(($i + 1) % 8)][$v2[$len - $i - 1] - '0']];
        }
        $result2 = (string)$inverseTable[$c];
        $resultFinal="2".$result1.$result2."0579"."74"."293350"."6617".$value;
        return $resultFinal;
    }
}

?>