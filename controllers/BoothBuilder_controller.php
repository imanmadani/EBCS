<?php

class BoothBuilder_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetGrade()
    {
        $rows = $this->_model->getGrade();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetBoothBuilderTask($query)
    {
        $rows = $this->_model->getBoothBuilderTask();
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
    public function GetGradeById($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->getGradeById($id);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }
    public function Create($query)
    {
        $username = $this->getVal('Username', $query);
        $password = $this->getVal('Password', $query);
        $groupId =5;
        $name = $this->getVal('Name', $query);
        $gradeId = $this->getVal('GradeId', $query);
        $rows = $this->_model->create($username,$password,$groupId,$name,$gradeId);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function CreateGrade($query)
    {
        $title = $this->getVal('Title', $query);
        $limitarea = $this->getVal('LimitArea', $query);
        $rows = $this->_model->createGrade($title,$limitarea);
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
    public function UpdateGrade($query)
    {
        $id = $this->getVal('Id', $query);
        $title = $this->getVal('Title', $query);
        $limitarea = $this->getVal('LimitArea', $query);
        $rows = $this->_model->updateGrade($id,$title,$limitarea);
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
    public function DeleteGrade($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteGrade($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function UploadPlan($query)
    {
        $Id = $this->getVal('Id', $query);
        $name = $this->getVal('Name', $query);
        $length = $this->getVal('Length', $query);
        $contentType = $this->getVal('ContentType', $query);
        $image = $this->getVal('Data', $query);
        $rows = $this->_model->uploadPlan($Id,$image,$name,$length,$contentType);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function GetUploadFileByBoothBoothbuilderId($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->getUploadFileByBoothBoothbuilderId($id);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function DeletePlan($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deletePlan($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function BoothBuilderGradeDropDown($query)
    {
        $rows = $this->_model->boothBuilderGradeDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }

}