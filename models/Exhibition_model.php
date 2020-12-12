<?php
require_once '../Enum/Group-Enum.php';

class Exhibition_model extends model
{
    public function get()
    {
        $sql = "SELECT myExhibition.Id,myExhibition.Year,myExhibition.Title,myExhibition.GradeId,myExhibition.FlagBlock,myExGrade.Title AS Grade ,myExhibition.StartDateTime,myExhibition.EndDateTime FROM `exhibitions` myExhibition
                INNER JOIN `exhibitiongrades` AS myExGrade ON myExhibition.GradeId=myExGrade.Id WHERE myExhibition.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `exhibitions` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function create($title, $year, $gradeId, $startDateTime, $endDateTime)
    {
        $sqlDuplicate = "SELECT Id FROM `exhibitions` WHERE `Title`='$title'  AND `Year`=$year AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if ($rowsDuplicate['Id'] and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "INSERT INTO `exhibitions`(`Title`,`Year`,`GradeId`,`StartDateTime`,`EndDateTime`) VALUES ('$title',$year,$gradeId,'$startDateTime','$endDateTime')";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }

    public function update($id, $title, $year, $gradeId)
    {
        $sqlDuplicate = "SELECT Id FROM `exhibitions` WHERE `Title`='$title'  AND `Year`=$year AND FlagDelete=0 AND Id!=$id";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if ($rowsDuplicate['Id'] and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "UPDATE `exhibitions` SET `Title`='$title' , `Year`=$year , `GradeId`=$gradeId WHERE `Id`=$id";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }

    public function delete($id)
    {
        $sql = "UPDATE `exhibitions` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function gradeDropDown()
    {
        $sql = "SELECT `Id`,`Title`,`Year` FROM `exhibitiongrades` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getByExhibitionId($exhibitionId)
    {
        $sql = "SELECT * FROM `exhibitionhalls` WHERE `ExhibitionId`=$exhibitionId AND `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function assignHall($exhibitionId, $hallId)
    {
        $sql = "INSERT INTO `exhibitionhalls`( `ExhibitionId`, `HallId`) VALUES ($exhibitionId,$hallId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function executerDropDown()
    {
        $sql = "SELECT 
                myExecuter.Id,
                myUserDetail.Name As Title 
                FROM `executers` AS myExecuter
                LEFT JOIN `userdetails` AS myUserDetail ON myExecuter.UserId=myUserDetail.UserId  
                WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function halladminDropDown()
    {
        $sql = "SELECT 
                myHallAdmin.Id,
                myUserDetail.Name As Title 
                FROM `halladmins` AS myHallAdmin 
                LEFT JOIN `userdetails` AS myUserDetail ON myHallAdmin.UserId=myUserDetail.UserId  
                WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function technicalExpertDropDown()
    {
        $sql = "SELECT 
                myTechnicalexpert.Id,
                myUserDetail.Name As Title 
                FROM `technicalexperts` AS myTechnicalexpert 
                LEFT JOIN `userdetails` AS myUserDetail ON myTechnicalexpert.UserId=myUserDetail.UserId  
                WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function architecturalExpertDropDown()
    {
        $sql = "SELECT 
                myArchitecturalexpert.Id,
                myUserDetail.Name As Title 
                FROM `architecturalexperts` AS myArchitecturalexpert
                LEFT JOIN `userdetails` AS myUserDetail ON myArchitecturalexpert.UserId=myUserDetail.UserId  
                WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function assignExecuter($exhibitionId, $executerId)
    {
        $sql = "INSERT INTO `exhibitionexecuters`( `ExhibitionId`, `ExecuterId`) VALUES ($exhibitionId,$executerId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function assignHalladmin($exhibitionId, $halladminId)
    {
        $sql = "INSERT INTO `exhibitionhalladmins`( `ExhibitionId`, `HalladminId`) VALUES ($exhibitionId,$halladminId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function assignTechnicalExpert($exhibitionId, $technicalExpertId)
    {
        $sql = "INSERT INTO `exhibitiontechnicalexperts`( `ExhibitionId`, `TechnicalExpertId`) VALUES ($exhibitionId,$technicalExpertId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function assignArchitecturalExpert($exhibitionId, $architecturalExpertId)
    {
        $sql = "INSERT INTO `exhibitionarchitecturalexperts`( `ExhibitionId`, `ArchitecturalExpertId`) VALUES ($exhibitionId,$architecturalExpertId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function deleteassignExecuter($id)
    {
        $sql = "UPDATE `exhibitionexecuters` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function deleteassignHalladmin($id)
    {
        $sql = "UPDATE `exhibitionhalladmins` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function deleteassignTechnicalExpert($id)
    {
        $sql = "UPDATE `exhibitiontechnicalexperts` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function deleteassignArchitecturalExpert($id)
    {
        $sql = "UPDATE `exhibitionarchitecturalexperts` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

    public function getExecuterByExhibitionId($exhibitionId)
    {
        $sql = "SELECT 
                myUserdetail.Name AS Name , 
                exexecuter.Id AS Id 
                FROM `exhibitionexecuters` AS exexecuter 
                INNER JOIN `executers` AS executer  ON exexecuter.ExecuterId=executer.Id 
                LEFT JOIN `userdetails` AS myUserdetail ON executer.UserId=myUserdetail.UserId
                WHERE exexecuter.ExhibitionId =$exhibitionId AND exexecuter.FlagDelete=0 AND executer.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getHalladminByExhibitionId($exhibitionId)
    {
        $sql = "SELECT 
                myUserdetail.Name AS Name ,
                myExHalladmin.Id AS Id 
                FROM `exhibitionhalladmins` AS myExHalladmin 
                INNER JOIN `halladmins` AS myHalladmin  ON myExHalladmin.HalladminId=myHalladmin.Id
                LEFT JOIN `userdetails` AS myUserdetail ON myHalladmin.UserId=myUserdetail.UserId
                WHERE myExHalladmin.ExhibitionId =$exhibitionId 
                AND myExHalladmin.FlagDelete=0 
                AND myHalladmin.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getTechnicalExpertByExhibitionId($exhibitionId)
    {
        $sql = "SELECT 
                myUserdetail.Name AS Name ,
                myTechnicalExpertRel.Id AS Id 
                FROM `exhibitiontechnicalexperts` AS myTechnicalExpertRel 
                INNER JOIN `technicalexperts` AS myTechnicalExpert  ON myTechnicalExpertRel.TechnicalExpertId=myTechnicalExpert.Id 
                LEFT JOIN `userdetails` AS myUserdetail ON myTechnicalExpert.UserId=myUserdetail.UserId
                WHERE myTechnicalExpertRel.ExhibitionId =$exhibitionId 
                AND myTechnicalExpertRel.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function getArchitecturalExpertByExhibitionId($exhibitionId)
    {
        $sql = "SELECT 
                myUserdetail.Name AS Name , 
                myArchitecturalExpertRel.Id AS Id 
                FROM `exhibitionarchitecturalexperts` AS myArchitecturalExpertRel 
                INNER JOIN `architecturalexperts` AS myArchitecturalExpert  ON myArchitecturalExpertRel.ArchitecturalExpertId=myArchitecturalExpert.Id 
                LEFT JOIN `userdetails` AS myUserdetail ON myArchitecturalExpert.UserId=myUserdetail.UserId
                WHERE myArchitecturalExpertRel.ExhibitionId =$exhibitionId 
                AND myArchitecturalExpertRel.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function assignHalldelete($id)
    {
        $sql = "UPDATE `exhibitionhalls` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }


}