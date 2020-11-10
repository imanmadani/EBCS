<?php
class Participant_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `groups` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `groups` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }

    public function getDataByParticipant($participantId)
    {
        $sql = "SELECT myGrade.Title AS GradeTitle,
                       myEx.Title AS ExTitle,
                       myEx.Year AS ExYear,
                       myBooth.Id AS BoothId,
                       myBooth.Name AS BoothName,
                       myBooth.AreaRial,
                       myBooth.AreaArz,
                       myBooth.AreaType,
                       myBooth.ConstructionType,
                       myHalls.Title AS HallTitle
                From `booths` AS myBooth
                INNER JOIN  `exhibitions` AS myEx ON myBooth.ExhibitionId=myEx.Id 
                INNER JOIN  `exhibitiongrades` AS myGrade ON myEx.GradeId=myGrade.Id 
                INNER JOIN  `exhibitionhalls` AS myExHall ON myBooth.ExhibitionHallId=myExHall.Id 
                INNER JOIN  `halls` AS myHalls ON myExHall.HallId=myHalls.Id 
                WHERE myBooth.ParticipantId=$participantId AND myBooth.FlagDelete=0";
        $row = $this->getRow($sql);
        return $row;
    }
    public function getParticipantDetails($participantId)
    {
        $sql = "SELECT * From `participants` AS myPart
                INNER JOIN  `participantdetails` AS myPartDetail ON myPart.Id=myPartDetail.ParticipantId 
                WHERE myPart.Id=$participantId AND myPart.FlagDelete=0";
        $row = $this->getRow($sql);
        return $row;
    }
    public function getBoothBuilder()
    {
        $sql = "SELECT * FROM(
			        SELECT mybuilder.Name,
       		        		  (SUM(myBooth.AreaRial)+SUM(myBooth.AreaArz)) AS MaxArea,
                           mybuilder.LimitArea AS BuilderLimit,
       		               mybuilder.Id,
                           mybuilder.Rate,
                           myBuilderGrade.LimitArea AS GradeLimit,
                           myBuilderGrade.Title AS Grade
                    FROM `boothbuilders` AS mybuilder
                    INNER JOIN `boothboothbuilders` AS myBoothBuilderRel ON mybuilder.Id=myBoothBuilderRel.BoothBuilderId
                    INNER JOIN `boothbuildergrades` AS myBuilderGrade ON mybuilder.GradeId=myBuilderGrade.Id
                    Inner JOIN `booths` AS myBooth ON myBoothBuilderRel.BoothId=myBooth.Id
                    WHERE mybuilder.FlagDelete=0 AND mybuilder.FlagBlock=0) AS BoothBuilderValid 
                WHERE (GradeLimit>MaxArea AND BuilderLimit=null) OR (BuilderLimit>MaxArea) ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getBoothBuilderByBoothId($boothId)
    {
        $sql = "SELECT * FROM `boothboothbuilders`  AS myBoothBuilderRel
                INNER JOIN `boothbuilders` AS myBoothBuilder ON myBoothBuilderRel.BoothBuilderId=myBoothBuilder.Id 
                WHERE `BoothId`=$boothId AND myBoothBuilderRel.FlagDelete=0";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function setBoothBoothBuilder($boothId,$boothBuilderId)
    {
        $sql = "INSERT INTO `boothboothbuilders`( `BoothId`, `BoothBuilderId`) VALUES ($boothId,$boothBuilderId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function setBoothBuilderRate($boothId,$boothBuilderId,$rate)
    {
        $sql = "INSERT INTO `boothbuilderrates`(`BoothId`, `BoothBuilderId`, `Rate`) VALUES ($boothId,$boothBuilderId,$rate)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function getBoothBuilderRateByBoothId($boothId)
    {
        $sql = "SELECT * FROM `boothbuilderrates`  AS myBuilderRate
                WHERE `BoothId`=$boothId";
        $rows = $this->getRow($sql);
        return $rows;
    }
}