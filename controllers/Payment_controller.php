<?php

class Payment_controller extends controller
{
    public function Verhoeff($query)
    {
        $value = $this->getVal('Value', $query);
        $amount = $this->getVal('Amount', $query);
        $billId = $this->getVal('BillId', $query);
        $rows = $this->_model->verhoeff($value, $amount, $billId);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }

    public function VerifyPayment($query)
    {
        //$orderId = $this->getVal('OrderId', $query);
        //$token = $this->getVal('token', $query);
        //$resCode = $this->getVal('ResCode', $query);
        //$rows = $this->_model->verifyPayment($orderId,$token,$resCode);
        //$this->_res->set("row", $rows);
        //$this->_res->output();
    }

    public function GetBillStatusByBooth($query)
    {
        $boothId = $this->getVal('BoothId', $query);
        $rows = $this->_model->getBillStatusByBooth($boothId);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }

    public function GetBillById($query){
        $orderId = $this->getVal('OrderId', $query);
        $rows = $this->_model->getBillById($orderId);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }


}
