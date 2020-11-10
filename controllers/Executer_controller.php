<?php

class Executer_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetHallByExecuter()
    {
        $rows = $this->_model->getHallByExecuter();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetBoothByExecuter()
    {
        $rows = $this->_model->getBoothByExecuter();
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
        $groupId = $this->getVal('GroupId', $query);
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
    public function GetUploadFileByExhibitionHallId($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->getUploadFileByExhibitionHallId($id);
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

    public function GetHallAdminsByExhibition($query)
    {
        $exhibitionId = $this->getVal('ExhibitionId', $query);
        $rows = $this->_model->getHallAdminsByExhibition($exhibitionId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function AssignHalladmin($query)
    {
        $exhibitionHallId = $this->getVal('ExhibitionHallId', $query);
        $hallAdminId = $this->getVal('HallAdminId', $query);
        $rows = $this->_model->assignHalladmin($exhibitionHallId,$hallAdminId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function GetHallAdminsByExhibitionHall($query)
    {
        $exhibitionHallId = $this->getVal('ExhibitionHallId', $query);
        $rows = $this->_model->getHallAdminsByExhibitionHall($exhibitionHallId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function DeleteAssignHalladmin($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteAssignHalladmin($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}