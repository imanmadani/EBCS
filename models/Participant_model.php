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
    public function getByToken()
    {
        $head = getallheaders();
        $user=$head['Token'];
        $sql = "SELECT 
                myParticipant.Id,
                myParticipant.PolicyApprove,
                myParticipantDetail.CompanyName,
                myParticipantDetail.ComapnyAddress,
                myParticipantDetail.ActivityField,
                myParticipantDetail.Tell,
                myParticipantDetail.Fax,
                myParticipantDetail.EconomicCode,
                myParticipantDetail.AdminName,
                myParticipantDetail.AdminTell,
                myParticipantDetail.AgentName,
                myParticipantDetail.AgentTell
                FROM `tokenparticipant` AS myToken
                INNER JOIN `participants` AS myParticipant ON myToken.UserId=myParticipant.Id
                INNER JOIN `participantdetails` AS myParticipantDetail ON myParticipant.Id=myParticipantDetail.ParticipantId
                WHERE `TokenCode`='$user'AND FlagValid=1";
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
                WHERE 
                myBooth.ParticipantId=$participantId 
                AND myExHall.FlagDelete=0
                AND myExHall.FlagBlock=0
                AND myBooth.FlagDelete=0
                AND myBooth.FlagBlock=0
                AND myEx.FlagDelete=0
                AND myEx.FlagBlock=0
                ORDER BY myBooth.Id DESC";
        $row = $this->getRow($sql);
        return $row;
    }
    public function getParticipantDetails($participantId)
    {
        $sql = "SELECT * From `participants` AS myPart
                INNER JOIN  `participantdetails` AS myPartDetail ON myPart.Id=myPartDetail.ParticipantId 
                WHERE myPart.Id=$participantId AND myPart.FlagDelete=0 AND myPart.FlagBlock=0";
        $row = $this->getRow($sql);
        return $row;
    }
    public function getBoothBuilder()
    {
        $sql = "SELECT * FROM(
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
    public function getBoothBuilderByBoothId($boothId)
    {
        $sql = "SELECT 
                myBoothBuilder.Id,
                myBoothBuilder.UserId,
                myBoothBuilder.GradeId,
                myBoothBuilder.Rate,
                myBoothBuilder.LimitArea,
                myBoothBuilder.FlagBlock,
                myBoothBuilder.FlagDelete,
                myUserDetail.Name AS CompanyName,
                AVG(myBuilderRate.Rate) AS Rate
                FROM `boothboothbuilders`  AS myBoothBuilderRel
                INNER JOIN `boothbuilders` AS myBoothBuilder ON myBoothBuilderRel.BoothBuilderId=myBoothBuilder.Id
                LEFT JOIN `userdetails` AS myUserDetail ON myBoothBuilder.UserId=myUserDetail.UserId
                LEFT JOIN `boothbuilderrates` AS myBuilderRate ON myBoothBuilder.Id=myBuilderRate.BoothBuilderId
                WHERE myBoothBuilderRel.BoothId=$boothId 
                AND myBoothBuilderRel.FlagDelete=0
                AND myBoothBuilderRel.FlagBlock=0";
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

    public function acceptPolicyForm($id){
        $sql = "UPDATE `participants` SET `PolicyApprove`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }

}
