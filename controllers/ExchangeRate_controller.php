<?php
class ExchangeRate_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetByDate($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->getById($id);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }

    public function Create($query)
    {
        $unitPrice = $this->getVal('UnitPrice', $query);
        $rows = $this->_model->create($unitPrice);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Block($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->block($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}