<?php

class Group_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetById($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->getById($id);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }
    public function Create($query)
    {
        $name = $this->getVal('Name', $query);
        $rows = $this->_model->create($name);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Update($query)
    {
        $id = $this->getVal('Id', $query);
        $name = $this->getVal('Name', $query);
        $rows = $this->_model->update($id,$name);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function Delete($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->delete($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function GetMenuWithAccess($query)
    {
        $groupId = $this->getVal('GroupId', $query);
        $row = $this->_model->getMenuWithAccess($groupId);
        $this->_res->set("row", $row);
        $this->_res->output();
    }
    public function SetMenuAccess($query)
    {
        $menuId = $this->getVal('MenuId', $query);
        $groupId = $this->getVal('GroupId', $query);
        $rows = $this->_model->setMenuAccess($menuId,$groupId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function DeleteMenuAccess($query)
    {
        $groupAccessId = $this->getVal('Id', $query);
        $rows = $this->_model->deleteMenuAccess($groupAccessId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}