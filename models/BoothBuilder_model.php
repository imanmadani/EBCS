<?php
require_once "../Enum/BillType-Enum.php";
require_once "../Enum/ApproveState-Enum.php";

class BoothBuilder_model extends model
{
    public function get()
    {
        $sql = "SELECT myBoothBuilder.Id,
                       myBoothBuilder.FlagBlock,
                       myBoothBuilder.GradeId,
                       myBoothBuilder.LimitArea AS SLimitArea,
                       myBoothBuilder.Rate,
                       myBoothBuilder.LicenseExpire,
                       myBoothbuildergrades.Title AS Grade,
                       myBoothbuildergrades.LimitArea,
                       myUserDetail.Name,
                       myUserDetail.Mobile,
                       myUser.Username,
                       myUser.Id AS UserId,
                       myBuilderRate.Rate AS Rate
                FROM `boothbuilders` AS myBoothBuilder 
                INNER JOIN `boothbuildergrades` AS myBoothbuildergrades ON myBoothBuilder.GradeId=myBoothbuildergrades.Id
                INNER JOIN `users` AS myUser ON myBoothBuilder.UserId=myUser.Id 
                LEFT JOIN `userdetails` AS myUserDetail ON myUser.Id=myUserDetail.UserId
                LEFT JOIN `boothbuilderrates` AS myBuilderRate ON myBoothBuilder.Id=myBuilderRate.BoothBuilderId
                WHERE myBoothBuilder.FlagDelete=0
                AND myBoothBuilder.FlagBlock=0
                GROUP BY myBoothBuilder.Id
                ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getGrade()
    {
        $sql = "SELECT * FROM `boothbuildergrades` WHERE FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getFileHse($id)
    {
        $sql = "SELECT * FROM `boothbuilderhse` WHERE FlagDelete=0 AND BoothBuilderId=$id ORDER BY Id DESC LIMIT 1";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function getFileLicense($id)
    {
        $sql = "SELECT * FROM `boothbuilderlicense` WHERE FlagDelete=0 AND BoothBuilderId=$id";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getBoothBuilderImageTypes()
    {
        $sql = "SELECT * FROM `boothbuilderimagetype` WHERE FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getFileHseByUser($boothbuilderId)
    {

        $sql = "SELECT * FROM `boothbuilderhse` WHERE FlagDelete=0 AND BoothBuilderId= $boothbuilderId ORDER BY Id DESC LIMIT 1";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function getFileLicenseByUser($boothbuilderId)
    {
        $sql = "SELECT * FROM `boothbuilderlicense` WHERE FlagDelete=0  AND BoothBuilderId= $boothbuilderId";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getBoothBuilderTask()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);

        $billTypeValid = BillTypeEnum::ExhibitionService;
        $sql = "SELECT 
                       myBoothBuilderRel.Id As Id,
                       myBooth.Name AS BoothName,
                       myBooth.Id AS BoothId,
                       myBooth.ConstructionType,   
                       myBooth.AreaRial,
                       myBooth.AreaArz,
                       myBooth.Area2,
                       myHall.Title AS HallName,
                       myParti.Username AS ParticipantName,
                       myPartiDetail.CompanyName,
                       CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExhibitionName,
                       myBill.Id AS BillId,
                       myBill.PayStatus,
                       myBill.QuantityType,
                       myBill.Quantity,
                       myBill.Amount,
                       myUserDetail.Mobile,
                       myBoothBuilderRel.FlagDelete As FlagBlock
                FROM `boothbuilders` AS myBoothBuilder     
                LEFT JOIN  `userdetails` AS myUserDetail ON myBoothBuilder.UserId= myUserDetail.UserId
                INNER JOIN `boothboothbuilders` AS myBoothBuilderRel ON myBoothBuilder.Id=myBoothBuilderRel.BoothBuilderId
                INNER JOIN `booths` AS myBooth ON myBoothBuilderRel.BoothId=myBooth.Id
                INNER JOIN `bills` AS myBill ON myBooth.Id=myBill.BoothId
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `participants` AS myParti ON myBooth.ParticipantId=myParti.Id
                LEFT JOIN `participantdetails` AS myPartiDetail ON myParti.Id=myPartiDetail.ParticipantId
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBoothBuilderRel.FlagDelete=0 
                AND myBoothBuilderRel.FlagBlock=0 
                AND myEx.FlagDelete=0
                AND myEx.FlagBlock=0
                AND myBill.BillType=$billTypeValid
                AND myBill.FlagDelete=0
                AND myBooth.FlagDelete=0 
                AND myBooth.FlagBlock=0 
                AND (myBooth.TechnicalExpertApprove=" . ApproveStateEnum::DisApprove . " 
                OR  myBooth.TechnicalExpertApprove IS " . ApproveStateEnum::None . ")
                AND myBoothBuilder.UserId=" . $user['Id'];
//              AND (TIMEDIFF(NOW(), myBooth.TechnicalExpertApproveDateTime)>'01:00:00' OR  myBooth.TechnicalExpertApproveDateTime is null)
               $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `boothbuilders` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function getByToken()
    {
        $head = getallheaders();
        $user=$head['Token'];
        $sql = "SELECT myBoothBuilder.Id,
                       myBoothBuilder.PolicyApprove
                FROM `token` AS myToken
                INNER JOIN `boothbuilders` AS myBoothBuilder ON myToken.UserId=myBoothBuilder.UserId
                WHERE myToken.TokenCode='$user'AND FlagValid=1";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function getGradeById($id)
    {
        $sql = "SELECT * FROM `boothbuildergrades` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($mobile, $groupId, $name, $gradeId,$regNumber,$agentName,$agentTell)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$mobile' AND FlagDelete=0";
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
                $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `boothbuilders`(`UserId`,`GradeId`,`RegistrationNumber`,`AgentName`,`AgentTell`) VALUES ($last_id,$gradeId,'$regNumber','$agentName','$agentTell');");
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

    public function createGrade($title, $limitarea)
    {
        $sqlDuplicate = "SELECT Id FROM `boothbuildergrades` WHERE `Title`='$title' AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "INSERT INTO `boothbuildergrades`(`Title`,`LimitArea`) VALUES ('$title',$limitarea)";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }

    public function update($id,$name, $username,$gradeId)
    {
        $sql = "UPDATE `boothbuilders` SET `GradeId`='$gradeId' WHERE `UserId`=$id";
        $rows = $this->execQuery($sql);
        $sql = "UPDATE `users` SET `Username`='$username' WHERE `Id`=$id;";
        $rows = $this->execQuery($sql);
        $sql = "UPDATE `userdetails` SET `Mobile`='$username',Name='$name' WHERE `UserId`=$id";
        $rows = $this->execQuery($sql);

        return $rows;
    }
    public function updateLicenseExpire($id, $licenseExpire)
    {

        $sql = "UPDATE `boothbuilders` SET `LicenseExpire`='$licenseExpire' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function updateGrade($id, $title, $limitarea)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Title`='$title'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "UPDATE `boothbuildergrades` SET `Title`='$title' , `LimitArea`=$limitarea WHERE `Id`=$id";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }

    public
    function delete($id)
    {
        $sql = "UPDATE `boothbuilders` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public
    function deleteGrade($id)
    {
        $sql = "UPDATE `boothbuildergrades` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public
    function uploadPlan($id, $image, $name, $length, $contentType,$type)
    {
        $folderPath = "../Files/Plans/";
        $request = $image;
        $image_parts = explode(";base64,", $request);
        $image_base64 = base64_decode($image_parts[1]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        if($image_type==''){
           $image_type_aux = explode("application/", $image_parts[0]);
           $image_type = $image_type_aux[1]; 
        }
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
        $sql = mysqli_query($sqlDynamic->conn, "INSERT INTO `files`(`ViewName`, `Name`,`Length`,`Type`,`Category`) VALUES ('$name','$fileValidName',$length,'$contentType','Plans')");
        $last_id = mysqli_insert_id($sqlDynamic->conn);
        $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `boothboothbuilderplans`(`BoothBoothbuilderId`,`FileId`,`Type`) VALUES ($id,$last_id,$type);");
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
    function uploadHSE($boothBuilderId, $image, $name, $length, $contentType)
    {
        $folderPath = "../Files/HSE/";
        $request = $image;
        $image_parts = explode(";base64,", $request);
        $image_base64 = base64_decode($image_parts[1]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $fileValidName = uniqid();
        $file = $folderPath . $fileValidName . "." . $image_type;
        file_put_contents($file, $image_base64);
        $sql = "INSERT INTO `boothbuilderhse`(`BoothbuilderId`,`ViewName`, `Name`,`Length`,`Type`) VALUES ($boothBuilderId,'$name','$fileValidName',$length,'$contentType')";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public
    function uploadLicense($boothBuilderId, $image, $name, $length, $contentType)
    {
        $folderPath = "../Files/BoothBuilderLicense/";
        $request = $image;
        $image_parts = explode(";base64,", $request);
        $image_base64 = base64_decode($image_parts[1]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $fileValidName = uniqid();
        $file = $folderPath . $fileValidName . "." . $image_type;
        file_put_contents($file, $image_base64);
        $sql = "INSERT INTO `boothbuilderlicense`(`BoothbuilderId`,`ViewName`, `Name`,`Length`,`Type`) VALUES ($boothBuilderId,'$name','$fileValidName',$length,'$contentType')";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public
    function getUploadFileByBoothBoothbuilderId($boothBoothBuilderId)
    {
        $sql = "SELECT 
                       myFile.Id As Id,
                       myFile.Name AS NameDB,
                       myFile.Length AS Size,
                       myFile.ViewName As Name,
                       myTask.Id AS PlanId,
                       myTask.Type,
                       myType.Title AS TypeTitle,
                       myTask.PlanApprove
                FROM `boothboothbuilderplans` AS myTask
                INNER JOIN `files` AS myFile ON  myTask.FileId=myFile.Id
                INNER JOIN `boothbuilderimagetype` AS myType ON myTask.Type=myType.Id
                WHERE myFile.FlagDelete=0 AND myTask.BoothBoothbuilderId=$boothBoothBuilderId";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public
    function deletePlan($id)
    {
        $sql = "UPDATE  `boothboothbuilderplans` As myTaskPlan,`files` As myFile
                SET myFile.FlagDelete =1,myTaskPlan.FlagDelete=1
                WHERE myFile.Id = myTaskPlan.FileId AND myTaskPlan.FileId=$id AND myFile.Id=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public
    function boothBuilderGradeDropDown()
    {
        $sql = "SELECT Id,Title AS Title FROM `boothbuildergrades` WHERE FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function endAction($id)
    {
        $sqlPlan = "SELECT plan.Id FROM `boothboothbuilders` as builder
                         INNER JOIN boothboothbuilderplans AS plan ON builder.Id = plan.BoothBoothbuilderId
                         WHERE builder.FlagDelete = 0 AND builder.BoothId=".$id;
        $rowsPlan = $this->getRow($sqlPlan);
        if (isset($rowsPlan['Id']) and $rowsPlan['Id'] > 0) {
        $sql = "UPDATE `booths` SET `TechnicalExpertApprove`=" . ApproveStateEnum::EndAction . " WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        }else{
           $rows=null; 
        }
        return $rows;
    }
    public function acceptPolicyForm($id){
        $sql = "UPDATE `boothbuilders` SET `PolicyApprove`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function getPlanCommentsByboothboothbuilderplanId($boothboothbuilderplanId)
    {
        $sql = "SELECT * FROM `boothboothbuilderplancomments`
                WHERE BoothBoothbuilderplanId=$boothboothbuilderplanId AND FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
        public function updateBuilderGrade($id, $name)
    {

        $sql = "UPDATE `boothbuilders` SET `GradeId`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
}
