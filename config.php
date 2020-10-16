<?php 
define ('DB_HOST', 'localhost'); 
define ('DB_NAME', 'exhibition');
define ('DB_USER', 'root');
define ('DB_PASS', '');
define ('DB_COLL', 'utf8');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods: PUT, POST, GET, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Credentials:true');
header('Content-Type: application/json');


?>