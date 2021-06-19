<?php
require_once '../entity/User.php';

class Guest_model extends model
{
    public function login($username, $password)
    {
        $Passmd5 = md5(bin2hex($password));
        $sqlUser = "SELECT * FROM users WHERE Username='$username' and Password='$Passmd5'";
        $row = $this->getRow($sqlUser);
        if($row['Id']) {
            $userEntity = new User();
            $userEntity->Id = $row['Id'];
            $userEntity->UserName = $row['Username'];
            $userEntity->Ip = $_SERVER['REMOTE_ADDR'];
            $TokenCode = md5($row['Username']) . bin2hex(openssl_random_pseudo_bytes(4));
            $sqlToken = "INSERT INTO token(UserId,Ip,TokenCode)
                               VALUES($userEntity->Id,'$userEntity->Ip','$TokenCode'); ";
            $res = $this->execQuery($sqlToken);
            if ($res) {
                $userEntity->TokenCode = $TokenCode;
            }
            return $userEntity;
        }else{

        }
    }
    public function getExhibitionActive()
    {
        $sql = "SELECT 
                        myExhibition.Id,
                        myExhibition.Title,
                        myExhibition.StartDateTime,
                        myExhibition.EndDateTime FROM `exhibitions` AS myExhibition
                        WHERE FlagDelete=0 AND FlagBlock=0";
        $rows = $this->getAll($sql);
        foreach($rows as $key=>$val) {
            $sqlHall="SELECT
                        myHall.Id,
                        myExhibitionHall.Id AS ExhibitionHallId,
                        myHall.Title AS HallTitle
                        FROM `exhibitionhalls` AS myExhibitionHall
                        INNER JOIN `halls` AS myHall
                        ON myExhibitionHall.HallId=myHall.Id
                        WHERE myExhibitionHall.ExhibitionId=".$val['Id']."
                        AND myExhibitionHall.FlagBlock=0 AND myExhibitionHall.FlagDelete=0";
             $rowsHall = $this->getAll($sqlHall);
            foreach ($rowsHall as $valHall){
                $rows[$key]['Hall'][]=(object)['Id'=>$valHall['Id'],'ExhibitionHallId'=>$valHall['ExhibitionHallId'],'Title'=>$valHall['HallTitle']];
            }
        }
        return $rows;
    }
    public function getBoothsByHall($exhibitionHallId)
    {
        $sql="SELECT myBooth.Name,
                     myParticipant.CompanyName,
                     myParticipant.ComapnyAddress,
                     myParticipant.ActivityField, 
                     myParticipant.Tell, 
                     myParticipant.AdminName
                     FROM `booths` AS myBooth 
              INNER JOIN `participantdetails` AS myParticipant
              ON myBooth.ParticipantId=myParticipant.ParticipantId
              WHERE myBooth.FlagBlock=0 AND myBooth.FlagDelete=0 AND myBooth.ExhibitionHallId=$exhibitionHallId";
        $rows=$this->getAll($sql);
        return $rows;
    }

    public function forgetPass($mobile)
    {
        $rows=null;
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$mobile'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if (isset($rowsDuplicate['Id']) and $rowsDuplicate['Id'] > 0) {
            $randomPass = rand(1000000, 99999999);
            $randomPassmd5 = md5(bin2hex($randomPass));
            $id=$rowsDuplicate['Id'];
            $smsText = "نام کاربری : " . $mobile . "\n" . " رمز عبور : " . $randomPass . "\n" ."https://design.iranfair.com/";
            $smsResponse = $this->sendSms($mobile, $smsText);
            if ($smsResponse) {
                $sql="UPDATE `users` SET `Password`='$randomPassmd5',`UpdateTime`=NOW() WHERE Id=$id";
                $rows = $this->execQuery($sql);
            }
        }else{
            $rows=false;
        }
        return $rows;

    }
}
