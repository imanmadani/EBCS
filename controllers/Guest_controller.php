<?php

class Guest_controller extends controller
{
    public function Login($query)
    {
        $username = $this->getVal('Username', $query);
        $password = $this->getVal('Password', $query);
        $row = $this->_model->Login($username, $password);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
}