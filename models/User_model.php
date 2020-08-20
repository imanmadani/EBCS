<?php
require_once '../entity/User.php';

class User_model extends model
{
    public function getRows()
    {
        $sql = "SELECT * FROM users";
        $rows = $this->getAll($sql);
        return $rows;
    }

    public function login($username = "", $password = "")
    {
        $sqlUser = "SELECT * FROM users";
        if ($username != "" and $password != "")
            $sqlUser .= " WHERE Username='$username' and Password='$password'";
        $row = $this->getRow($sqlUser);
        $userEntity = new User();
        $userEntity->Id = $row['Id'];
        $userEntity->UserName = $row['Username'];
        $userEntity->Ip=$_SERVER['REMOTE_ADDR'];
        $TokenCode=md5($row['Username']).bin2hex(openssl_random_pseudo_bytes(10));
        $sqlToken = "INSERT INTO Token (UserId,Ip,TokenCode)
                               VALUES($userEntity->Id,'$userEntity->Ip','$TokenCode'); ";
        $res = $this->execQuery($sqlToken);
        if($res){
            $userEntity->TokenCode = $TokenCode;
        }
        return $userEntity;
    }


    public function LogOut($token)
    {
        $sql = "UPDATE users SET FlagValid='False',UpdateTime=Date('c') WHERE TokenCode=$token";
        $res = $this->execQuery($sql);
        return $res;
    }
}