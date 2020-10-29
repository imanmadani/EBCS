<?php
class FinancialExpert_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetFinancialExpertsTask($query)
    {
        $hallAdminId = $this->getVal('HallAdminId', $query);
        $rows = $this->_model->getFinancialExpertTask($hallAdminId);
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
        $groupId = 7;
        $name = $this->getVal('Name', $query);
        $rows = $this->_model->create($username,$password,$groupId,$name);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $name = $this->getVal('Name', $query);
        $rows = $this->_model->update($id,$name);
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
    public function AcceptPay($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->acceptPay($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}