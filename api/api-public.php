<?php
class APIPublic
{
    public function request($class, $method, $params = [])
    {
        if (file_exists('../utilities' . DS . strtolower($class) . '.php')) {
            require_once '../utilities' . DS . strtolower($class) . '.php';
        }
        if (file_exists('../models' . DS . strtolower($class) . '_model.php')) {
            require_once '../models' . DS . 'model.php';
            require_once '../models' . DS . strtolower($class) . '_model.php';
        }
        if (file_exists('../controllers' . DS . strtolower($class) . '_controller.php')) {
            require_once '../controllers' . DS . 'controller.php';
            require_once '../controllers' . DS . strtolower($class) . '_controller.php';
        }
        $modelName = $class;
        $controller = $class . '_controller';
        $load = new $controller($modelName, $method);
            if (method_exists($load, $method)) {
                $load->$method($params);
            } else {
                $load->error("invalid metod");
            }
    }
}
?>