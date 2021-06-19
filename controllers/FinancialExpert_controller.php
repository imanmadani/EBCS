<?php
class FinancialExpert_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetFinancialExpertsTask($query)
    {
        $rows = $this->_model->getFinancialExpertTask();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetFinancialExpertBills($query)
    {
        $rows = $this->_model->getFinancialExpertBills();
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
        $mobile = $this->getVal('Mobile', $query);
        $groupId = 7;
        $name = $this->getVal('Name', $query);
        $rows = $this->_model->create($mobile,$groupId,$name);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
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
    public function AcceptPay($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->acceptPay($id);
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
    public function GetBoothsByHall($query)
    {
        $exhibitionHallId = $this->getVal('ExhibitionHallId', $query);
        $rows = $this->_model->getBoothsByHall($exhibitionHallId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function CreateBills($query)
    {
        $boothId =  $this->getVal('BoothId', $query);
        $quantity =  $this->getVal('Quantity', $query);
        $amount =  $this->getVal('Amount', $query);
        $name = $this->getVal('Name', $query);
        $length = $this->getVal('Length', $query);
        $contentType = $this->getVal('ContentType', $query);
        $image = $this->getVal('Data', $query);
        $rows = $this->_model->createBills($boothId,$image,$name,$length,$contentType,$amount,$quantity);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}
