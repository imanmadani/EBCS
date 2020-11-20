<?php
class BoothBuilderInfringement_model extends model
{
    public function get()
    {
        $sql = "SELECT myInfringement.Id AS Id,
                       myInfringement.Description,
                       myInfringement.QuantityType,
                       myInfringement.Amount,
                       myInfringement.FlagBlock,
                       myQuantityType.Title
                FROM `boothbuilderinfringements` AS myInfringement
                INNER JOIN `quantitytype` AS myQuantityType ON myInfringement.QuantityType=myQuantityType.Id 
                WHERE myInfringement.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `boothbuilderinfringements` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($description,$amount,$quantityType)
    {
        $sql = "INSERT INTO `boothbuilderinfringements`(`Description`,`Amount`,`QuantityType`) VALUES ('$description',$amount,$quantityType)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$description)
    {
        $sql = "UPDATE `boothbuilderinfringements` SET `Description`='$description' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `boothbuilderinfringements` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function quantityTypeDropDown()
    {
        $sql = "SELECT `Id`,`Title` FROM `quantitytype`";
        $rows = $this->getAll($sql);
        return $rows;
    }

}