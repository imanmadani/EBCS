<?php
require_once "../Enum/ApproveState-Enum.php";

class ArchitecturalExpert_model extends model
{
    public function get()
    {
        $sql = "SELECT myarchExpert.Id,myarchExpert.Name,myarchExpert.Rate,myUser.Username,myUser.Id As UserId
                FROM `architecturalexperts` AS myarchExpert
                INNER JOIN `users` AS myUser ON myarchExpert.UserId=myUser.Id 
                WHERE myarchExpert.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getArchitecturalExpertTask($architecturalExpertId)
    {
        $sql = "SELECT 
                       myBooth.Name AS BoothName,
                       myBooth.Id AS BoothId,
                       myHall.Title AS HallName,
                       myBooth.ArchitecturalExpertApprove AS ApproveState,
                       myParti.Username AS ParticipantName,
                       myEx.Title AS ExhibitionName
                FROM `booths` AS myBooth 
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `participants` AS myParti ON myBooth.ParticipantId=myParti.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBooth.TechnicalExpertApprove=".ApproveStateEnum::Approve;
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getArchitecturalInfringements()
    {
        $sql = "SELECT myinfringementrecord.Amount AS SUMQuantity ,
                       myinfringementrecord.Quantity,
                       myBooth.Name AS BoothName,
                       myHall.Title AS HallName,
                       myParti.Username AS ParticipantName,
                       myEx.Title AS ExhibitionName,
                       myBuilder.Name AS BuilderName,
                       myInfringement.Description,
                       myInfringement.Amount,
                       myQtype.Title                    
                FROM `boothbuilderinfringementrecords` AS myinfringementrecord
                INNER JOIN `booths` AS myBooth ON myinfringementrecord.BoothId=myBooth.Id
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `participants` AS myParti ON myBooth.ParticipantId=myParti.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                INNER JOIN `boothbuilders` AS myBuilder ON myinfringementrecord.BoothBuilderId=myBuilder.Id
                INNER JOIN `boothbuilderinfringements` AS myInfringement ON myinfringementrecord.InfringementId=myInfringement.Id
                INNER JOIN `quantitytype` AS myQtype ON myInfringement.QuantityType=myQtype.Id
                WHERE myinfringementrecord.FlagBlock=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `architecturalexperts` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($username, $password, $groupId, $name)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$username'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if($rowsDuplicate['Id'] and $rowsDuplicate['Id']>0){
            $rows=false;
        }else {
            $rows = '';
            $sqlDynamic = new model();
            mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
            mysqli_query($sqlDynamic->conn, "START TRANSACTION");
            $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `users`(`Username`, `Password`, `GroupId`) VALUES ('$username','$password',$groupId)");
            $last_id = mysqli_insert_id($sqlDynamic->conn);
            $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `architecturalexperts`(`UserId`,`Name`) VALUES ($last_id,'$name');");
            if ($sql && $sql2) {
                mysqli_query($sqlDynamic->conn, "COMMIT");
                $rows = $sql2;
            } else {
                mysqli_query($sqlDynamic->conn, "ROLLBACK");
            }
            mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
        }
        return $rows;
    }

    public function update($id, $name)
    {
        $sql = "UPDATE `architecturalexperts` SET `Name`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function delete($id)
    {
        $sql = "UPDATE `architecturalexperts` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function infrigementCreate($infringementsId, $boothId, $quantity)
    {
        $getBoothBuilder = "SELECT * FROM `boothboothbuilders` WHERE BoothId=$boothId AND FlagDelete=0";
        $rowsBoothBoothBuilder = $this->getRow($getBoothBuilder);
        $boothBuilderId = $rowsBoothBoothBuilder['BoothBuilderId'];
        $getInfringementAmount = "SELECT * FROM `boothbuilderinfringements` WHERE Id=$infringementsId AND FlagDelete=0";
        $rowInfringementAmount = $this->getRow($getInfringementAmount);
        $infringementAmount = $rowInfringementAmount['Amount'];
        $amount = $quantity * $infringementAmount;
        $sql = "INSERT INTO `boothbuilderinfringementrecords`(`InfringementId`, `BoothbuilderId`, `BoothId`, `Quantity`,`Amount`) VALUES ($infringementsId,$boothBuilderId,$boothId,$quantity,$amount)";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function infrigementDropDown()
    {
        $sql = "SELECT myInf.Id,myInf.Description AS Title , myInf.Amount ,myQuantityType.Title AS QuantityType FROM `boothbuilderinfringements`  AS myInf
                INNER JOIN `quantitytype` As myQuantityType ON myInf.QuantityType=myQuantityType.Id 
                WHERE FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function BoothApprove($id)
    {
        $sql = "UPDATE `booths` SET `ArchitecturalExpertApprove`=".ApproveStateEnum::Approve." WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function BoothDisApprove($id)
    {
        $sql = "UPDATE `booths` SET `ArchitecturalExpertApprove`=".ApproveStateEnum::DisApprove." WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        $sql = "UPDATE `booths` SET `TechnicalExpertApprove`=".ApproveStateEnum::EndAction." WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
}