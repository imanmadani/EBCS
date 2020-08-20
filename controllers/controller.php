<?php

class controller
{
    protected $_model;
    protected $_controller;
    protected $_action;
    protected $_res;
    protected $_modelBaseName;


    public function __construct($model, $action)
    {
        $this->_controller = ucwords(__CLASS__);
        $this->_action = $action;
        $this->_modelBaseName = $model;
        $modelName = $model . '_model';
        $this->_model = new $modelName();
        $this->_res = new Response();
    }

    protected function getVal($key, $params)
    {
        if (isset($params[$key]))
            return addslashes($params[$key]);
        else "";
    }

    public function checkToken($query)
    {
        $token = $this->getVal('token', $query);
        $ip=$_SERVER['REMOTE_ADDR'];
        $row = $this->_model->getUserByToken($token,$ip);
        if ($row) return true;
        return false;
    }

    public function setTokenHistory($tokenId,$controller,$method)
    {
        $row = $this->_model->setTokenHistory($tokenId,$controller,$method);
        if ($row) return true;
        return false;
    }

    public function error($message = "error")
    {
        $this->_res->output(400, $message);
    }

}

?>