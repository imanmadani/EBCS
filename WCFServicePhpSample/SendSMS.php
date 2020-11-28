<?php
//ini_set("soap.wsdl_cache_enabled", "0");
$sms_client = new SoapClient('http://payamak-service.ir/SendService.svc?wsdl', array('encoding'=>'UTF-8'));

try {
	$parameters['userName'] = "c.malek64";
	$parameters['password'] = "06831";
	$parameters['fromNumber'] = "10009611";
	$parameters['toNumbers'] = array("09121969432");
	$parameters['messageContent'] = "تست";
	$parameters['isFlash'] = false;
	$recId = array(0);
	$status = 0x0;
	$parameters['recId'] = &$recId ;
	$parameters['status'] = &$status ;
	echo $sms_client->SendSMS($parameters)->SendSMSResult;
} 
catch (Exception $e) 
{
	echo 'Caught exception: ',  $e->getMessage(), "\n";
}

?>