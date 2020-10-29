<?php

class TechnicalExpert_model extends model
{
    public function get()
    {
        $sql = "SELECT myTechExpert.Id,myTechExpert.Name,myTechExpert.Rate,myUser.Username,myUser.Id As UserId
                FROM `technicalexperts` AS myTechExpert
                INNER JOIN `users` AS myUser ON myTechExpert.UserId=myUser.Id 
                WHERE myTechExpert.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getTechnicalExpertTask($technicalExpertId)
    {
        $sql = "SELECT myEx.Title AS ExhibitionName,
                       myHall.Title AS HallName,
                       myBooth.Name AS BoothName,
                       myBooth.Area,
                       myBooth.Area2,
                       myParticipant.Username AS ParticipantName,
                       myBoothBoothBuilder.Id AS BoothBoothBuilderId
                FROM `exhibitiontechnicalexperts` AS myTechnicalExpert
                INNER JOIN `exhibitions` AS myEx ON myTechnicalExpert.ExhibitionId=myEx.Id
                INNER JOIN `booths` AS myBooth ON myTechnicalExpert.ExhibitionId=myBooth.ExhibitionId
                INNER JOIN `bills` AS myBill ON myBooth.Id=myBill.BoothId
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `boothboothbuilders` AS myBoothBoothBuilder ON myBooth.Id =myBoothBoothBuilder.BoothId
                INNER JOIN `boothboothbuilderplans` AS myBoothPlan ON myBoothBoothBuilder.Id=myBoothPlan.BoothBoothbuilderId
                WHERE myTechnicalExpert.TechnicalExpertId=1=$technicalExpertId AND myBoothPlan.FlagDelete=0 
                AND myBill.BillType=1 AND myBill.PayStatus=1
                GROUP BY myTechnicalExpert.ExhibitionId";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `technicalexperts` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function getPlanByBoothBoothbuilderId($boothBoothbuilderId)
    {
        $sql = "SELECT myFile.Name,myFile.Type,myFile.ViewName FROM `boothboothbuilderplans` AS myBoothPlan
                INNER JOIN `files` AS myFile ON myBoothPlan.FileId=myFile.Id
                WHERE myBoothPlan.BoothBoothbuilderId=$boothBoothbuilderId AND myFile.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function create($username, $password, $groupId, $name)
    {
        $rows = '';
        $sqlDynamic = new model();
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
        mysqli_query($sqlDynamic->conn, "START TRANSACTION");
        $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `users`(`Username`, `Password`, `GroupId`) VALUES ('$username','$password',$groupId)");
        $last_id = mysqli_insert_id($sqlDynamic->conn);
        $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `technicalexperts`(`UserId`,`Name`) VALUES ($last_id,'$name');");
        if ($sql && $sql2) {
            mysqli_query($sqlDynamic->conn, "COMMIT");
            $rows = $sql2;
        } else {
            mysqli_query($sqlDynamic->conn, "ROLLBACK");
        }
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
        return $rows;
    }

    public function update($id, $name)
    {
        $sql = "UPDATE `technicalexperts` SET `Name`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function delete($id)
    {
        $sql = "UPDATE `technicalexperts` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}