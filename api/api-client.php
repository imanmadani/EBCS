<?php

class APIClient
{
    public function request($class, $method, $params = [])
    {
        $head = getallheaders();
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
        $checkToken = $load->checkToken($head['token']);
        if ($checkToken) {
            $checkTokenHistory = $load->checkTokenHistory($checkToken['Id']);
            $checkTokenHistory['InsertTime'];
            $tokenHistoryDate = date_create($checkTokenHistory['InsertTime']);
            $nowDate = date_create('now');
            $diff = date_diff($tokenHistoryDate, $tokenHistoryDate);
            $hDif = (int)$diff->format("%H");
            $mDifF = (int)$diff->format("%I");
            if ($checkTokenHistory and $hDif > 0 or $mDifF > 20) {
                $load->UnvalidToken($checkToken['Id']);
                $load->error("expire");
            } else {
                $load->setTokenHistory($checkToken['Id'], $controller, $method);
                if (method_exists($load, $method)) {
                    $load->$method($params);
                } else {
                    $load->error("invalid metod");
                }
            }
        } else {
            $load->error("invalid token");
        }
    }
}

?>