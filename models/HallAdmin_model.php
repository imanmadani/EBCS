<?php

class HallAdmin_model extends model
{
    public function get()
    {
        $sql = "SELECT 
                myHallAdmin.Id,
                myHallAdmin.Rate,
                myHallAdmin.FlagBlock,
                myUser.Username,
                myUser.Id As UserId, 
                myUserDetail.Name,
                myUserDetail.Mobile
                FROM `halladmins` AS myHallAdmin
                INNER JOIN `users` AS myUser ON myHallAdmin.UserId=myUser.Id 
                LEFT JOIN `userdetails` AS myUserDetail ON myUser.Id=myUserDetail.UserId  
                WHERE myHallAdmin.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getHallAdminTask()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT 
                       myHallAdmin.Id AS HallAdminId,
                       myHall.Title AS HallName,
                       CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExhibitionName,
                       myBooth.Name AS BoothName,
                       myBooth.Id AS BoothId,
                       myBooth.AreaRial,
                       myBooth.AreaArz,
                       myBooth.AreaType,
                       myBooth.Area2,
                       myBooth.TechnicalExpertApprove,
                       myBooth.ArchitecturalExpertApprove,
                       myBooth.ExecuterApprove,
                       myBooth.ConstructionType,
                       myParticipant.CompanyName AS BoothParty,
                       myParticipant.CompanyName AS ParticipantName,
                       myParticipant.AgentName AS BoothPartyName,
                       myParticipant.AgentTell AS BoothPartyTell,
                       myParticipant.ComapnyAddress,
                       myParticipant.AdminName,
                       myParticipant.AdminTell,
                       myParticipant.AgentName,
                       myParticipant.AgentTell,
                       myBooth.FlagBlock,
                       myBoothBoothBuilder.Id AS BoothBoothBuilderId,
                       myBoothBoothBuilder.BoothBuilderId
                From `halladmins` AS myHallAdmin        
                INNER JOIN `hallhalladmins` AS myHallAdminRel ON myHallAdmin.Id=myHallAdminRel.HallAdminId 
                INNER JOIN `exhibitionhalls` AS myExhibitionhall ON myHallAdminRel.ExhibitionHallId=myExhibitionhall.Id
                INNER JOIN `booths` AS myBooth ON myExhibitionhall.Id=myBooth.ExhibitionHallId 
                INNER JOIN `boothboothbuilders` AS myBoothBoothBuilder ON myBooth.Id =myBoothBoothBuilder.BoothId           
                INNER JOIN `participantdetails` AS myParticipant ON myBooth.ParticipantId=myParticipant.ParticipantId
                INNER JOIN `halls` AS myHall ON myExhibitionhall.HallId=myHall.Id
                INNER JOIN `exhibitions` AS myEx ON myExhibitionhall.ExhibitionId=myEx.Id
                WHERE 
                myHallAdminRel.FlagDelete=0
                AND myHallAdminRel.FlagBlock=0
                AND myBoothBoothBuilder.FlagDelete=0
                AND myEx.FlagBlock=0
                AND myEx.FlagDelete=0
                AND myBoothBoothBuilder.FlagBlock=0
                AND myHallAdminRel.FlagDelete=0
                AND myHallAdminRel.FlagBlock=0
                AND myBooth.ExecuterApprove = 1
                AND myHallAdmin.UserId=" . $user['Id'];
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `halladmins` WHERE `Id`=$id";
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
            $smsText = "نام کاربری : " . $mobile . "\n" . " رمز عبور : " . $randomPass . "\n" ."https://design.iranfair.com/";
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
                $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `halladmins`(`UserId`) VALUES ($last_id);");
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
        $sql = "UPDATE `halladmins` SET `Name`='$name' WHERE `Id`=$id";
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
