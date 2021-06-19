<?php

class HeadQuarter_model extends model
{
    public function get()
    {
        $sql = "SELECT 
                myHeadQuarter.Id,
                myHeadQuarter.Rate,
                myHeadQuarter.FlagBlock,
                myUser.Username,
                myUser.Id As UserId, 
                myUserDetail.Name,
                myUserDetail.Mobile
                FROM `headquarters` AS myHeadQuarter
                INNER JOIN `users` AS myUser ON myHeadQuarter.UserId=myUser.Id 
                LEFT JOIN `userdetails` AS myUserDetail ON myUser.Id=myUserDetail.UserId  
                WHERE myHeadQuarter.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getTask()
    {
        $sql = "SELECT 
                myBooth.Id,myBooth.Name AS BoothName,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.AreaRial,myBooth.AreaArz,myBooth.AreaType,myBooth.Area2,myBooth.ConstructionType,
                myHall.Title AS HallName,myParticipantDetails.CompanyName AS BoothParty,myParticipantDetails.AgentName AS BoothPartyName,myParticipantDetails.AgentTell AS BoothPartyTell,
                CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExhibitionName , myBooth.FlagBlock
                FROM `booths` AS myBooth
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `participantDetails` AS myParticipantDetails ON myParticipant.Id=myParticipantDetails.ParticipantId
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBooth.ExecuterApprove=1  AND myBooth.HeadQuarterApprove!=1  AND myBooth.FlagDelete=0 AND myBooth.FlagBlock=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `headquarters` WHERE `Id`=$id";
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
            //$smsResponse = true;

            if ($smsResponse) {
                $rows = '';
                $sqlDynamic = new model();
                mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
                mysqli_query($sqlDynamic->conn, "START TRANSACTION");
                $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `users`(`Username`, `Password`,`GroupId`) VALUES ('$mobile','$randomPassmd5',$groupId)");
                $last_id = mysqli_insert_id($sqlDynamic->conn);
                $sqlDetail = mysqli_query($sqlDynamic->conn, "INSERT INTO `userdetails`(`UserId`,`Name`,`Mobile`) VALUES ($last_id,'$name','$mobile')");
                $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `headquarters`(`UserId`) VALUES ($last_id);");
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
        $sql = "UPDATE `userdetails` SET `Name`='$name' WHERE `UserId`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function delete($id)
    {
        $sql = "UPDATE `headquarters` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function accept($boothId)
    {
        $sql = "UPDATE `booths` SET `HeadQuarterApprove`=1 WHERE `Id`=$boothId";
        $rows = $this->execQuery($sql);
        return $rows;
    }
}
