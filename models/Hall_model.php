<?php
class Hall_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `halls` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `halls` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($title,$gradeId)
    {
        $sql = "INSERT INTO `halls`(`Title`,`GradeId`) VALUES ('$title',$gradeId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$title,$gradeId)
    {
        $sql = "UPDATE `Halls` SET `Title`='$title' , `GradeId`=$gradeId WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `halls` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function gradeDropDown()
    {
        $sql = "SELECT `Id`,`Title` FROM `hallgrades` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    
}