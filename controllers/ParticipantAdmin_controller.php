<?php
class ParticipantAdmin_controller extends controller
{
    public function GetByUser()
    {
        $rows = $this->_model->getByUser();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
}