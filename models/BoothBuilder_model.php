<?php
require_once "../Enum/BillType-Enum.php";
class BoothBuilder_model extends model
{
    public function get()
    {
        $sql = "SELECT myBoothBuilder.Id,
                       myBoothBuilder.FlagBlock,
                       myBoothBuilder.GradeId,
                       myBoothBuilder.LimitArea AS SLimitArea,
                       myBoothBuilder.Name,
                       myBoothBuilder.Rate,
                       myBoothbuildergrades.Title AS Grade,
                       myBoothbuildergrades.LimitArea
                FROM `boothbuilders` AS myBoothBuilder 
                INNER JOIN `boothbuildergrades` AS myBoothbuildergrades ON myBoothBuilder.GradeId=myBoothbuildergrades.Id
                WHERE myBoothBuilder.FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getGrade()
    {
        $sql = "SELECT * FROM `boothbuildergrades` WHERE FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getBoothBuilderTask()
    {
        $head=getallheaders();
        $ip=$_SERVER['REMOTE_ADDR'];
        $user=$this->getUserByToken($head['Token'],$ip);

        $billTypeValid=BillTypeEnum::ExhibitionService;
        $sql = "SELECT 
                       myBoothBuilderRel.Id As Id,
                       myBooth.Name AS BoothName,
                       myHall.Title AS HallName,
                       myParti.Username AS ParticipantName,
                       myEx.Title AS ExhibitionName,
                       myBill.PayStatus,
                       myBill.QuantityType,
                       myBill.Quantity,
                       myBill.Amount,
                       myBoothBuilderRel.FlagDelete As FlagBlock
                FROM `BoothBuilders` AS myBoothBuilder     
                INNER JOIN `boothboothbuilders` AS myBoothBuilderRel ON myBoothBuilder.Id=myBoothBuilderRel.BoothBuilderId
                INNER JOIN `booths` AS myBooth ON myBoothBuilderRel.BoothId=myBooth.Id
                INNER JOIN `bills` AS myBill ON myBooth.Id=myBill.BoothId
                INNER JOIN `exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `participants` AS myParti ON myBooth.ParticipantId=myParti.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBoothBuilderRel.FlagDelete=0 AND myBill.BillType=$billTypeValid AND myBoothBuilder.UserId=".$user['Id'];
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `boothbuilders` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function getGradeById($id)
    {
        $sql = "SELECT * FROM `boothbuildergrades` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($username,$password,$groupId,$name,$gradeId)
    {
        $rows='';
        $sqlDynamic=new model();
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
        mysqli_query($sqlDynamic->conn,"START TRANSACTION");
        $sql = mysqli_query($sqlDynamic->conn,"INSERT INTO `users`(`Username`, `Password`, `GroupId`) VALUES ('$username','$password',$groupId)");
        $last_id = mysqli_insert_id($sqlDynamic->conn);
        $sql2 = mysqli_query($sqlDynamic->conn,"INSERT INTO `boothbuilders`(`UserId`,`Name`,`GradeId`) VALUES ($last_id,'$name',$gradeId);");
        if($sql && $sql2) {
            mysqli_query($sqlDynamic->conn,"COMMIT");
            $rows=$sql2;
        } else {
            mysqli_query($sqlDynamic->conn,"ROLLBACK");
        }
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
        return $rows;
    }
    public function createGrade($title,$limitarea)
    {
        $sql = "INSERT INTO `boothbuildergrades`(`Title`,`LimitArea`) VALUES ('$title',$limitarea)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$name)
    {
        $sql = "UPDATE `boothbuilders` SET `Name`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function updateGrade($id,$title,$limitarea)
    {
        $sql = "UPDATE `boothbuildergrades` SET `Title`='$title' , `LimitArea`=$limitarea WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `boothbuilders` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function deleteGrade($id)
    {
        $sql = "UPDATE `boothbuildergrades` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function uploadPlan($id,$image,$name,$length,$contentType)
    {
        $folderPath = "../Files/Plans/";
        $request = $image;
        $image_parts = explode(";base64,", $request);
        $image_base64 = base64_decode($image_parts[1]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $fileValidName=uniqid();
        $file = $folderPath . $fileValidName .".".$image_type;
        file_put_contents($file, $image_base64);
        $rows='';
        $sqlDynamic=new model();
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
        mysqli_query($sqlDynamic->conn,"START TRANSACTION");
        $sql = mysqli_query($sqlDynamic->conn,"INSERT INTO `files`(`ViewName`, `Name`,`Length`,`Type`,`Category`) VALUES ('$name','$fileValidName',$length,'$contentType','Plans')");
        $last_id = mysqli_insert_id($sqlDynamic->conn);
        $sql2 = mysqli_query($sqlDynamic->conn,"INSERT INTO `boothboothbuilderplans`(`BoothBoothbuilderId`,`FileId`) VALUES ($id,$last_id);");
        if($sql && $sql2) {
            mysqli_query($sqlDynamic->conn,"COMMIT");
            $rows=$sql2;
        } else {
            mysqli_query($sqlDynamic->conn,"ROLLBACK");
        }
        mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=1");
        return $rows;
    }
    public function getUploadFileByBoothBoothbuilderId($boothBoothBuilderId)
    {
        $sql = "SELECT 
                       myFile.Id As Id,
                       myFile.Name AS NameDB,
                       myFile.Length AS Size,
                       myFile.ViewName As Name
                FROM `boothboothbuilderplans` AS myTask
                INNER JOIN `files` AS myFile ON  myTask.FileId=myFile.Id
                WHERE myFile.FlagDelete=0 AND myTask.BoothBoothbuilderId=$boothBoothBuilderId";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function deletePlan($id)
    {
        $sql = "UPDATE  `boothboothbuilderplans` As myTaskPlan,`files` As myFile
                SET myFile.FlagDelete =1,myTaskPlan.FlagDelete=1
                WHERE myFile.Id = myTaskPlan.FileId AND myTaskPlan.FileId=$id AND myFile.Id=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function boothBuilderGradeDropDown()
    {
        $sql = "SELECT Id,Title AS Title FROM `boothBuildergrades` WHERE FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
}