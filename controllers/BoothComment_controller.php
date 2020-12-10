<?php
class BoothComment_controller extends controller
{

    public function GetCommentsByBooth($query)
    {
        $boothId = $this->getVal('BoothId', $query);
        $rows = $this->_model->getCommentsByBooth($boothId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function InsertCommentByBooth($query)
    {
        $boothId = $this->getVal('BoothId', $query);
        $halladminId = $this->getVal('HallAdminId', $query);
        $description = $this->getVal('Description', $query);
        $rows = $this->_model->insertCommentByBooth($boothId,$halladminId,$description);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}