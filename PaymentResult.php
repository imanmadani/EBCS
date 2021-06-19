<?php
require_once "./Enum/BillType-Enum.php";
require_once "./Enum/IPG-Enum.php";
require_once "config.php";
function execQuery($c,$sql)
{
    $res = mysqli_query($c, $sql);
    return $res;
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
function encrypt($str, $key)
{
    $key = base64_decode($key);
    $ciphertext = OpenSSL_encrypt($str, "DES-EDE3", $key, OPENSSL_RAW_DATA);
    return base64_encode($ciphertext);
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
        $res=CallAPI('https://sadad.shaparak.ir/VPG/api/v0/Advice/Verify',$str_data);
        $arrres=json_decode($res);
    }
    if($arrres->ResCode!=-1 && $arrres->ResCode==0)
    {
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, 3308);
        mysqli_query($conn, "SET NAMES " . DB_COLL);
        $sqlUpdateBill = "UPDATE `bills` SET `PayStatus`=1 , `SystemTrace`=$arrres->SystemTraceNo , `RetrivalRef`=$arrres->RetrivalRefNo WHERE `Id`=$arrres->OrderId";
        $row = execQuery($conn,$sqlUpdateBill);
        sleep(3);
        return $arrres;
    }
    else
        return "تراکنش نا موفق بود در صورت کسر مبلغ از حساب شما حداکثر پس از 72 ساعت مبلغ به حسابتان برمی گردد.";
}
if(isset($_POST["OrderId"]) and isset($_POST["ResCode"]) and $_POST["ResCode"] ==0){

    $res=verifyPayment($_POST["OrderId"],$_POST["token"],$_POST["ResCode"]);
    if(isset($res->ResCode) and $res->ResCode==0){
        header("Location: https://design.iranfair.com/Dashboard/PaymentResult?ResCode=".$res->ResCode."&Amount=".$res->Amount."&Description=".$res->Description."&RetrivalRefNo=".$res->RetrivalRefNo."&SystemTraceNo=".$res->SystemTraceNo."&OrderId=".$res->OrderId);
    }else{
        header("Location: https://design.iranfair.com/Dashboard/PaymentResult?ResCode=-1"."&Amount=".$res->Amount."&Description=".$res->Description."&RetrivalRefNo=".$res->RetrivalRefNo."&SystemTraceNo=".$res->SystemTraceNo."&OrderId=".$res->OrderId);

    }
}else{
    header("Location: https://design.iranfair.com/Dashboard/PaymentResult?ResCode=-1"."&Amount=".$res->Amount."&Description=".$res->Description."&RetrivalRefNo=".$res->RetrivalRefNo."&SystemTraceNo=".$res->SystemTraceNo."&OrderId=".$res->OrderId);
}
