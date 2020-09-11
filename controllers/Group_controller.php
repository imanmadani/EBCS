<?php

class Group_controller extends controller
{
    public function Get($query)
    {
        $rows = $this->_model->getRows();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
}