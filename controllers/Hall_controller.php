<?php

class Hall_controller extends controller
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
    public function Create($query)
    {
        $title = $this->getVal('Title', $query);
        $gradeId = $this->getVal('GradeId', $query);
        $area = $this->getVal('Area', $query);
        $minimumArea = $this->getVal('MinimumArea', $query);
        $rows = $this->_model->create($title,$gradeId,$area,$minimumArea);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $title = $this->getVal('Title', $query);
        $gradeId = $this->getVal('GradeId', $query);
        $rows = $this->_model->update($id,$title,$gradeId);
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
    public function GradeDropDown()
    {
        $rows = $this->_model->gradeDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function AssignHallAdmin($query)
    {
        $salonId = $this->getVal('SalonId', $query);
        $hallAdmin = $this->getVal('SalonId', $query);
        $rows = $this->_model->assignHallAdmin($salonId,$hallAdmin);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function DeleteAssignHallAdmin($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteassignHallAdmin($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    
}
