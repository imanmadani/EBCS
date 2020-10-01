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
    public function GetExecuterByExhibitionId($query)
    {
        $exId=$query['Id'];
        $rows = $this->_model->getExecuterByExhibitionId($exId);
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
    public function DeleteAssignExecuter($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteassignExecuter($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }

    
}