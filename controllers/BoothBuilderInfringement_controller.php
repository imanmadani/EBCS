<?php
class BoothBuilderInfringement_controller extends controller
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
        $description = $this->getVal('Description', $query);
        $amount = $this->getVal('Amount', $query);
        $quantityType = $this->getVal('QuantityType', $query);
        $rows = $this->_model->create($description,$amount,$quantityType);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $description = $this->getVal('Description', $query);
        $rows = $this->_model->update($id,$description);
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
    public function QuantityTypeDropDown()
    {
        $rows = $this->_model->quantityTypeDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
}