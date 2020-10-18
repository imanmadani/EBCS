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
    public function getBoothBuilder($boothId)
    {
        $sql = "SELECT * FROM `boothboothbuilders`  AS myBoothBuilderRel
                INNER JOIN `boothbuilders` AS myBoothBuilder ON myBoothBuilderRel.BoothBuilderId=myBoothBuilder.Id 
                WHERE `BoothId`=$boothId AND myBoothBuilderRel.FlagDelete=0";
        $rows = $this->getRow($sql);
        return $rows;
    }
}