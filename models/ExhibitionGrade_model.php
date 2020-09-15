<?php
class ExhibitionGrade_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `exhibitiongrades` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `exhibitiongrades` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($title,$year)
    {
        $sql = "INSERT INTO `exhibitiongrades`(`Title`,`Year`) VALUES ('$title',$year)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$title,$year)
    {
        $sql = "UPDATE `exhibitiongrades` SET `Title`='$title' , `Year`=$year  WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `exhibitiongrades` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    
}