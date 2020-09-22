<?php
class ExhibitionExecuter_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `exhibitions` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `exhibitions` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($title,$year,$gradeId)
    {
        $sql = "INSERT INTO `exhibitions`(`Title`,`Year`,`GradeId`) VALUES ('$title',$year,$gradeId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$title,$year,$gradeId)
    {
        $sql = "UPDATE `exhibitions` SET `Title`='$title' , `Year`=$year , `GradeId`=$gradeId WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `exhibitions` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function gradeDropDown()
    {
        $sql = "SELECT `Id`,`Title`,`Year` FROM `exhibitiongrades` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getByExhibitionId($exhibitionId)
    {
        $sql = "SELECT * FROM `exhibitionhalls` WHERE `ExhibitionId`=$exhibitionId AND `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function assignHall($exhibitionId,$hallId)
    {
        $sql = "INSERT INTO `exhibitionhalls`( `ExhibitionId`, `HallId`) VALUES ($exhibitionId,$hallId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function assignHalldelete($id)
    {
        $sql = "UPDATE `exhibitionhalls` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}