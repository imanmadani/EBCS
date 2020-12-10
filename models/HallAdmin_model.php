<?php
class HallAdmin_model extends model
{
    public function get()
    {
        $sql = "SELECT myHallAdmin.Id,myHallAdmin.Name,myHallAdmin.Rate,myUser.Username,myUser.Id As UserId,myHallAdmin.FlagBlock
                FROM `halladmins` AS myHallAdmin
                INNER JOIN `users` AS myUser ON myHallAdmin.UserId=myUser.Id 
                WHERE myHallAdmin.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getHallAdminTask()
    {
        $head=getallheaders();
        $ip=$_SERVER['REMOTE_ADDR'];
        $user=$this->getUserByToken($head['Token'],$ip);
        $sql = "SELECT 
                       myHallAdmin.Id AS HallAdminId,
                       myHall.Title AS HallName,
                       myEx.Title AS ExhibitionName,
                       myBooth.Name AS BoothName,
                       myBooth.Id AS BoothId,
                       myParticipant.CompanyName AS BoothParty,
                       myParticipant.AgentName AS BoothPartyName,
                       myParticipant.AgentTell AS BoothPartyTell,
                       myBooth.FlagBlock
                From `halladmins` AS myHallAdmin        
                INNER JOIN `hallhalladmins` AS myHallAdminRel ON myHallAdmin.Id=myHallAdminRel.HallAdminId 
                INNER JOIN `exhibitionhalls` AS myExhibitionhall ON myHallAdminRel.ExhibitionHallId=myExhibitionhall.Id
                INNER JOIN `booths` AS myBooth ON myExhibitionhall.Id=myBooth.ExhibitionHallId            
                INNER JOIN `participantdetails` AS myParticipant ON myBooth.ParticipantId=myParticipant.ParticipantId
                INNER JOIN `halls` AS myHall ON myExhibitionhall.HallId=myHall.Id
                INNER JOIN `exhibitions` AS myEx ON myExhibitionhall.ExhibitionId=myEx.Id
                WHERE 
                myHallAdminRel.FlagDelete=0
                AND myHallAdminRel.FlagBlock=0 
                AND myHallAdmin.UserId=".$user['Id'];
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `halladmins` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($username,$password,$groupId,$name)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$username'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if ($rowsDuplicate['Id'] and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $rows = '';
            $sqlDynamic = new model();
            mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
            mysqli_query($sqlDynamic->conn, "START TRANSACTION");
            $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `users`(`Username`, `Password`, `GroupId`) VALUES ('$username','$password',$groupId)");
            $last_id = mysqli_insert_id($sqlDynamic->conn);
            $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `halladmins`(`UserId`,`Name`) VALUES ($last_id,'$name');");
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
    public function update($id,$name)
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