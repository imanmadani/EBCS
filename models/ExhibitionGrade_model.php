<?php
class ExhibitionGrade_model extends model
{
    public function get()
    {
        $sql = "SELECT * FROM `exhibitiongrades` WHERE `FlagDelete`=0 ";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `exhibitiongrades` WHERE `Id`=$id";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($title,$year)
    {
        $sqlDuplicate = "SELECT Id FROM `exhibitiongrades` WHERE `Title`='$title' AND `Year`=$year AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if($rowsDuplicate['Id'] and $rowsDuplicate['Id']>0){
            $rows=false;
        }else{
        $sql = "INSERT INTO `exhibitiongrades`(`Title`,`Year`) VALUES ('$title',$year)";
        $rows = $this->execQuery($sql);
        }
        return $rows;
    }
    public function update($id,$title,$year)
    {
        $sqlDuplicate = "SELECT Id FROM `exhibitiongrades` WHERE `Title`='$title' AND `Year`=$year AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if($rowsDuplicate['Id'] and $rowsDuplicate['Id']!=$id){
            $rows=false;
        }else{
        $sql = "UPDATE `exhibitiongrades` SET `Title`='$title' , `Year`=$year  WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        }
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `exhibitiongrades` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    
}