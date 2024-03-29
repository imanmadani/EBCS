<?php

class User_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
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
    public function GetByToken()
    {
        $row = $this->_model->getByToken();
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function Create($query)
    {
        $username = $this->getVal('Username', $query);
        $password = $this->getVal('Password', $query);
        $groupId = $this->getVal('GroupId', $query);
        $rows = $this->_model->create($username,$password,$groupId);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $username = $this->getVal('Username', $query);
        $rows = $this->_model->update($id,$username);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function Delete($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->delete($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }


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
    public function ChangePass($query)
    {
        $mobile = $this->getVal('Password', $query);
        $rows = $this->_model->changePass($mobile);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }

}
