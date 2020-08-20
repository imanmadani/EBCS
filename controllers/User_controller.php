<?php

class User_controller extends controller
{
    public function Get($query)
    {
        $rows = $this->_model->getRows();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }

    public function Login($query)
    {
        $username = $this->getVal('Username', $query);
        $password = $this->getVal('Password', $query);
        $row = $this->_model->Login($username, $password);
        $this->_res->set("row", $row);
        $this->_res->output();
    }


    public function Logout($query)
    {
        $token = $this->getVal('Token', $query);
        $row = $this->_model->Logout($token);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
}