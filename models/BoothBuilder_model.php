<?php
class BoothBuilder_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `boothbuilders` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getBoothBuilderTask($boothBuilderId)
    {
        $sql = "SELECT 
                       myBoothBuilderRel.Id As Id,
                       myBooth.Name AS BoothName,
                       myHall.Title AS HallName,
                       myParti.Username AS ParticipantName,
                       myEx.Title AS ExhibitionName,
                       myBoothBuilderRel.FlagDelete As FlagBlock
                FROM `boothboothbuilders` AS myBoothBuilderRel
                INNER JOIN `booths` AS myBooth ON myBoothBuilderRel.BoothId=myBooth.Id
                INNER JOIN 	`exhibitionhalls` As myExHall ON myBooth.ExhibitionHallId=myExHall.Id
                INNER JOIN `halls` AS myHall ON myExHall.HallId=myHall.Id
                INNER JOIN `participants` AS myParti ON myBooth.ParticipantId=myParti.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBoothBuilderRel.FlagDelete=0 AND myBoothBuilderRel.BoothBuilderId=$boothBuilderId";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `boothbuilders` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($name)
    {
        $sql = "INSERT INTO `boothbuilders`(`Name`) VALUES ('$name')";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$name)
    {
        $sql = "UPDATE `boothbuilders` SET `Name`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `boothbuilders` SET `FlagDelete`=1 WHERE `Id`=$id";
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

}