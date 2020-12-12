<?php

class Executer_model extends model
{
    public function get()
    {
        $sql = "SELECT
                myExecuter.Id,
                myExecuter.Rate,
                myUser.Username,
                myUser.Id As UserId,
                myUserDetail.Name,
                myUserDetail.Mobile,
                myExecuter.FlagBlock
                FROM `executers` AS myExecuter
                INNER JOIN `users` AS myUser ON myExecuter.UserId=myUser.Id
                LEFT JOIN `userdetails` AS myUserDetail ON myUser.Id=myUserDetail.UserId  
                WHERE myExecuter.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getHallByExecuter()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT myHallEx.Id,
                       myHall.Title AS HallTitle,
                       myEx.Title AS ExName , 
                       myHallEx.FlagBlock,
                       myEx.Id AS ExhibitionId
                FROM `executers` AS myExecuter
                INNER JOIN `exhibitionexecuters` AS myEXexecuter ON myExecuter.Id=myEXexecuter.ExecuterId
                INNER JOIN `exhibitions` As myEx ON myEXexecuter.ExhibitionId=myEx.Id
                INNER JOIN `exhibitionhalls` AS myHallEx ON myEx.Id=myHallEx.ExhibitionId
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                WHERE 
                myHallEx.FlagDelete=0 
                AND myHallEx.FlagBlock=0
                AND myEx.FlagDelete=0
                AND myEx.FlagBlock=0 
                AND myExecuter.UserId=" . $user['Id'];
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getBoothByExecuter()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT myBooth.Id,myBooth.Name,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.AreaRial,myBooth.AreaArz,myBooth.AreaType,myBooth.Area2,myBooth.ConstructionType,
                       myHall.Title AS HallTitle,myParticipant.Username AS ParticipantUsername,
                       myEx.Title AS ExName , myBooth.FlagBlock
                FROM `executers` AS myExecuter
                INNER JOIN `exhibitionexecuters` AS myEXexecuter ON myExecuter.Id=myEXexecuter.ExecuterId
                INNER JOIN `exhibitions` As myEx ON myEXexecuter.ExhibitionId=myEx.Id
                INNER JOIN `booths` AS myBooth ON myEx.Id=myBooth.ExhibitionId
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                WHERE myBooth.FlagDelete=0 AND myEx.FlagBlock=0 AND myExecuter.UserId=" . $user['Id'];
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `executers` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($groupId, $name, $mobile)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$mobile'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if ($rowsDuplicate['Id'] and $rowsDuplicate['Id'] > 0) {
            echo $rowsDuplicate['Id'];
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
                $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `executers`(`UserId`) VALUES ($last_id);");
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
        $sql = "UPDATE `executers` SET `Name`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public
    function delete($id)
    {
        $sql = "UPDATE `executers` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public
    function uploadPlan($id, $image, $name, $length, $contentType)
    {
        $folderPath = "../Files/Halls/";
        $request = $image;
        $image_parts = explode(";base64,", $request);
        $image_base64 = base64_decode($image_parts[1]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $fileValidName = uniqid();
        $file = $folderPath . $fileValidName . "." . $image_type;
        file_put_contents($file, $image_base64);
        $rows = '';
        $sqlDynamic = new model();
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
        mysqli_query($sqlDynamic->conn, "START TRANSACTION");
        $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `files`(`ViewName`, `Name`,`Length`,`Type`,`Category`) VALUES ('$name','$fileValidName',$length,'$contentType','Plans')");
        $last_id = mysqli_insert_id($sqlDynamic->conn);
        $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `exhibitionhallplans`(`ExhibitionHallId`,`FileId`) VALUES ($id,$last_id);");
        if ($sql && $sql2) {
            mysqli_query($sqlDynamic->conn, "COMMIT");
            $rows = $sql2;
        } else {
            mysqli_query($sqlDynamic->conn, "ROLLBACK");
        }
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
        return $rows;
    }

    public
    function getUploadFileByExhibitionHallId($exhibitionHallId)
    {
        $sql = "SELECT 
                       myFile.Id As Id,
                       myFile.Name AS NameDB,
                       myFile.Length AS Size,
                       myFile.ViewName As Name
                FROM `exhibitionhallplans` AS myTask
                INNER JOIN `files` AS myFile ON  myTask.FileId=myFile.Id
                WHERE myFile.FlagDelete=0 AND myTask.ExhibitionHallId=$exhibitionHallId";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public
    function deletePlan($id)
    {
        $sql = "UPDATE  `exhibitionhallplans` As myTaskPlan,`files` As myFile
                SET myFile.FlagDelete =1,myTaskPlan.FlagDelete=1
                WHERE myFile.Id = myTaskPlan.FileId AND myTaskPlan.FileId=$id AND myFile.Id=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public
    function getHallAdminsByExhibition($exhibitionId)
    {
        $sql = "SELECT 
                       myUserdetail.Name AS Title,
                       myHalladmin.Id AS HallAdminId
                FROM `exhibitionhalladmins` AS myExHalladmin
                INNER JOIN `halladmins` AS myHalladmin ON  myExHalladmin.HalladminId=myHalladmin.Id
                LEFT JOIN `userdetails` AS myUserdetail ON myHalladmin.UserId=myUserdetail.UserId
                WHERE myExHalladmin.FlagDelete=0 AND myExHalladmin.ExhibitionId=$exhibitionId";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public
    function assignHalladmin($exhibitionHallId, $hallAdminId)
    {
        $sql = "INSERT INTO `hallhalladmins`(`ExhibitionHallId`, `HallAdminId`) VALUES ($exhibitionHallId,$hallAdminId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public
    function getHallAdminsByExhibitionHall($exhibitionHallId)
    {
        $sql = "SELECT myHallHalladmin.Id AS Id,myUserdetail.Name AS Name
                FROM `hallhalladmins` AS myHallHalladmin
                INNER JOIN `halladmins` AS myHalladmin ON  myHallHalladmin.HallAdminId=myHalladmin.Id
                LEFT JOIN `userdetails` AS myUserdetail ON myHalladmin.UserId=myUserdetail.UserId
                WHERE myHallHalladmin.FlagDelete=0 AND myHallHalladmin.ExhibitionHallId=$exhibitionHallId";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public
    function deleteAssignHalladmin($id)
    {
        $sql = "UPDATE  `hallhalladmins` SET FlagDelete =1 WHERE Id = $id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}