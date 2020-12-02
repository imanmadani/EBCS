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

}