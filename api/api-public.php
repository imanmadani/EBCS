<?php
class APIPublic
{
    public function request($class, $method, $params = [])
    {
        if (file_exists('../utilities' . DS . $class . '.php')) {
            require_once '../utilities' . DS . $class . '.php';
        }
        if (file_exists('../models' . DS . $class . '_model.php')) {
            require_once '../models' . DS . 'model.php';
            require_once '../models' . DS . $class. '_model.php';
        }
        if (file_exists('../controllers' . DS . $class . '_controller.php')) {
            require_once '../controllers' . DS . 'controller.php';
            require_once '../controllers' . DS . $class . '_controller.php';
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