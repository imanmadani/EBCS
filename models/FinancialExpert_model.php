<?php
require_once "../Enum/BillType-Enum.php";
require_once "../Enum/ApproveState-Enum.php";

class FinancialExpert_model extends model
{
    public function get()
    {
        $sql = "SELECT 
                myFinancialExpert.Id,
                myUserdetail.Name,
                myFinancialExpert.FlagBlock,
                myUser.Username,
                myUser.Id As UserId
                FROM `financialexperts` AS myFinancialExpert
                INNER JOIN `users` AS myUser ON myFinancialExpert.UserId=myUser.Id
                LEFT JOIN `userdetails` AS myUserdetail ON myFinancialExpert.UserId=myUserdetail.UserId
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
                       myBill.BillIdentity,
                       myBill.RetrivalRef,
                       myBill.SystemTrace,
                       myBillType.Title AS BillType,
                       myQtyType.Title AS QuantityType,
                       myBooth.Id AS BoothId,myBooth.Name,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.AreaRial,myBooth.AreaArz,myBooth.AreaType,myBooth.Area2,myBooth.ConstructionType,
                       myHall.Title AS HallTitle,
                       myParticipant.Username AS ParticipantUsername,
                       CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExName 
                       FROM `bills` AS myBill
                INNER JOIN `booths` AS myBooth ON myBill.BoothId=myBooth.Id
                INNER JOIN `billtypes` AS myBillType ON myBill.BillType=myBillType.Id
                INNER JOIN `quantitytype` AS myQtyType ON myBill.QuantityType=myQtyType.Id
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBill.FlagDelete=0 
                AND myEx.FlagDelete=0
                AND myBill.Amount>10000
                AND myBill.PayStatus=1 
                AND myBill.FinancialApprove =0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getFinancialExpertBills()
    {
        $sql = "SELECT myBill.Id ,
                       myBill.BoothId,
                       myBill.Quantity,
                       myBill.Amount,
                       myBill.FinancialApprove,
                       myBill.BillIdentity,
                       myBill.RetrivalRef,
                       myBill.SystemTrace,
                       myBill.PayStatus,
                       myBill.FinancialApprove,
                       myBillType.Title AS BillType,
                       myQtyType.Title AS QuantityType,
                       myBooth.Id AS BoothId,myBooth.Name,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.AreaRial,myBooth.AreaArz,myBooth.AreaType,myBooth.Area2,myBooth.ConstructionType,
                       myHall.Title AS HallTitle,
                       myParticipant.Username AS ParticipantUsername,
                       CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExName 
                       FROM `bills` AS myBill
                INNER JOIN `booths` AS myBooth ON myBill.BoothId=myBooth.Id
                INNER JOIN `billtypes` AS myBillType ON myBill.BillType=myBillType.Id
                INNER JOIN `quantitytype` AS myQtyType ON myBill.QuantityType=myQtyType.Id
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBill.FlagDelete=0 AND myEx.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `financialexperts` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($mobile, $groupId, $name)
    {

        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$mobile'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $randomPass = rand(1000000, 99999999);
            $randomPassmd5 = md5(bin2hex($randomPass));
            $smsText = "نام کاربری : " . $mobile . "\n" . " رمز عبور : " . $randomPass . "\n" ."https://design.iranfair.com/";
            $smsResponse = $this->sendSms($mobile, $smsText);
            //$smsResponse = true;

            if ($smsResponse) {
                $rows = '';
                $sqlDynamic = new model();
                mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
                mysqli_query($sqlDynamic->conn, "START TRANSACTION");
                $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `users`(`Username`, `Password`,`GroupId`) VALUES ('$mobile','$randomPassmd5',$groupId)");
                $last_id = mysqli_insert_id($sqlDynamic->conn);
                $sqlDetail = mysqli_query($sqlDynamic->conn, "INSERT INTO `userdetails`(`UserId`,`Name`,`Mobile`) VALUES ($last_id,'$name','$mobile')");
                $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `financialexperts`(`UserId`) VALUES ($last_id);");
                if ($sql && $sql2 && $sqlDetail) {
                    mysqli_query($sqlDynamic->conn, "COMMIT");
                    $rows = $sql2;
                } else {
                    mysqli_query($sqlDynamic->conn, "ROLLBACK");
                }
                mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
            }
        }
        return $rows;
    }

    public function update($id, $name)
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

    public function exhibitionDropDown()
    {
        $sql = "SELECT myEx.Id,myEx.Title FROM `exhibitions` AS myEx
                WHERE myEx.FlagDelete=0 ";
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

    public function getBoothsByHall($exhibitionHallId)
    {
        $sql = "SELECT myBooth.Name AS Title, 
                     myBooth.Id
                     FROM `booths` AS myBooth 
              WHERE myBooth.FlagBlock=0 AND myBooth.FlagDelete=0 AND myBooth.ExhibitionHallId=$exhibitionHallId";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function createBills($boothId, $image, $name, $length, $contentType, $amount, $quantity)
    {
        $this->execQuery("UPDATE `bills` SET `FlagDelete`=1 WHERE `BoothId` = $boothId");
        $folderPath = "../Files/Bills/";
        $request = $image;
        $image_parts = explode(";base64,", $request);
        $image_base64 = base64_decode($image_parts[1]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $fileValidName = uniqid();
        $file = $folderPath . $fileValidName . "." . $image_type;
        file_put_contents($file, $image_base64);
        $sqlDynamic = new model();
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
        mysqli_query($sqlDynamic->conn, "START TRANSACTION");
        $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `bills`(`BoothId`,`BillType`,`QuantityType`,`Quantity`,`Amount`,`PayStatus`,`FinancialApprove`) VALUES ($boothId,1,2,$quantity,$amount,1,1)");
        $last_id = mysqli_insert_id($sqlDynamic->conn);
        $sqlDetail = mysqli_query($sqlDynamic->conn, "INSERT INTO `billdocuments`(`BillId`,`ViewName`, `Name`,`Length`,`Type`) VALUES ($last_id,'$name','$fileValidName',$length,'$contentType')");
        if ($sql && $sqlDetail) {
            mysqli_query($sqlDynamic->conn, "COMMIT");
            $rows =$sqlDetail;
        } else {
            mysqli_query($sqlDynamic->conn, "ROLLBACK");
        }
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
        return $rows;
    }
}
