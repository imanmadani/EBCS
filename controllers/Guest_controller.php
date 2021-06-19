<?php

class Guest_controller extends controller
{
    public function Login($query)
    {
        $username = $this->getVal('Username', $query);
        $password = $this->getVal('Password', $query);
        $row = $this->_model->login($username, $password);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function GetExhibitionActive()
    {
        $rows = $this->_model->getExhibitionActive();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetBoothsByHall($query)
    {
        $exhibitionHallId = $this->getVal('ExhibitionHallId', $query);
        $rows = $this->_model->getBoothsByHall($exhibitionHallId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function ForgetPass($query)
    {
        $mobile = $this->getVal('Username', $query);
        $rows = $this->_model->forgetPass($mobile);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }

}
