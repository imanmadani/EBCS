<?php
class BoothBuilder_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `boothbuilders` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getBoothBuilderTask($boothBuilderId)
    {
        $sql = "SELECT * FROM `boothboothbuilders` WHERE `FlagDelete`=0 AND BoothBuilderId=$boothBuilderId";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `boothbuilders` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($name)
    {
        $sql = "INSERT INTO `boothbuilders`(`Name`) VALUES ('$name')";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$name)
    {
        $sql = "UPDATE `boothbuilders` SET `Name`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `boothbuilders` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}