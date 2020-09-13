<?php
require_once '../entity/User.php';
require_once '../entity/MenuAccess.php';
class Group_model extends model
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
    public function create($name)
    {
        $sql = "INSERT INTO `groups`(`Name`) VALUES ('$name')";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$name)
    {
        $sql = "UPDATE `groups` SET `Name`='$name' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `groups` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function getMenuWithAccess($groupId)
    {
        $sql = "SELECT 
        myMenu.Id,
        myMenu.Title,
        myMenu.Icon FROM  menus As myMenu 
        WHERE FlagDelete=0";
        $res = $this->getAll($sql);
        $modelList=[];
        foreach($res AS $menu){
            $model=new MenuAccessClass();
            $model->MenuId=$menu['Id'];
            $model->MenuTitle=$menu['Title'];
            $model->MenuIcon=$menu['Icon'];
            $model->GroupId=NULL;
            $model->GroupAccessId=NULL;
            $sql2 = "SELECT * From groupaccess Where MenuId=$model->MenuId AND GroupId=$groupId AND FlagDelete=0";
            $row2 = $this->getRow($sql2);
            if($row2['Id']>0){
            $model->GroupId=$row2['GroupId'];
            $model->GroupAccessId=$row2['Id'];
            }
            array_push($modelList,$model);
        }
        return $modelList;

    }
    public function setMenuAccess($menuId,$groupId)
    {
        $sql = "INSERT INTO `groupaccess`(`GroupId`, `MenuId`) VALUES ($groupId,$menuId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function deleteMenuAccess($groupAccessId)
    {
        $sql = "UPDATE `groupaccess` SET `FlagDelete`=1 WHERE `Id`=$groupAccessId";
        $rows = $this->execQuery($sql);
        return $rows;
    }
}