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
        $sql = "SELECT myBooth.Name AS BoothName,
                       myHall.Title AS HallName,
                       myParti.Username AS ParticipantName,
                       myEx.Title AS ExhibitionName,
                       myBoothBuilderRel.FlagDelete As FlagBlock
                FROM `boothboothbuilders` AS myBoothBuilderRel
                INNER JOIN `booths` AS myBooth ON myBoothBuilderRel.BoothId=myBooth.Id
                INNER JOIN `halls` AS myHall ON myBooth.HallId=myHall.Id
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

}