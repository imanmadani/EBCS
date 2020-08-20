<?php
define ('DS', DIRECTORY_SEPARATOR);
define ('HOME', dirname(dirname(__FILE__)));
require_once HOME . DS . 'config.php';
require_once "api-client.php";
include("../utilities/response.php");

//if (isset($_GET['id']))
//{
//    $params = explode("/", $_GET['id']);
//    if (isset($params[1]) && !empty($params[1]))
//    {
//        $action = $params[1];
//    }
//}
$api=new APIClient();
$res=$api->request("User",Get,array('fid'=>3));
?>