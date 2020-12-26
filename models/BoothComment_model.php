<?php

class BoothComment_model extends model
{
    public function getCommentsByBooth($boothId)
    {
        $sql = "SELECT 
                myComment.Id,
                myComment.BoothId,
                myComment.HallAdminId,
                myComment.Description,
                myComment.UserInsertId,
                myComment.TimeStamp AS DateTime,
                myUser.Username,
                myGroup.Name AS GroupName,
                myUserdetail.Name AS HallAdminName
                FROM `boothcomments` AS myComment 
                INNER JOIN `users` AS myUser ON myComment.UserInsertId=myUser.Id
                LEFT JOIN `userdetails` AS myUserdetail ON myUser.Id=myUserdetail.UserId
                INNER JOIN `groups` AS myGroup ON myUser.GroupId=myGroup.Id
                INNER JOIN `halladmins` AS myHallAdmin ON myComment.HallAdminId=myHallAdmin.Id
                WHERE 
                myComment.BoothId=". $boothId." 
                AND myHallAdmin.FlagDelete=0
                AND myHallAdmin.FlagBlock=0
                ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function insertCommentByBooth($boothId,$halladminId,$description)
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "INSERT INTO `boothcomments` (
                `BoothId`, 
                `HallAdminId`,
                `Description`,
                `UserInsertId`
                ) VALUES (
                $boothId,
                $halladminId,
                '$description',".
                $user['Id'].")";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}