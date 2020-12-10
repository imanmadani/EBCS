<?php
class ParticipantAdmin_model extends model
{
    public function getByUser()
    {
        $sql = "SELECT myPart.Username,myPart.FlagBlock,myPartDetail.CompanyName,
                       myPartDetail.Tell,myPartDetail.EconomicCode,myPartDetail.AdminName,
                       myPartDetail.AdminTell,myPartDetail.AgentName,myPartDetail.AgentTell,
                       myEx.Year,myEx.Title,myHall.Title AS HallTitle,myBooth.Name
                       FROM `participants` AS myPart
                INNER JOIN `participantdetails` AS myPartDetail
                ON myPart.Id=myPartDetail.ParticipantId
                INNER JOIN `booths` AS myBooth
                ON myPart.Id=myBooth.ParticipantId
                INNER JOIN `exhibitions` AS myEx
                ON myBooth.ExhibitionId=myEx.Id
                INNER JOIN `exhibitionhalls` AS myExHall
                ON myBooth.ExhibitionHallId=myExHall.Id 
                INNER JOIN `halls` AS myHall
                ON myExHall.HallId=myHall.Id 
                WHERE myPart.FlagDelete=0 AND myPart.FlagBlock=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
}