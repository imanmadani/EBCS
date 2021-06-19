<?php
require_once "../Enum/ApproveState-Enum.php";

class ArchitecturalExpert_model extends model
{
    public function get()
    {
        $sql = "SELECT 
                myarchExpert.Id,
                myUserDetail.Name,
                myUserDetail.Mobile,
                myarchExpert.Rate,
                myUser.Username,
                myUser.Id As UserId
                FROM `architecturalexperts` AS myarchExpert
                INNER JOIN `users` AS myUser ON myarchExpert.UserId=myUser.Id 
                LEFT JOIN `userdetails` AS myUserDetail ON myUser.Id=myUserDetail.UserId 
                WHERE myarchExpert.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getArchitecturalExpertTask($architecturalExpertId)
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT 
                       myBooth.Name AS BoothName,
                       myBooth.Id AS BoothId,
                       myBooth.ExhibitionHallId,
                       myBooth.ParticipantId,
                       myBooth.AreaRial,
                       myBooth.AreaArz,
                       myBooth.AreaType,
                       myAreaType.Title AS AreaTypeTitle,
                       myBooth.Area2,
                       myBooth.ConstructionType,
                       myConst.Title AS ConstructionTypeTitle,
                       myBooth.HasEquipment,
                       myExHallHallAdmin.HallAdminId AS HallAdminId,
                       myHall.Title AS HallName,
                       myBooth.ArchitecturalExpertApprove AS ApproveState,
                       myParti.Username AS ParticipantName,
                       myParticipantDetail.CompanyName,
                       CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExhibitionName,
                       myBoothBoothBuilder.Id AS BoothBoothBuilderId
                FROM `booths` AS myBooth 
                LEFT  JOIN  `constructiontype` AS myConst ON myBooth.ConstructionType=myConst.Id
                LEFT  JOIN  `areatype` AS myAreaType ON myBooth.AreaType=myAreaType.Id
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                LEFT JOIN `hallhalladmins` As myExHallHallAdmin ON myExHallHallAdmin.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `participants` AS myParti ON myBooth.ParticipantId=myParti.Id
                INNER JOIN `participantdetails` AS myParticipantDetail ON myParti.Id=myParticipantDetail.ParticipantId
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id 
                INNER JOIN `exhibitionarchitecturalexperts` AS myExArchitecturalExpert ON myExArchitecturalExpert.ExhibitionId=myEx.Id
                INNER JOIN `architecturalexperts` AS myArchitecturalexperts ON myArchitecturalexperts.Id=myExArchitecturalExpert.ArchitecturalExpertId
                INNER JOIN `boothboothbuilders` AS myBoothBoothBuilder ON myBooth.Id =myBoothBoothBuilder.BoothId
                LEFT JOIN `boothboothbuilderplans` AS myBoothPlan ON myBoothBoothBuilder.Id=myBoothPlan.BoothBoothbuilderId
                WHERE 
                myArchitecturalexperts.UserId=" . $user['Id'] . " 
                AND myBooth.FlagDelete=0
                AND myBooth.FlagBlock=0 
                AND myEx.FlagDelete=0
                AND myEx.FlagBlock=0 
                AND myExArchitecturalExpert.FlagDelete=0
                AND myExArchitecturalExpert.FlagBlock=0
                AND myBoothBoothBuilder.FlagDelete=0
                AND myBoothBoothBuilder.FlagBlock=0
                AND myExHallHallAdmin.FlagDelete=0
                AND myExHallHallAdmin.FlagBlock=0
                AND myParti.FlagDelete=0
                AND myParti.FlagBlock=0
                AND myBooth.TechnicalExpertApprove=" . ApproveStateEnum::Approve .
            " GROUP BY myBooth.Id";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getArchitecturalExpertBooth($architecturalExpertId)
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT 
                       myBooth.Name AS BoothName,
                       myBooth.Id AS BoothId,
                       myBooth.ExhibitionHallId,
                       myBooth.ParticipantId,
                       myBooth.AreaRial,
                       myBooth.AreaArz,
                       myBooth.AreaType,
                       myAreaType.Title AS AreaTypeTitle,
                       myBooth.Area2,
                       myBooth.ConstructionType,
                       myConst.Title AS ConstructionTypeTitle,
                       myBooth.HasEquipment,
                       myExHallHallAdmin.HallAdminId AS HallAdminId,
                       myHall.Title AS HallName,
                       myBooth.ArchitecturalExpertApprove AS ApproveState,
                       myParti.Username AS ParticipantName,
                       CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExhibitionName,
                       myBoothBoothBuilder.Id AS BoothBoothBuilderId
                FROM `booths` AS myBooth 
                LEFT  JOIN  `constructiontype` AS myConst ON myBooth.ConstructionType=myConst.Id
                LEFT  JOIN  `areatype` AS myAreaType ON myBooth.AreaType=myAreaType.Id
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                LEFT JOIN `hallhalladmins` As myExHallHallAdmin ON myExHallHallAdmin.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `participants` AS myParti ON myBooth.ParticipantId=myParti.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id 
                INNER JOIN `exhibitionarchitecturalexperts` AS myExArchitecturalExpert ON myExArchitecturalExpert.ExhibitionId=myEx.Id
                INNER JOIN `architecturalexperts` AS myArchitecturalexperts ON myArchitecturalexperts.Id=myExArchitecturalExpert.ArchitecturalExpertId
                LEFT JOIN `boothboothbuilders` AS myBoothBoothBuilder ON myBooth.Id =myBoothBoothBuilder.BoothId
                WHERE 
                myArchitecturalexperts.UserId=" . $user['Id'] . " 
                AND myBooth.FlagDelete=0
                AND myBooth.FlagBlock=0 
                AND myEx.FlagDelete=0
                AND myEx.FlagBlock=0 
                AND myExArchitecturalExpert.FlagDelete=0
                AND myExArchitecturalExpert.FlagBlock=0
                AND ((myBoothBoothBuilder.FlagDelete=0 AND myBoothBoothBuilder.FlagBlock=0)OR(myBoothBoothBuilder.FlagDelete IS Null AND myBoothBoothBuilder.FlagBlock IS Null))
                AND ((myExHallHallAdmin.FlagDelete=0 AND myExHallHallAdmin.FlagBlock=0)OR(myExHallHallAdmin.FlagDelete IS Null AND myExHallHallAdmin.FlagBlock IS Null))
                AND myParti.FlagDelete=0
                AND myParti.FlagBlock=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getArchitecturalInfringements()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT myinfringementrecord.Amount AS SUMQuantity ,
                       myinfringementrecord.Quantity,
                       myBooth.Name AS BoothName,
                       myHall.Title AS HallName,
                       myParti.Username AS ParticipantName,
                       CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExhibitionName,
                       myUserdetail.Name AS BuilderName,
                       myInfringement.Description,
                       myInfringement.Amount,
                       myQtype.Title                    
                FROM       `boothbuilderinfringementrecords` AS myinfringementrecord
                INNER JOIN `booths` AS myBooth ON myinfringementrecord.BoothId=myBooth.Id
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `participants` AS myParti ON myBooth.ParticipantId=myParti.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                INNER JOIN `exhibitionarchitecturalexperts` AS myExArchitecturalExpert ON myExArchitecturalExpert.ExhibitionId=myEx.Id
                INNER JOIN `boothbuilders` AS myBuilder ON myinfringementrecord.BoothBuilderId=myBuilder.Id
                LEFT JOIN  `userdetails` AS myUserdetail ON myBuilder.UserId=myUserdetail.UserId
                INNER JOIN `boothbuilderinfringements` AS myInfringement ON myinfringementrecord.InfringementId=myInfringement.Id
                INNER JOIN `quantitytype` AS myQtype ON myInfringement.QuantityType=myQtype.Id
                WHERE 
                    myinfringementrecord.FlagBlock=0 
                AND myinfringementrecord.FlagDelete=0
                AND myEx.FlagDelete=0
                AND myEx.FlagBlock=0 
                AND myExArchitecturalExpert.FlagBlock=0 
                AND myExArchitecturalExpert.FlagDelete=0
                AND myBooth.TechnicalExpertApprove=1";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `architecturalexperts` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($groupId, $name, $mobile)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$mobile'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $randomPass = rand(1000000, 99999999);
            $randomPassmd5 = md5(bin2hex($randomPass));
            $smsText = "نام کاربری : " . $mobile . "\n" . " رمز عبور : " . $randomPass;
            $smsResponse = $this->sendSms($mobile, $smsText);
            //$smsResponse=true;
            if ($smsResponse) {
                $rows = '';
                $sqlDynamic = new model();
                mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
                mysqli_query($sqlDynamic->conn, "START TRANSACTION");
                $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `users`(`Username`, `Password`,`GroupId`) VALUES ('$mobile','$randomPassmd5',$groupId)");
                $last_id = mysqli_insert_id($sqlDynamic->conn);
                $sqlDetail = mysqli_query($sqlDynamic->conn, "INSERT INTO `userdetails`(`UserId`,`Name`,`Mobile`) VALUES ($last_id,'$name','$mobile')");
                $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `architecturalexperts`(`UserId`) VALUES ($last_id);");
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
        $sql = "UPDATE `booths` SET `ArchitecturalExpertApprove`=" . ApproveStateEnum::Approve . " WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function BoothDisApprove($id)
    {
        $sql = "UPDATE `booths` SET `ArchitecturalExpertApprove`=" . ApproveStateEnum::DisApprove . " WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        $sql = "UPDATE `booths` SET `TechnicalExpertApprove`=" . ApproveStateEnum::EndAction . " WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
}
