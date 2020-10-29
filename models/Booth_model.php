<?php
require_once "../Enum/BillType-Enum.php";
require_once "../Enum/QuantityType-Enum.php";
class Booth_model extends model
{
    public function get()
    {
        $sql = "SELECT myBooth.Id,myBooth.Name,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.Area,myBooth.Area2,
                       myHall.Title AS HallTitle,myParticipant.Username AS ParticipantUsername,
                       myEx.Title AS ExName , myBooth.FlagBlock
                FROM `booths` AS myBooth 
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
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
    public function create($name,$exhibitionId,$exHallId,$participantId,$area,$area2)
    {
        $rows='';
        $sqlDynamic=new model();
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
        mysqli_query($sqlDynamic->conn,"START TRANSACTION");
        $sql = mysqli_query($sqlDynamic->conn,
                        "INSERT INTO `booths`(`Name`,`ExhibitionId`, `ExhibitionHallId`, `ParticipantId`,`Area`,`Area2`)
                               VALUES ('$name',$exhibitionId,$exHallId,$participantId,$area,$area2)");
        $last_id = mysqli_insert_id($sqlDynamic->conn);
        $count=1;
        $amount=1;
        $billType=BillTypeEnum::ExhibitionService;
        $quantityType=QuantityTypeEnum::Meter;
        $sql2 = mysqli_query($sqlDynamic->conn,"INSERT INTO `bills`( `BoothId`,`BillType`, `QuantityType`, `Quantity`, `Amount`) VALUES ($last_id,$billType,$quantityType,$count,$amount)");
        if($sql && $sql2) {
            mysqli_query($sqlDynamic->conn,"COMMIT");
            $rows=$sql2;
        } else {
            mysqli_query($sqlDynamic->conn,"ROLLBACK");
        }
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
        return $rows;
    }
    public function update($id,$name,$exhibitionId,$hallId,$participantId,$area,$area2)
    {
        $sql = "UPDATE `booths` SET `Name`='$name' , `ExhibitionId`=$exhibitionId ,
                                    `ExhibitionHallId`=$hallId,`ParticipantId`=$participantId,
                                    `Area`=$area,`Area2`=$area2  
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
                INNER JOIN `executers` AS myExecuter ON myExExecuter.ExecuterId=myExecuter.Id 
                WHERE myEx.FlagDelete=0 AND myExExecuter.FlagDelete=0 AND myExecuter.UserId=".$user['Id'];
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function hallDropDown($exhibitionId)
    {
        $sql = "SELECT myexHall.Id , myhall.Title FROM `exhibitionhalls` As myexHall
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