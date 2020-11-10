<?php

class Share_controller extends controller
{
    public function GetLatestCurrency($query)
    {
        $rows = $this->_model->getLatestCurrency();
        $this->_res->set("row", $rows);
        $this->_res->output();
    }
    public function GetLatestExhibition($query)
    {
        $rows = $this->_model->getLatestExhibition();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
}