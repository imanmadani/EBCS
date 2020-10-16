<?php

class BoothBuilder_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetBoothBuilderTask($query)
    {
        $boothBuilderId = $this->getVal('BoothBuilderId', $query);
        $rows = $this->_model->getBoothBuilderTask($boothBuilderId);
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
        $name = $this->getVal('Name', $query);
        $rows = $this->_model->create($name);
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

}