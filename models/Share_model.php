<?php
require_once '../entity/User.php';

class Share_model extends model
{
    public function getLatestCurrency()
    {
        $sql = "select * from `exchangerates` WHERE FlagBlock=0 ORDER BY Id DESC LIMIT 1;";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function getLatestExhibition()
    {
        $sql = "select * from `exhibitions` WHERE FlagBlock=0 AND FlagDelete=0  ORDER BY Id DESC LIMIT 3;";
        $rows = $this->getAll($sql);
        return $rows;
    }
}
