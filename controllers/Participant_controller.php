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
    public function GetByToken()
    {
        $row = $this->_model->getByToken();
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function GetDataByParticipant($query)
    {
        $participantId = $this->getVal('ParticipantId', $query);
        $row = $this->_model->getDataByParticipant($participantId);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function GetParticipantDetails($query)
    {
        $participantId = $this->getVal('ParticipantId', $query);
        $row = $this->_model->getParticipantDetails($participantId);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function GetBoothBuilder($query)
    {
        $row = $this->_model->getBoothBuilder();
        $this->_res->set("rows", $row);
        $this->_res->output();
    }
    public function GetBoothBuilderByBoothId($query)
    {
        $boothId = $this->getVal('BoothId', $query);
        $row = $this->_model->getBoothBuilderByBoothId($boothId);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function SetBoothBoothBuilder($query)
    {
        $boothId = $this->getVal('BoothId', $query);
        $boothBuilderId = $this->getVal('BoothBuilderId', $query);
        $rows = $this->_model->setBoothBoothBuilder($boothId,$boothBuilderId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function SetBoothBuilderRate($query)
    {
        $boothId = $this->getVal('BoothId', $query);
        $boothBuilderId = $this->getVal('BoothBuilderId', $query);
        $rate = $this->getVal('Rate', $query);
        $rows = $this->_model->setBoothBuilderRate($boothId,$boothBuilderId,$rate);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function GetBoothBuilderRateByBoothId($query)
    {
        $boothId = $this->getVal('BoothId', $query);
        $row = $this->_model->getBoothBuilderRateByBoothId($boothId);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function AcceptPolicyForm($query)
    {
        $participantId = $this->getVal('Id', $query);
        $rows = $this->_model->acceptPolicyForm($participantId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }

}