<?php

class BoothBuilder_controller extends controller
{
    public function Get()
    {
        $rows = $this->_model->get();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetGrade()
    {
        $rows = $this->_model->getGrade();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetfileHSE($query)
    {
        $id = $this->getVal('BoothBuilderId', $query);
        $rows = $this->_model->getFileHse($id);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }
    public function GetfileLicense($query)
    {
        $id = $this->getVal('BoothBuilderId', $query);
        $rows = $this->_model->getFileLicense($id);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetBoothBuilderImageTypes()
    {
        $rows = $this->_model->getBoothBuilderImageTypes();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetfileHSEByUser($query)
    {
        $boothBuilder = $this->_model->getByToken()['Id'];
        $rows = $this->_model->getFileHseByUser($boothBuilder);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }
    public function GetfileLicenseByUser($query)
    {
        $boothBuilder = $this->_model->getByToken()['Id'];
        $rows = $this->_model->getFileLicenseByUser($boothBuilder);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function GetBoothBuilderTask($query)
    {
        $rows = $this->_model->getBoothBuilderTask();
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
    public function GetByToken()
    {
        $rows = $this->_model->getByToken();
        $this->_res->set("row", $rows);
        $this->_res->output();
    }
    public function GetGradeById($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->getGradeById($id);
        $this->_res->set("row", $rows);
        $this->_res->output();
    }
    public function Create($query)
    {
        $mobile = $this->getVal('Mobile', $query);
        $groupId =5;
        $name = $this->getVal('Name', $query);
        $regNumber=$this->getVal('RegNumber', $query);
        $agentName=$this->getVal('AgentName', $query);
        $agentTell=$this->getVal('AgentTell', $query);
        $gradeId = $this->getVal('GradeId', $query);
        $rows = $this->_model->create($mobile,$groupId,$name,$gradeId,$regNumber,$agentName,$agentTell);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function CreateGrade($query)
    {
        $title = $this->getVal('Title', $query);
        $limitarea = $this->getVal('LimitArea', $query);
        $rows = $this->_model->createGrade($title,$limitarea);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function Update($query)
    {
        $id = $this->getVal('UserId', $query);
        $name = $this->getVal('Name', $query);
        $mobile = $this->getVal('Mobile', $query);
        $gradeId = $this->getVal('GradeId', $query);
        $rows = $this->_model->update($id,$name,$mobile,$gradeId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function UpdateLicenseExpire($query)
    {
        $id = $this->getVal('Id', $query);
        $licenseExpire = $this->getVal('LicenseExpire', $query);
        $rows = $this->_model->updateLicenseExpire($id,$licenseExpire);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function UpdateGrade($query)
    {
        $id = $this->getVal('Id', $query);
        $title = $this->getVal('Title', $query);
        $limitarea = $this->getVal('LimitArea', $query);
        $rows = $this->_model->updateGrade($id,$title,$limitarea);
        $this->_res->set("result", $rows);
        if($rows){$this->_res->output();}else{$this->_res->output(409,ResultEnum::Duplicate);}
    }
    public function Delete($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->delete($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function DeleteGrade($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deleteGrade($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function UploadPlan($query)
    {
        $Id = $this->getVal('Id', $query);
        $name = $this->getVal('Name', $query);
        $length = $this->getVal('Length', $query);
        $contentType = $this->getVal('ContentType', $query);
        $image = $this->getVal('Data', $query);
        $type = $this->getVal('Type', $query);
        $rows = $this->_model->uploadPlan($Id,$image,$name,$length,$contentType,$type);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function UploadHSE($query)
    {
        $boothBuilder = $this->_model->getByToken()['Id'];
        $name = $this->getVal('Name', $query);
        $length = $this->getVal('Length', $query);
        $contentType = $this->getVal('ContentType', $query);
        $image = $this->getVal('Data', $query);
        $rows = $this->_model->uploadHSE($boothBuilder,$image,$name,$length,$contentType);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function uploadLicense($query)
    {
        $boothBuilder = $this->_model->getByToken()['Id'];
        $name = $this->getVal('Name', $query);
        $length = $this->getVal('Length', $query);
        $contentType = $this->getVal('ContentType', $query);
        $image = $this->getVal('Data', $query);
        $rows = $this->_model->uploadLicense($boothBuilder,$image,$name,$length,$contentType);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function GetUploadFileByBoothBoothbuilderId($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->getUploadFileByBoothBoothbuilderId($id);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function DeletePlan($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->deletePlan($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
    public function BoothBuilderGradeDropDown($query)
    {
        $rows = $this->_model->boothBuilderGradeDropDown();
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }
    public function EndAction($query)
    {
        $id = $this->getVal('Id', $query);
        $rows = $this->_model->endAction($id);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }

    public function AcceptPolicyForm($query)
    {
        $boothBuilderId = $this->getVal('Id', $query);
        $rows = $this->_model->acceptPolicyForm($boothBuilderId);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }

    public function GetPlanCommentsByboothboothbuilderplanId($query)
    {
        $boothBoothbuilderPlanId = $this->getVal('BoothBoothbuilderPlanId', $query);
        $rows = $this->_model->getPlanCommentsByboothboothbuilderplanId($boothBoothbuilderPlanId);
        $this->_res->set("rows", $rows);
        $this->_res->output();
    }

    public function UpdateBuilderGrade($query)
    {
        $id = $this->getVal('Id', $query);
        $name = $this->getVal('GradeId', $query);
        $rows = $this->_model->updateBuilderGrade($id,$name);
        $this->_res->set("result", $rows);
        $this->_res->output();
    }
}
