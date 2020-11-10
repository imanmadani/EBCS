<?php

class ExchangeRate_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `exchangerates`";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getByDate($id)
    {
        $sql = "SELECT * FROM `exchangerates` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }


    public function create($unitPrice)
    {
        $sql = "INSERT INTO `exchangerates`(`UnitPrice`) VALUES ($unitPrice)";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function block($id)
    {
        $sql = "UPDATE `exchangerates` SET `FlagBlock`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}