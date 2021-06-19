<?php
class HallGrade_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `hallgrades` WHERE `FlagDelete`=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `hallgrades` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($title)
    {
        $sqlDuplicate = "SELECT Id FROM `hallgrades` WHERE `Title`='$title'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "INSERT INTO `hallgrades`(`Title`) VALUES ('$title')";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }
    public function update($id,$title)
    {
        $sqlDuplicate = "SELECT Id FROM `hallgrades` WHERE `Title`='$title'  AND Id!=$id AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "UPDATE `hallgrades` SET `Title`='$title'  WHERE `Id`=$id";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `hallgrades` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    
}
