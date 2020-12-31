<?php
require_once "../Enum/ApproveState-Enum.php";

class TechnicalExpert_model extends model
{
    public function get()
    {
        $sql = "SELECT 
                myTechExpert.Id,
                myTechExpert.Rate,
                myUser.Username,
                myUser.Id As UserId, 
                myUserDetail.Name,
                myUserDetail.Mobile
                FROM `technicalexperts` AS myTechExpert
                INNER JOIN `users` AS myUser ON myTechExpert.UserId=myUser.Id
                LEFT JOIN `userdetails` AS myUserDetail ON myUser.Id=myUserDetail.UserId  
                WHERE myTechExpert.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getTechnicalExpertTask($technicalExpertId)
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT myEx.Title AS ExhibitionName,
                       myHall.Title AS HallName,
                       myBooth.Name AS BoothName,
                       myBooth.Id AS BoothId,
                       myExHallHallAdmin.HallAdminId AS HallAdminId,
                       CONCAT( myBooth.TechnicalExpertApprove, myBooth.ArchitecturalExpertApprove ) AS ApproveState,
                       myBooth.AreaRial,
                       myBooth.AreaArz,
                       myBooth.AreaType,
                       myBooth.Area2,
                       myBooth.ConstructionType,
                       myParticipant.Username AS ParticipantName,
                       myBoothBoothBuilder.Id AS BoothBoothBuilderId
                FROM `exhibitiontechnicalexperts` AS myExTechnicalExpert
                INNER JOIN `technicalexperts` AS myTechnicalExpert ON myExTechnicalExpert.TechnicalExpertId=myTechnicalExpert.Id
                INNER JOIN `exhibitions` AS myEx ON myExTechnicalExpert.ExhibitionId=myEx.Id
                INNER JOIN `booths` AS myBooth ON myExTechnicalExpert.ExhibitionId=myBooth.ExhibitionId
                INNER JOIN `bills` AS myBill ON myBooth.Id=myBill.BoothId
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                LEFT JOIN `hallhalladmins` As myExHallHallAdmin ON myExHallHallAdmin.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `boothboothbuilders` AS myBoothBoothBuilder ON myBooth.Id =myBoothBoothBuilder.BoothId
                LEFT JOIN `boothboothbuilderplans` AS myBoothPlan ON myBoothBoothBuilder.Id=myBoothPlan.BoothBoothbuilderId
                WHERE myTechnicalExpert.UserId=".$user['Id']."
                AND myBill.BillType=1 AND myBill.PayStatus=1 AND myBill.FinancialApprove=1
                AND myBooth.TechnicalExpertApprove!=" . ApproveStateEnum::DisApprove . "
                AND myBooth.TechnicalExpertApprove!=" . ApproveStateEnum::Approve . "
                AND myBooth.ElectricalExpertApprove=" . ApproveStateEnum::Approve . "
                AND myBooth.HeadQuarterApprove="      . ApproveStateEnum::Approve . "
                AND (myBooth.TechnicalExpertApprove=" . ApproveStateEnum::EndAction . " 
                OR  myBooth.ArchitecturalExpertApprove=" . ApproveStateEnum::DisApprove . ")
                GROUP BY myExTechnicalExpert.ExhibitionId";
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
                WHERE myBoothPlan.BoothBoothbuilderId=$boothBoothbuilderId AND myFile.FlagDelete=0 AND myFile.FlagBlock=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function create($groupId, $name, $mobile)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$mobile'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if ($rowsDuplicate['Id'] and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $randomPass = rand(1000000, 99999999);
            $randomPassmd5 = md5(bin2hex($randomPass));
            $smsText = "نام کاربری : " . $mobile . "\n" . " رمز عبور : " . $randomPass;
            //$smsResponse = $this->sendSms($mobile, $smsText);
            $smsResponse=true;

            if ($smsResponse) {
                $rows = '';
                $sqlDynamic = new model();
                mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
                mysqli_query($sqlDynamic->conn, "START TRANSACTION");
                $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `users`(`Username`, `Password`,`GroupId`) VALUES ('$mobile','$randomPassmd5',$groupId)");
                $last_id = mysqli_insert_id($sqlDynamic->conn);
                $sqlDetail = mysqli_query($sqlDynamic->conn, "INSERT INTO `userdetails`(`UserId`,`Name`,`Mobile`) VALUES ($last_id,'$name','$mobile')");
                $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `technicalexperts`(`UserId`) VALUES ($last_id);");
                if ($sql && $sql2) {
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

    public function BoothApprove($id)
    {
        $sql = "UPDATE `booths` SET `TechnicalExpertApprove`=" . ApproveStateEnum::Approve . " WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function BoothDisApprove($id)
    {
        $sql = "UPDATE `booths` SET `TechnicalExpertApprove`=" . ApproveStateEnum::DisApprove . " WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}