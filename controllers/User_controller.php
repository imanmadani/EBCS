<?php

class User_controller extends controller
{
    public function Get($query)
    {
        $groupId = $this->getVal('GroupId', $query);
        $rows = $this->_model->get($groupId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetById($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->getById($id);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }
    public function Create($query)
    {
        $username = $this->getVal('Username', $query);
        $password = $this->getVal('Password', $query);
        $groupId = $this->getVal('GroupId', $query);
        $rows = $this->_model->create($username,$password,$groupId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $username = $this->getVal('Username', $query);
        $rows = $this->_model->update($id,$username);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Delete($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->delete($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }

//    public function Login($query)
//    {
//        $username = $this->getVal('Username', $query);
//        $password = $this->getVal('Password', $query);
//        $row = $this->_model->Login($username, $password);
//        $this->_res->set("row", $row);
//        $this->_res->output();
//    }


    public function Logout($query)
    {
        $token = $this->getVal('Token', $query);
        $row = $this->_model->Logout($token);
        $this->_res->set("row", $row);
        $this->_res->output();
    }

    public function GetMenuByUser()
    {
        $row = $this->_model->GetMenuByUser();
        $this->_res->set("row", $row);
        $this->_res->output();
    }

}