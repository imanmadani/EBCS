<?php
class APIPublic
{
    public function request($class, $method, $params = [])
    {
        if (file_exists(HOME . DS . 'utilities' . DS . strtolower($class) . '.php')) {
            require_once HOME . DS . 'utilities' . DS . strtolower($class) . '.php';
        }
        if (file_exists(HOME . DS . 'models' . DS . strtolower($class) . '_model.php')) {
            require_once HOME . DS . 'models' . DS . 'model.php';
            require_once HOME . DS . 'models' . DS . strtolower($class) . '_model.php';
        }
        if (file_exists(HOME . DS . 'controllers' . DS . strtolower($class) . '_controller.php')) {
            require_once HOME . DS . 'controllers' . DS . 'controller.php';
            require_once HOME . DS . 'controllers' . DS . strtolower($class) . '_controller.php';
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