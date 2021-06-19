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
    public function GetPlanCommentsByBoothBoothBuilderId($query)
    {
        $boothBoothbuilderId = $this->getVal('BoothBoothbuilderId', $query);
        $rows = $this->_model->getPlanCommentsByBoothBoothBuilderId($boothBoothbuilderId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function CreatePlanComments($query)
    {
        $boothBoothbuilderId = $this->getVal('BoothBoothbuilderId', $query);
        $boothBoothbuilderplanId = $this->getVal('BoothBoothbuilderplanId', $query);
        $text = $this->getVal('Text', $query);
        $rows = $this->_model->createPlanComments($boothBoothbuilderId,$boothBoothbuilderplanId,$text);
        $this->_res->set("result", $rows);
        $this->_res->output();

    }
    public function UpdatePlanApprove($query)
    {
        $id = $this->getVal('Id', $query);
        $state = $this->getVal('State', $query);
        $rows = $this->_model->updatePlanApprove($id,$state);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Create($query)
    {
        $groupId = 4;
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
        $mobile = $this->getVal('Mobile', $query);
        $rows = $this->_model->update($id,$name,$mobile);
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
    public function GetBoothBuilderTaskByBoothBuilderId($query)
    {
        $id = $this->getVal('BoothBuilderId', $query);
        $rows = $this->_model->getBoothBuilderTaskByBoothBuilderId($id);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
}
