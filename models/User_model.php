<?php
require_once '../entity/User.php';

class User_model extends model
{
    public function get()
    {
        $sql = "SELECT 
                myUser.Username,
                myUser.FlagBlock,
                myUserdetail.Name,
                myUserdetail.Mobile,
                myGroup.Name AS GroupName
                FROM `users` AS myUser
                LEFT JOIN `userdetails` AS myUserdetail ON myUser.Id= myUserdetail.UserId
                INNER JOIN `groups` AS myGroup ON myUser.GroupId=myGroup.Id
                WHERE  myUser.FlagDelete=0";
        $rows = $this->getAll($sql);
        return $rows;
    }
    public function getByToken()
    {
        $head = getallheaders();
        $user=$head['Token'];
        $sql = "SELECT 
                myToken.UserId,
                myUserDetail.Name,
                myGroup.Name AS GroupName
                FROM `token` AS myToken
                INNER JOIN `users` AS myUser ON myToken.UserId=myUser.Id
                INNER JOIN `userdetails` AS myUserDetail ON myUser.Id=myUserDetail.UserId
                INNER JOIN `groups` AS myGroup ON myUser.GroupId=myGroup.Id
                WHERE `TokenCode`='$user'AND FlagValid=1";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM `users` WHERE `Id`=$id ";
        $rows = $this->getRow($sql);
        return $rows;
    }
    public function create($username,$password,$groupId)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$username'  AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if ($rowsDuplicate['Id'] and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "INSERT INTO `users`(`Username`, `Password`, `GroupId`) VALUES ('$username','$password',$groupId)";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }
    public function update($id,$username)
    {
        $sqlDuplicate = "SELECT Id FROM `users` WHERE `Username`='$username' AND Id!=$id AND FlagDelete=0";
        $rowsDuplicate = $this->getRow($sqlDuplicate);
        if ($rowsDuplicate['Id'] and $rowsDuplicate['Id'] > 0) {
            $rows = false;
        } else {
            $sql = "UPDATE `users` SET `Username`='$username' WHERE `Id`=$id";
            $rows = $this->execQuery($sql);
        }
        return $rows;
    }
    public function delete($id)
    {
        $sql = "UPDATE `users` SET `FlagDelete`=1 WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
        return $rows;
    }
//    public function login($username, $password)
//    {
//        $sqlUser = "SELECT * FROM users";
//        if ($username and $password)
//            $sqlUser .= " WHERE Username='$username' and Password='$password'";
//        $row = $this->getRow($sqlUser);
//        $userEntity = new User();
//        $userEntity->Id = $row['Id'];
//        $userEntity->UserName = $row['Username'];
//        $userEntity->Ip = $_SERVER['REMOTE_ADDR'];
//        $TokenCode = md5($row['Username']) . bin2hex(openssl_random_pseudo_bytes(10));
//        $sqlToken = "INSERT INTO Token (UserId,Ip,TokenCode)
//                               VALUES($userEntity->Id,'$userEntity->Ip','$TokenCode'); ";
//        $res = $this->execQuery($sqlToken);
//        if ($res) {
//            $userEntity->TokenCode = $TokenCode;
//        }
//        return $userEntity;
//    }


    public function LogOut($token)
    {
        $head=getallheaders();
        $ip=$_SERVER['REMOTE_ADDR'];
        $user=$this->getUserByToken($head['Token'],$ip);
        $sql = "UPDATE token SET FlagValid=0 WHERE UserId=".$user['Id'];
        $res = $this->execQuery($sql);
        return $res;
    }

    public function GetMenuByUser()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['Token'], $ip);
        $sql = "SELECT myMenu.Id,myMenu.Title,myMenu.Link,myMenu.Icon,myMenu.MenuRef FROM groupaccess AS myGrpAccess
                INNER JOIN menus As myMenu ON myGrpAccess.MenuId=myMenu.Id
                WHERE  myGrpAccess.FlagDelete=0 AND myMenu.FlagDelete=0 AND  GroupId=" . $user['GroupId']." ORDER BY myMenu.Id";
        $res = $this->getAll($sql);
        return $res;
    }

    
}