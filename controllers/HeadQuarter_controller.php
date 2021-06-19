<?php
require_once '../entity/ExhibitionHall.php';
class HeadQuarter_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetTask($query)
    {
        $rows = $this->_model->getTask();
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
        $groupId = 9;
        $name = $this->getVal('Name', $query);
        $mobile = $this->getVal('Mobile', $query);
        $rows = $this->_model->create($groupId,$name,$mobile);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function Update($query)
    {
        $id = $this->getVal('UserId', $query);
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
    public function Accept($query)
    {
        $boothId = $this->getVal('Id', $query);
        $rows = $this->_model->accept($boothId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}
