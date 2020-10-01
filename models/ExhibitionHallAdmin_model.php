<?php
class ExhibitionHallAdmin_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `halladmins` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `halladmins` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($title,$year,$gradeId)
    {
        $sql = "INSERT INTO `halladmins`(`Title`,`Year`,`GradeId`) VALUES ('$title',$year,$gradeId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$title,$year,$gradeId)
    {
        $sql = "UPDATE `halladmins` SET `Title`='$title' , `Year`=$year , `GradeId`=$gradeId WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `halladmins` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }


}