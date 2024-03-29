<?php
require_once "../Enum/BillType-Enum.php";
require_once "../Enum/QuantityType-Enum.php";
require_once "../Enum/AreaType-Enum.php";

class Booth_model extends model
{
    public function get()
    {
        $sql = "SELECT myBooth.Id,myBooth.Name,myBooth.ExhibitionHallId,myBooth.ParticipantId,myBooth.AreaRial,myBooth.AreaArz,myBooth.AreaType,myBooth.Area2,myBooth.ConstructionType,myBooth.HasEquipment,
                       myHall.Title AS HallTitle,myParticipant.Username AS ParticipantUsername,
                      CONCAT(SUBSTR(myEx.Title, 1, 20),'...') AS ExName , myBooth.FlagBlock
                FROM `booths` AS myBooth 
                INNER JOIN `exhibitionhalls` AS myHallEx ON myBooth.ExhibitionHallId=myHallEx.Id
                INNER JOIN `halls` AS myHall ON myHallEx.HallId=myHall.Id
                INNER JOIN `participants` AS myParticipant ON myBooth.ParticipantId=myParticipant.Id
                INNER JOIN `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id
                WHERE myBooth.FlagDelete=0 AND myBooth.FlagBlock=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `booths` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($name, $exhibitionId, $exHallId, $participantId, $areaRial, $areaArz, $area2, $constructionType,$hasEquipment)
    {

        $sqlDuplicate = "SELECT Id FROM `booths` WHERE `Name`='$name' AND `ExhibitionId`=$exhibitionId AND `ExhibitionHallId`=$exHallId AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $areaType = null;
            if ($areaRial > 0) {
                if ($areaArz > 0) {
                    $areaType = AreaTypeEnum::Arz_Rial;
                } else {
                    $areaType = AreaTypeEnum::Rial;
                }
            } else {
                if ($areaArz > 0) {
                    $areaType = AreaTypeEnum::Arz;
                } else {
                    $areaType = null;
                }
            }
            $rows = '';
            $sqlDynamic = new model();
            mysqli_query($sqlDynamic->conn, "SET AUTOCOMMIT=0");
            mysqli_query($sqlDynamic->conn, "START TRANSACTION");
            $sql = mysqli_query($sqlDynamic->conn,
                "INSERT INTO `booths`(`Name`,`ExhibitionId`, `ExhibitionHallId`, `ParticipantId`,`AreaRial`,`AreaArz`,`AreaType`,`Area2`,`ConstructionType`,`HasEquipment`)
                               VALUES ('$name',$exhibitionId,$exHallId,$participantId,$areaRial,$areaArz,$areaType,$area2,$constructionType,$hasEquipment)");
            $last_id = mysqli_insert_id($sqlDynamic->conn);
            $count = 1;
            $amount = 10000;
            $billType = BillTypeEnum::ExhibitionService;
            $quantityType = QuantityTypeEnum::Meter;
            $sql2 = mysqli_query($sqlDynamic->conn, "INSERT INTO `bills`( `BoothId`,`BillType`, `QuantityType`, `Quantity`, `Amount`) VALUES ($last_id,$billType,$quantityType,$count,$amount)");
            $head = getallheaders();
            $ip = $_SERVER['REMOTE_ADDR'];
            $user = $this->getUserByToken($head['Token'], $ip);
            $user=$user['Id'];
            $boothbuilderSql="SELECT Id FROM boothbuilders WHERE UserId=$user";
            $boothBuilderId = $this->getRow($boothbuilderSql);
            $boothBuilderId=$boothBuilderId['Id'];
            $sqlUpdate="UPDATE `boothboothbuilders` SET `FlagDelete`=1 WHERE `BoothId`=$last_id";
            $rows = $this->execQuery($sqlUpdate);
            $sql = "INSERT INTO `boothboothbuilders`( `BoothId`, `BoothBuilderId`) VALUES ($last_id,$boothBuilderId)";
            $this->execQuery($sql);
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

    public function update($id, $name, $exhibitionId, $hallId, $participantId, $area, $area2)
    {
        $sqlDuplicate = "SELECT Id FROM `booths` WHERE `Name`='$name' AND `ExhibitionId`=$exhibitionId AND `ExhibitionHallId`=$hallId AND Id!=$id AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "UPDATE `booths` SET `Name`='$name' , `ExhibitionId`=$exhibitionId ,
                                    `ExhibitionHallId`=$hallId,`ParticipantId`=$participantId
                WHERE `Id`=$id";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }

    public function updateConstType($id, $constType)
    {
        $sql = "UPDATE `booths` SET `ConstructionType`='$constType' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function delete($id)
    {
        $sql = "UPDATE `booths` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function exhibitionDropDown()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT myEx.Id,CONCAT(SUBSTR(myEx.Title, 1, 40),'...') AS Title  FROM `exhibitions` AS myEx
                INNER JOIN `exhibitionexecuters` AS myExExecuter ON myEx.Id=myExExecuter.ExhibitionId  
                INNER JOIN `executers` AS myExecuter ON myExExecuter.ExecuterId=myExecuter.Id 
                WHERE myEx.FlagDelete=0 AND myEx.FlagBlock=0 AND myExExecuter.FlagDelete=0 AND myExecuter.UserId=".$user['Id'];
                //GROUP BY myEx.Id";
        //AND myExecuter.UserId=$user['Id']
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function constTypeDropDown()
    {
        $sql = "SELECT * FROM `constructiontype`";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function hallDropDown($exhibitionId)
    {
        $sql = "SELECT myexHall.Id , myhall.Title FROM `exhibitionhalls` As myexHall
                INNER JOIN `halls` As myhall ON myexHall.HallId=myhall.Id
                WHERE myhall.FlagDelete=0 AND myexHall.FlagDelete=0  AND myexHall.ExhibitionId=$exhibitionId";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function participantDropDown()
    {
        $sql = "SELECT 
                myParti.Id,
                myPartiDetail.CompanyName AS Title 
                FROM `participants` AS myParti
                INNER JOIN `participantdetails` AS myPartiDetail ON myParti.Id=myPartiDetail.ParticipantId
                WHERE FlagDelete=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
}
