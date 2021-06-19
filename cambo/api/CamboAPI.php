<?php
//header('Content-Type: application/json');
require_once('../lib/nusoap/nusoap.php');
//variable
$errorCode = 1;
$errorMessage = '';
$MaterialDocumentNumber = '';

//get value from json function
function getVal($key, $params)
{
    if (isset($params[$key]))
        return addslashes($params[$key]);
    else "";
}

//create output function
function output($status = 1000, $message = "OK", $data = [])
{
    $res['status'] = $status;
    $res['message'] = $message;
    $res['data'] = $data;
    $res = json_encode($res);
    echo $res;
    exit;
}


if(isset($_GET['Dev'])){
    $sap_url = 'http://evrsapqa01.everestmodern.local:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zrt_ws_001/700/zrt_ws_001/zrt_ws_001?sap-client=700';
    $sap_migox_url = 'http://evrsapqa01.everestmodern.local:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zrt_ws_001/700/zrt_ws_001/zrt_ws_001?sap-client=700';
    $sap_user = 'RFC_B2B';
    $sap_pass = '345Er12!';
    $errorCode=0;
}
if(isset($_GET['Live'])){
    $sap_url = 'http://evrsapprod.everestmodern.local:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zrt_ws_001/700/zrt_ws_001/zrt_ws_001?sap-client=700';
    $sap_migox_url = 'http://evrsapprod.everestmodern.local:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zrt_ws_001/700/zrt_ws_001/zrt_ws_001?sap-client=700';
    $sap_user = 'RFC_ERS';
    $sap_pass = 'ERS@2020';
    $errorCode=0;

}

//get input json from user
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = file_get_contents('php://input');
    if ($json) {
        $params = json_decode($json, true);
    } else {
        $errorCode = 1001;
        $errorMessage = 'Error in input data';
        output($errorCode, $errorMessage, []);
    }
} else {
    $json = '[
    {"ID":17,"Vendor":10139,"Material":"1068535","Plant":"1273","IDeliveryNote":"TEST4","IDocDate":"2021-01-18","IPstngDate":"2021-01-18","Quantity":25.00,"Unit":"KI"},
    {"ID":15,"Vendor":10139,"Material":"1072968","Plant":"1273","IDeliveryNote":"TEST4","IDocDate":"2021-01-18","IPstngDate":"2021-01-18","Quantity":30.00,"Unit":"KI"},
    {"ID":16,"Vendor":10139,"Material":"1079781","Plant":"1273","IDeliveryNote":"TEST4","IDocDate":"2021-01-18","IPstngDate":"2021-01-18","Quantity":40.00,"Unit":"KI"}]';
    $params = json_decode($json, true);
}
if ($errorCode == 0) {
    //connect to sap
    $sap_client = new nusoap_client($sap_url, 'wsdl');
    $sap_client->decodeUTF8(false);
    $sap_client->setCredentials($sap_user, $sap_pass, 'basic');
    $sap_paramsItems = array();
    $counter = 10;
    $sap_paramsItems['IProcess'] = 'I';
    $sap_paramsItems['IsHeader']['DocType'] = 'NB';
    $sap_paramsItems['IsHeader']['DocDate'] = getVal('IDocDate', $params[0]);
    $sap_paramsItems['IsHeader']['Vendor'] = '00000' . getVal('Vendor', $params[0]);
    $sap_paramsItems['IsHeader']['PurchOrg'] = 'IR51';
    $sap_paramsItems['IsHeader']['PurGroup'] = '101';
    $sap_paramsItems['IsHeader']['CompCode'] = 'IR50';
    $sap_paramsItems['ItItem']['item']=array();
    foreach ($params as $sap_params) {
        $sap_paramsItem = array();
        $sap_paramsItem['Material'] = '00000000000' . getVal('Material', $sap_params);
        $sap_paramsItem['Plant'] = getVal('Plant', $sap_params);
        $sap_paramsItem['StgeLoc'] = '0001';
        $sap_paramsItem['Quantity'] = getVal('Quantity', $sap_params);
        $sap_paramsItem['PoUnit'] = getVal('Unit', $sap_params);
        $sap_paramsItem['NetPrice'] = '1';
        $sap_paramsItem['PriceUnit'] = '1';
        $sap_paramsItem['PurchaseItem'] = $counter;
        array_push($sap_paramsItems['ItItem']['item'], $sap_paramsItem);
        $counter = $counter + 10;
    }
    $ty=json_encode($sap_paramsItems);
    print_r($ty);
    $sap_result = $sap_client->call('ZrtFm036', $sap_paramsItems);
    if ($sap_result['EvPoNumber']) {
        $PONumber = strval($sap_result['EvPoNumber']);
    } else {
        $errorCode = 1002;
        $errorMessage = 'SAP ZrtFm036 Error : ' . $sap_result['EtReturn']['item'][0]['Message'];
        output($errorCode, $errorMessage, []);
    }
    if ($errorCode == 0 and $PONumber) {
        $sap_migox_client = new nusoap_client($sap_url, 'wsdl');
        $sap_migox_client->decodeUTF8(false);
        $sap_migox_client->setCredentials($sap_user, $sap_pass, 'basic');
        $sap_migox_paramsItems = array();
        $counter = 10;
        $sap_migox_paramsItems['IDeliveryNote'] = getVal('IDeliveryNote', $params[0]);
        $sap_migox_paramsItems['IDocDate'] = getVal('IDocDate', $params[0]);
        $sap_migox_paramsItems['IPstngDate'] = getVal('IPstngDate', $params[0]);
        $sap_migox_paramsItems['ItItem']['item']=array();
        foreach ($params as $sap_migox_params) {
            $sap_migox_paramsItem = array();
            $sap_migox_paramsItem['PurchaseOrder'] = $PONumber;
            $sap_migox_paramsItem['PurchaseItem'] = strval($counter);
            $sap_migox_paramsItem['Material'] = '00000000000' . getVal('Material', $sap_migox_params);
            $sap_migox_paramsItem['Quantity'] = getVal('Quantity', $sap_migox_params);
            $sap_migox_paramsItem['Unit'] = getVal('Unit', $sap_migox_params);
            $sap_migox_paramsItem['Plant'] = getVal('Plant', $sap_migox_params);
            $sap_migox_paramsItem['StorageLoc'] = '0001';
            array_push($sap_migox_paramsItems['ItItem']['item'], $sap_migox_paramsItem);
            $counter = $counter + 10;
        }
        $tryCount=5;
        while ($MaterialDocumentNumber == '' || $tryCount<1 ) {
            sleep(1);
            $sap_migox_result = $sap_migox_client->call('ZrtFm027', $sap_migox_paramsItems);
            $MaterialDocumentNumber = $sap_migox_result['EMaterialdocument'];
            $tryCount=$tryCount-1;
        }
        $result = (object)array('PONumber' => '' . $PONumber, 'EMaterialdocument' => '' . $MaterialDocumentNumber);
        output(200, 'Success', $result);
    } else {
        $errorCode = 1003;
        $errorMessage = 'SAP ZrtFm027 Error : ' . $sap_result['EtReturn']['item'][0]['Message'];
        output($errorCode, $errorMessage, []);
    }
} else {
    $errorCode = 1004;
    $errorMessage = 'Bad Request';
    output($errorCode, $errorMessage, []);
}
?>





