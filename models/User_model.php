<?php
require_once '../entity/User.php';

class User_model extends model
{
    public function get($groupId)
    {
        $sql = "SELECT * FROM users WHERE GroupId=$groupId AND FlagDelete=0";
        $rows = $this->getAll($sql);
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
        $sql = "INSERT INTO `users`(`Username`, `Password`, `GroupId`) VALUES ('$username','$password',$groupId)";
        $rows = $this->execQuery($sql);
        return $rows;
    }
    public function update($id,$username)
    {
        $sql = "UPDATE `users` SET `Username`='$username' WHERE `Id`=$id";
        $rows = $this->execQuery($sql);
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
        $user=$this->getUserByToken($head['token'],$ip);
        $sql = "UPDATE token SET FlagValid=0 WHERE UserId=".$user['Id'];
        $res = $this->execQuery($sql);
        return $res;
    }

    public function GetMenuByUser()
    {
        $head = getallheaders();
        $ip = $_SERVER['REMOTE_ADDR'];
        $user = $this->getUserByToken($head['token'], $ip);
        $sql = "SELECT myMenu.Id,myMenu.Title,myMenu.Link,myMenu.Icon FROM groupaccess AS myGrpAccess
                INNER JOIN menus As myMenu ON myGrpAccess.MenuId=myMenu.Id
                WHERE  myGrpAccess.FlagDelete=0 AND myMenu.FlagDelete=0 AND  GroupId=" . $user['GroupId']." ORDER BY myMenu.Id";
        $res = $this->getAll($sql);
        return $res;
    }

    
}