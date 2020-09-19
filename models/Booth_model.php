<?php
class Booth_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `booths` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `booths` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($name,$exhibitionId,$hallId,$participantId)
    {
        $sql = "INSERT INTO `booths`(`Name`,`ExhibitionId`, `HallId`, `ParticipantId`)
                VALUES ('$name',$exhibitionId,$hallId,$participantId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$name,$exhibitionId,$hallId,$participantId)
    {
        $sql = "UPDATE `booths` SET `Name`='$name' , `ExhibitionId`=$exhibitionId ,`HallId`=$hallId,`ParticipantId`=$participantId  
                WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `booths` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function exhibitionDropDown()
    {
        $sql = "SELECT `Id`,`Title` FROM `exhibitions` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function hallDropDown($exhibitionId)
    {
        $sql = "SELECT myhall.Id , myhall.Title FROM `exhibitionhalls` As myexHall
                INNER JOIN `halls` As myhall ON myexHall.HallId=myhall.Id
                WHERE myhall.FlagDelete=0 AND myexHall.FlagDelete=0  AND myexHall.ExhibitionId=$exhibitionId";
        $rows = $this->getAll($sql);
        return $rows;
    }
}