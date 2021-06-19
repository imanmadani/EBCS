<?php
require_once "../Enum/ApproveState-Enum.php";

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

    public function getTask(){
        $sql="SELECT 
                myBooth.Id,myBooth.Name AS BoothName,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.AreaRial,myBooth.AreaArz,myBooth.AreaType,myBooth.Area2,myBooth.ConstructionType,
                myHall.Title AS HallName,myParticipantDetails.CompanyName AS BoothParty,myParticipantDetails.AgentName AS BoothPartyName,myParticipantDetails.AgentTell AS BoothPartyTell,
                CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExhibitionName , myBooth.FlagBlock
                FROM `booths` AS myBooth
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `participantdetails` AS myParticipantDetails ON myParticipant.Id=myParticipantDetails.ParticipantId
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE 
                    myBooth.ExecuterApprove!=1 
                OR  myBooth.ExecuterApprove is null 
                AND myBooth.FlagDelete=0 
                AND myBooth.FlagBlock=0
                AND myBooth.ArchitecturalExpertApprove=". ApproveStateEnum::Approve ;
        $rows = $this->getAll($sql);
        return $rows;

    }

    public function accept($boothId)
    {
        $sql = "UPDATE `booths` SET `ExecuterApprove`=1 WHERE `Id`=$boothId";
        $rows = $this->execQuery($sql);
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
                AND myEXexecuter.FlagBlock=0
                AND myEXexecuter.FlagDelete=0
                AND myExecuter.UserId=" . $user['Id'];
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getBoothByExecuter()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT myBooth.Id,myBooth.Name,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.AreaRial,myBooth.AreaArz,myBooth.AreaType,myAreaType.Title AS AreaTypeTitle, myBooth.Area2,myBooth.ConstructionType,myConst.Title AS ConstructionTypeTitle,myBooth.HasEquipment,
                       myHall.Title AS HallTitle,myParticipant.Username AS ParticipantUsername,
                       CONCAT(SUBSTR(myEx.Title, 1, 50),'...') as ExName ,
                       myBooth.FlagBlock,
                       myUser.Name AS BoothbuilderName,
                       myParticipantDetail.CompanyName
                FROM `executers` AS myExecuter
                INNER JOIN `exhibitionexecuters` AS myEXexecuter ON myExecuter.Id=myEXexecuter.ExecuterId
                INNER JOIN `exhibitions` As myEx ON myEXexecuter.ExhibitionId=myEx.Id
                INNER JOIN `booths` AS myBooth ON myEx.Id=myBooth.ExhibitionId
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                LEFT JOIN `participantdetails` AS myParticipantDetail ON myParticipant.Id=myParticipantDetail.ParticipantId
                LEFT  JOIN  `constructiontype` AS myConst ON myBooth.ConstructionType=myConst.Id
                LEFT  JOIN  `areatype` AS myAreaType ON myBooth.AreaType=myAreaType.Id
                LEFT  JOIN `boothboothbuilders` AS myBoothBoothbuilder ON myBoothBoothbuilder.BoothId=myBooth.Id
                LEFT JOIN `boothbuilders` AS myBoothbuilder ON myBoothbuilder.Id=myBoothBoothbuilder.BoothBuilderId
                LEFT JOIN `userdetails` AS myUser ON myUser.UserId=myBoothbuilder.UserId
                WHERE 
                    myBooth.FlagDelete=0 
                AND myBooth.FlagBlock=0 
                AND myEx.FlagBlock=0 
                AND myEx.FlagDelete=0 
                AND myEXexecuter.FlagBlock=0
                AND myEXexecuter.FlagDelete=0
                AND ((myBoothBoothbuilder.FlagDelete=0 AND myBoothBoothbuilder.FlagBlock=0) OR (myBoothBoothbuilder.FlagDelete is null AND myBoothBoothbuilder.FlagBlock is null) OR (myBooth.TechnicalExpertApprove = 2) )
                AND myExecuter.UserId=" . $user['Id'];
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

    public function update($id,$name, $username )
    {
        $sql = "UPDATE `users` SET `Username`='$username' WHERE `Id`=$id;";
        $rows = $this->execQuery($sql);
        $sql = "UPDATE `userdetails` SET `Mobile`='$username',Name='$name' WHERE `UserId`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function getBoothBuilder()
    {
        $sql = "                SELECT * FROM(
                   SELECT myUserdetail.Name,
       		        	  (SELECT (SUM(myBooth.AreaRial)+SUM(myBooth.AreaArz)) FROM boothboothbuilders AS myBoothBuilderRel 
                           INNER JOIN `booths` AS myBooth ON myBoothBuilderRel.BoothId=myBooth.Id
                           INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                           WHERE myBoothBuilderRel.FlagBlock=0 AND myBoothBuilderRel.FlagDelete=0 AND myBoothBuilderRel.BoothBuilderId=mybuilder.Id AND myEx.FlagBlock=0 AND myEx.FlagDelete=0 AND myBooth.FlagDelete=0 AND myBooth.FlagBlock=0
                          ) as MaxArea,
                           mybuilder.LimitArea AS BuilderLimit,
       		               mybuilder.Id,
                           mybuilder.Rate,
                           myBuilderGrade.LimitArea AS GradeLimit,
                           myBuilderGrade.Title AS Grade
                    FROM `boothbuilders` AS mybuilder
                    LEFT JOIN `userdetails` AS myUserdetail ON mybuilder.UserId=myUserdetail.UserId
                    LEFT JOIN `boothbuildergrades` AS myBuilderGrade ON mybuilder.GradeId=myBuilderGrade.Id
                    WHERE mybuilder.FlagDelete=0 AND mybuilder.FlagBlock=0 AND mybuilder.LicenseExpire>=NOW() 
                 ) AS BoothBuilderValid 
                   WHERE (GradeLimit>MaxArea AND BuilderLimit is null) OR (BuilderLimit>MaxArea ) OR (MaxArea is null)";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function setBoothBoothBuilder($boothId, $boothBuilderId)
    {
        $sqlUpdate="UPDATE `boothboothbuilders` SET `FlagDelete`=1 WHERE `BoothId`=$boothId";
        $rows = $this->execQuery($sqlUpdate);
        $sql = "INSERT INTO `boothboothbuilders`( `BoothId`, `BoothBuilderId`) VALUES ($boothId,$boothBuilderId)";
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
        if($image_type=='jpeg'){
            $image_type='jpg';
        }
        $file = $folderPath . $fileValidName . "." . $image_type;
        file_put_contents($file, $image_base64);
        $rows = '';
        $sqlDynamic = new model();
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
        mysqli_query($sqlDynamic->conn, "START TRANSACTION");
        $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `files`(`ViewName`, `Name`,`Length`,`Type`,`Category`) VALUES ('$name','$fileValidName',$length,'$contentType','Halls')");

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
        $sql = "SELECT myHallHalladmin.Id AS Id,myUserdetail.Name AS Name,
                       myHalladmin.Id AS HallAdminId
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

    public function getParticipantByExecuter()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT myParti.Id,
                       myParti.FlagBlock As FlagBlock,
                       myPartiDetail.CompanyName
                FROM `participants` AS myParti
                INNER JOIN `participantdetails` AS myPartiDetail ON myParti.Id=myPartiDetail.ParticipantId
                WHERE myParti.FlagDelete=0 AND myParti.ImportUserId=" . $user['Id'];
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function createParticipant($query)
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        foreach ($query as $participant) {
            $sqlDuplicate = "SELECT Id FROM `participants` WHERE `Username`='" . $participant['Username'] . "'  AND FlagDelete=0";
            $rowsDuplicate = $this->getRow($sqlDuplicate);
            if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
                $rows = false;
            } else {
                $randomPass = rand(1000000, 99999999);
                $randomPassmd5 = md5(bin2hex($randomPass));
                $smsText = "نام کاربری : " . $participant['Username'] . "\n" . " رمز عبور : " . $randomPass. "\n" ."https://design.iranfair.com/LoginParticipant";
                $smsResponse = $this->sendSms($participant['AgentTell'], $smsText);
                //$smsResponse = true;
                if ($smsResponse) {
                    $rows = '';
                    $sqlDynamic = new model();
                    mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
                    mysqli_query($sqlDynamic->conn, "START TRANSACTION");
                    $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `participants` (`Username`, `Password`, `ImportUserId`) VALUES ('" . $participant['Username'] . "','$randomPassmd5'," . $user['Id'] . ")");
                    $last_id = mysqli_insert_id($sqlDynamic->conn);
                    $sqlDetail = mysqli_query($sqlDynamic->conn, "INSERT INTO `participantdetails` (`ParticipantId`, `CompanyName`, `ComapnyAddress`, `ActivityField`, `Tell`, `Fax`, `EconomicCode`, `AdminName`, `AdminTell`, `AgentName`, `AgentTell`) 
                                                                        VALUES ($last_id,'" . $participant['CompanyName'] . "','" . $participant['CompanyAddress'] . "','" . $participant['ActivityField'] . "','" . $participant['Tell'] . "','" . $participant['Fax'] . "','" . $participant['EconomicCode'] . "','" . $participant['AdminName'] . "','" . $participant['AdminTell'] . "','" . $participant['AgentName'] . "','" . $participant['AgentTell'] . "')");
                    if ($sql && $sqlDetail) {
                        mysqli_query($sqlDynamic->conn, "COMMIT");
                        $rows = $sqlDetail;
                    } else {
                        mysqli_query($sqlDynamic->conn, "ROLLBACK");
                    }
                    mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
                } else {
                    $rows = 0;
                }
            }
        }

        return $rows;
    }

}
