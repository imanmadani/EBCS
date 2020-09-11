<?php
require_once '../entity/User.php';

class Group_model extends model
{
    public function getRows()
    {
        $sql = "SELECT * FROM `groups`";
        $rows = $this->getAll($sql);
        return $rows;
    }
}