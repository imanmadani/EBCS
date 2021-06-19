<?php
class ArchitecturalExpert_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetArchitecturalExpertTask($query)
    {
        $architecturalExpertId = $this->getVal('ArchitecturalExpertId', $query);
        $rows = $this->_model->getArchitecturalExpertTask($architecturalExpertId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetArchitecturalExpertBooth($query)
    {
        $architecturalExpertId = $this->getVal('ArchitecturalExpertId', $query);
        $rows = $this->_model->getArchitecturalExpertBooth($architecturalExpertId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetArchitecturalInfringements()
    {
        $rows = $this->_model->getArchitecturalInfringements();
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
        $groupId = 6;
        $name = $this->getVal('Name', $query);
        $mobile = $this->getVal('Mobile', $query);
        $rows = $this->_model->create($groupId,$name,$mobile);
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
    public function InfrigementCreate($query)
    {
        $infringementsId = $this->getVal('InfringementId', $query);
        $boothBoothbuilderId = $this->getVal('BoothBoothbuilderId', $query);
        $boothId = $this->getVal('BoothId', $query);
        $quantity = $this->getVal('Quantity', $query);
        $rows = $this->_model->infrigementCreate($infringementsId,$boothId,$quantity);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function InfrigementDropDown()
    {
        $rows = $this->_model->infrigementDropDown();
        $this->_res->set("rows", $rows);
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
