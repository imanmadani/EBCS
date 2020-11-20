<?php
class APIParticipant
{
    public function request($class, $method, $params = [])
    {
        $head=getallheaders();
        if (file_exists('../utilities' . DS . $class . '.php')) {
            require_once '../utilities' . DS . $class . '.php';
        }
        if (file_exists('../models' . DS . $class . '_model.php')) {
            require_once '../models' . DS . 'model.php';
            require_once '../models' . DS . $class . '_model.php';
        }
        if (file_exists('../controllers' . DS . $class . '_controller.php')) {
            require_once '../controllers' . DS . 'controller.php';
            require_once '../controllers' . DS . $class . '_controller.php';
        }
        $modelName = $class;
        $controller = $class . '_controller';
        $load = new $controller($modelName, $method);
//        $checkToken=$load->checkToken($head['token']);
//        if ($checkToken) {
//            $load->setTokenHistory($checkToken['Id'],$controller,$method);
            if (method_exists($load, $method)) {
                $load->$method($params);
            } else {
                $load->error("invalid metod");
            }
//        } else {
//            $load->error("invalid token");
//        }
    }
}
?>