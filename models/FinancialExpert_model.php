<?php
class FinancialExpert_model extends model
{
    public function get()
    {
        $sql = "SELECT myFinancialExpert.Id,myFinancialExpert.Name,myFinancialExpert.FlagBlock,myUser.Username,myUser.Id As UserId
                FROM `financialexperts` AS myFinancialExpert
                INNER JOIN `users` AS myUser ON myFinancialExpert.UserId=myUser.Id 
                WHERE myFinancialExpert.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getFinancialExpertTask()
    {
        $sql = "SELECT myBill.Id ,
                       myBill.BoothId,
                       myBill.Quantity,
                       myBill.Amount,
                       myBill.FinancialApprove,
                       myBillType.Title AS BillType,
                       myQtyType.Title AS QuantityType,
                       myBooth.Id AS BoothId,myBooth.Name,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.Area,myBooth.Area2,
                       myHall.Title AS HallTitle,
                       myParticipant.Username AS ParticipantUsername,
                       myEx.Title AS ExName 
                       FROM `bills` AS myBill
                INNER JOIN `booths` AS myBooth ON myBill.BoothId=myBooth.Id
                INNER JOIN `billtypes` AS myBillType ON myBill.BillType=myBillType.Id
                INNER JOIN `quantityType` AS myQtyType ON myBill.QuantityType=myQtyType.Id
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBill.FlagDelete=0 AND myBill.PayStatus=1";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `financialexperts` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($username,$password,$groupId,$name)
    {
        $rows='';
        $sqlDynamic=new model();
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
        mysqli_query($sqlDynamic->conn,"START TRANSACTION");
        $sql = mysqli_query($sqlDynamic->conn,"INSERT INTO `users`(`Username`, `Password`, `GroupId`) VALUES ('$username','$password',$groupId)");
        $last_id = mysqli_insert_id($sqlDynamic->conn);
        $sql2 = mysqli_query($sqlDynamic->conn,"INSERT INTO `financialexperts`(`UserId`,`Name`) VALUES ($last_id,'$name');");
        if($sql && $sql2) {
            mysqli_query($sqlDynamic->conn,"COMMIT");
            $rows=$sql2;
        } else {
            mysqli_query($sqlDynamic->conn,"ROLLBACK");
        }
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
        return $rows;
    }
    public function update($id,$name)
    {
        $sql = "UPDATE `financialexperts` SET `Name`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `financialexperts` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function acceptPay($id)
    {
        $sql = "UPDATE `bills` SET `FinancialApprove`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}