<?php
require_once '../entity/ExhibitionHall.php';
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
        $startDateTime = $this->getVal('StartDateTime', $query);
        $endDateTime = $this->getVal('EndDateTime', $query);
        $planUploadEnd = $this->getVal('PlanUploadDateEnd', $query);
        $rows = $this->_model->create($title,$year,$gradeId,$startDateTime,$endDateTime,$planUploadEnd);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $title = $this->getVal('Title', $query);
        $year = $this->getVal('Year', $query);
        $gradeId = $this->getVal('GradeId', $query);
        $startDateTime = $this->getVal('StartDateTime', $query);
        $endDateTime = $this->getVal('EndDateTime', $query);
        $rows = $this->_model->update($id,$title,$year,$gradeId,$startDateTime,$endDateTime);
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
    public function GetByExhibitionId($query)
    {
        $exId=$query['Id'];
        $rows = $this->_model->getByExhibitionId($exId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function AssignHall($query)
    {
        $exhibitionHallrows = $this->_model->getByExhibitionId($query[1]['ExhibitionId']);
        foreach($exhibitionHallrows as $exHallRow){
            $exHallRowId=$exHallRow['Id'];
            $deleterows = $this->_model->assignHalldelete($exHallRowId);
        }
        foreach($query[0] as $obj){
           $exhibitionId=$query[1]['ExhibitionId'];
           $hallId=$obj['Id'];
           $rows = $this->_model->assignHall($exhibitionId,$hallId);
           $this->_res->set("result", $rows);
      }
         $this->_res->output();
    }
    public function ExecuterDropDown()
    {
        $rows = $this->_model->executerDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function HalladminDropDown()
    {
        $rows = $this->_model->halladminDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetExecuterByExhibitionId($query)
    {
        $exId=$query['Id'];
        $rows = $this->_model->getExecuterByExhibitionId($exId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetHalladminByExhibitionId($query)
    {
        $exId=$query['Id'];
        $rows = $this->_model->getHalladminByExhibitionId($exId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function TechnicalExpertDropDown()
    {
        $rows = $this->_model->technicalExpertDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function ArchitecturalExpertDropDown()
    {
        $rows = $this->_model->architecturalExpertDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetTechnicalExpertByExhibitionId($query)
    {
        $exId=$query['Id'];
        $rows = $this->_model->getTechnicalExpertByExhibitionId($exId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetArchitecturalExpertByExhibitionId($query)
    {
        $exId=$query['Id'];
        $rows = $this->_model->getArchitecturalExpertByExhibitionId($exId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }

    public function AssignExecuter($query)
    {
        $exhibitionId = $this->getVal('ExhibitionId', $query);
        $ExecuterId = $this->getVal('ExecuterId', $query);
        $rows = $this->_model->assignExecuter($exhibitionId,$ExecuterId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function AssignHalladmin($query)
    {
        $exhibitionId = $this->getVal('ExhibitionId', $query);
        $HalladminId = $this->getVal('HalladminId', $query);
        $rows = $this->_model->assignHalladmin($exhibitionId,$HalladminId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function AssignTechnicalExpert($query)
    {
        $exhibitionId = $this->getVal('ExhibitionId', $query);
        $technicalExpertId = $this->getVal('TechnicalExpertId', $query);
        $rows = $this->_model->assignTechnicalExpert($exhibitionId,$technicalExpertId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function AssignArchitecturalExpert($query)
    {
        $exhibitionId = $this->getVal('ExhibitionId', $query);
        $architecturalExpertId = $this->getVal('ArchitecturalExpertId', $query);
        $rows = $this->_model->assignArchitecturalExpert($exhibitionId,$architecturalExpertId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function DeleteAssignExecuter($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteassignExecuter($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function DeleteAssignHalladmin($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteassignHalladmin($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function DeleteAssignTechnicalExpert($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteassignTechnicalExpert($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function DeleteAssignArchitecturalExpert($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteassignArchitecturalExpert($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}
