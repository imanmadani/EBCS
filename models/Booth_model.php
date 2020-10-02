<?php
class Booth_model extends model
{
    public function get()
    {
        $sql = "SELECT myBooth.Id,myBooth.Name,myBooth.HallId,myBooth.ParticipantId,
                myHall.Title AS HallTitle,myParticipant.Username AS ParticipantUsername,
                myEx.Title AS ExName , myBooth.FlagBlock
                FROM `booths` AS myBooth 
                INNER JOIN `halls` AS myHall ON myBooth.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBooth.FlagDelete=0";
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
        $head=getallheaders();
        $ip=$_SERVER['REMOTE_ADDR'];
        $user=$this->getUserByToken($head['token'],$ip);
        $sql = "SELECT myEx.Id,myEx.Title FROM `exhibitions` AS myEx
                INNER JOIN `exhibitionexecuters` AS myExExecuter ON myEx.Id=myExExecuter.ExhibitionId  
                WHERE myEx.FlagDelete=0 AND myExExecuter.FlagDelete=0 AND myExExecuter.UserId=".$user['Id'];
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
    public function participantDropDown()
    {
        $sql = "SELECT Id,Username AS Title FROM `participants` WHERE FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
}