<?php
ini_set("soap.wsdl_cache_enabled", "0");
$sms_client = new SoapClient('http://payamak-service.ir/SendService.svc?wsdl', array('encoding'=>'UTF-8'));

$parameters['userName'] = "your user name";
$parameters['password'] = "your password";

echo $sms_client->GetCredit($parameters)->GetCreditResult;
?>