<?php
define ('DS', DIRECTORY_SEPARATOR);
define ('HOME', dirname(dirname(__FILE__)));
require_once HOME . DS . 'config.php';
require_once "api-client.php";
include("../utilities/response.php");
if(count($_GET)>0){
    $params=$_GET;
}
 $json = file_get_contents('php://input');
 if($json){
 $params = json_decode($json,true);
 }
$method = $_GET['api'];
$api=new APIClient();
$res=$api->request("Group",$method,$params);

?>