<?php
define ('DS', DIRECTORY_SEPARATOR);
define ('HOME', dirname(dirname(__FILE__)));
require_once '../config.php';
require_once "api-client.php";
include("../utilities/response.php");
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    if(count($_GET)>0){
        $params=$_GET;
    }

} elseif($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $json = file_get_contents('php://input');
    if($json){
        $params = json_decode($json,true);
    }
}
elseif($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    if($json){
        $params = json_decode($json,true);
    }
}


$method = $_GET['api'];
$api=new APIClient();
$res=$api->request("BoothBuilder",$method,$params);

?>