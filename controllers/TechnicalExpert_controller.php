<?php
require_once '../entity/ExhibitionHall.php';
class TechnicalExpert_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetTechnicalExpertTask($query)
    {
        $technicalExpertId = $this->getVal('TechnicalExpertId', $query);
        $rows = $this->_model->getTechnicalExpertTask($technicalExpertId);
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
    public function GetPlanByBoothBoothbuilderId($query)
    {
        $boothBoothbuilderId = $this->getVal('BoothBoothbuilderId', $query);
        $rows = $this->_model->getPlanByBoothBoothbuilderId($boothBoothbuilderId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function Create($query)
    {
        $username = $this->getVal('Username', $query);
        $password = $this->getVal('Password', $query);
        $groupId = $this->getVal('GroupId', $query);
        $name = $this->getVal('Name', $query);
        $rows = $this->_model->create($username,$password,$groupId,$name);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
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
    public function BoothApprove($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->boothApprove($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function BoothDisApprove($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->boothDisApprove($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}