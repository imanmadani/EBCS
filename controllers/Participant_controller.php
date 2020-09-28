<?php

class Participant_controller extends controller
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
    public function GetDataByParticipant($query)
    {
        $participantId = $this->getVal('ParticipantId', $query);
        $row = $this->_model->getDataByParticipant($participantId);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function GetBoothBuilder($query)
    {
        $boothId = $this->getVal('BoothId', $query);
        $row = $this->_model->getBoothBuilder($boothId);
        $this->_res->set("row", $row);
        $this->_res->output();
    }

}