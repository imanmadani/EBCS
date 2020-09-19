<?php

class Booth_controller extends controller
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
        $name = $this->getVal('Name', $query);
        $exhibitionId = $this->getVal('ExhibitionId', $query);
        $hallId = $this->getVal('HallId', $query);
        $participantId = $this->getVal('ParticipantId', $query);
        $rows = $this->_model->create($name,$exhibitionId,$hallId,$participantId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $name = $this->getVal('Name', $query);
        $exhibitionId = $this->getVal('ExhibitionId', $query);
        $hallId = $this->getVal('HallId', $query);
        $participantId = $this->getVal('ParticipantId', $query);
        $rows = $this->_model->update($name,$exhibitionId,$hallId,$participantId);
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
    public function ExhibitionDropDown()
    {
        $rows = $this->_model->exhibitionDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function HallDropDown($query)
    {
        $exhibitionId = $this->getVal('ExhibitionId', $query);
        $rows = $this->_model->hallDropDown($exhibitionId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    
}