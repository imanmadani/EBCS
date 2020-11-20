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

    public function create($title,$year,$gradeId,$startDateTime,$endDateTime)
    {
        $sql = "INSERT INTO `exhibitions`(`Title`,`Year`,`GradeId`,`StartDateTime`,`EndDateTime`) VALUES ('$title',$year,$gradeId,'$startDateTime','$endDateTime')";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$title,$year,$gradeId)
    {
        $sql = "UPDATE `exhibitions` SET `Title`='$title' , `Year`=$year , `GradeId`=$gradeId WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
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
    public function assignHall($exhibitionId,$hallId)
    {
        $sql = "INSERT INTO `exhibitionhalls`( `ExhibitionId`, `HallId`) VALUES ($exhibitionId,$hallId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function executerDropDown()
    {
        $sql = "SELECT `Id`,`Name` As Title FROM `executers` WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function halladminDropDown()
    {
        $sql = "SELECT `Id`,`Name` As Title FROM `halladmins` WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function technicalExpertDropDown()
    {
        $sql = "SELECT `Id`,`Name` As Title FROM `technicalexperts` WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function architecturalExpertDropDown()
    {
        $sql = "SELECT `Id`,`Name` As Title FROM `architecturalexperts` WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function assignExecuter($exhibitionId,$executerId)
    {
        $sql = "INSERT INTO `exhibitionexecuters`( `ExhibitionId`, `ExecuterId`) VALUES ($exhibitionId,$executerId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function assignHalladmin($exhibitionId,$halladminId)
    {
        $sql = "INSERT INTO `exhibitionhalladmins`( `ExhibitionId`, `HalladminId`) VALUES ($exhibitionId,$halladminId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function assignTechnicalExpert($exhibitionId,$technicalExpertId)
    {
        $sql = "INSERT INTO `exhibitiontechnicalexperts`( `ExhibitionId`, `TechnicalExpertId`) VALUES ($exhibitionId,$technicalExpertId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function assignArchitecturalExpert($exhibitionId,$architecturalExpertId)
    {
        $sql = "INSERT INTO `exhibitionarchitecturalExperts`( `ExhibitionId`, `ArchitecturalExpertId`) VALUES ($exhibitionId,$architecturalExpertId)";
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
        $sql = "SELECT executer.Name AS Name , exexecuter.Id AS Id FROM `exhibitionexecuters` AS exexecuter INNER JOIN `executers` AS executer  ON exexecuter.ExecuterId=executer.Id WHERE exexecuter.ExhibitionId =$exhibitionId AND exexecuter.FlagDelete=0 AND executer.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getHalladminByExhibitionId($exhibitionId)
    {
        $sql = "SELECT myHalladmin.Name AS Name , myExHalladmin.Id AS Id FROM `exhibitionhalladmins` AS myExHalladmin INNER JOIN `halladmins` AS myHalladmin  ON myExHalladmin.HalladminId=myHalladmin.Id WHERE myExHalladmin.ExhibitionId =$exhibitionId AND myExHalladmin.FlagDelete=0 AND myHalladmin.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getTechnicalExpertByExhibitionId($exhibitionId)
    {
        $sql = "SELECT myTechnicalExpert.Name AS Name , myTechnicalExpertRel.Id AS Id FROM `exhibitiontechnicalexperts` AS myTechnicalExpertRel INNER JOIN `technicalexperts` AS myTechnicalExpert  ON myTechnicalExpertRel.TechnicalExpertId=myTechnicalExpert.Id WHERE myTechnicalExpertRel.ExhibitionId =$exhibitionId AND myTechnicalExpertRel.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getArchitecturalExpertByExhibitionId($exhibitionId)
    {
        $sql = "SELECT myArchitecturalExpert.Name AS Name , myArchitecturalExpertRel.Id AS Id FROM `exhibitionarchitecturalexperts` AS myArchitecturalExpertRel INNER JOIN `architecturalexperts` AS myArchitecturalExpert  ON myArchitecturalExpertRel.ArchitecturalExpertId=myArchitecturalExpert.Id WHERE myArchitecturalExpertRel.ExhibitionId =$exhibitionId AND myArchitecturalExpertRel.FlagDelete=0";
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