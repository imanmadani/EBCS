<?php
require_once '../entity/User.php';

class Group_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `groups` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `groups` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($name)
    {
        $sql = "INSERT INTO `groups`(`Name`) VALUES ('$name')";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$name)
    {
        $sql = "UPDATE `groups` SET `Name`=$name WHERE `Id`=$id";
        echo $sql;
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `groups` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
}