<?php

class Exhibition_controller extends controller
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
        $year = $this->getVal('Year', $query);
        $gradeId = $this->getVal('GradeId', $query);
        $rows = $this->_model->create($title,$year,$gradeId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $title = $this->getVal('Title', $query);
        $year = $this->getVal('Year', $query);
        $gradeId = $this->getVal('GradeId', $query);
        $rows = $this->_model->update($id,$title,$year,$gradeId);
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
    public function GradeDropDown()
    {
        $rows = $this->_model->gradeDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    
}