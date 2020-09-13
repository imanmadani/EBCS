<?php

class model
{
    protected $conn;

    public function __construct()
    {
        //3308
        $this->conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME,3306);
        mysqli_query($this->conn, "SET NAMES " . DB_COLL);

    }

    public function execQuery($sql)
    {
        $res = mysqli_query($this->conn, $sql);
        return $res;
    }

    public function getAll($sql)
    {
        $res = mysqli_query($this->conn, $sql);
        $rows = array();
        while ($row = mysqli_fetch_assoc($res))
            $rows[] = $row;
        return $rows;
    }

    public function getRow($sql)
    {
        $res = mysqli_query($this->conn, $sql);
        $row = mysqli_fetch_assoc($res);
        return $row;
    }

    public function getUserByToken($token,$ip)
    {
        $row = $this->getRow("SELECT * FROM `token` AS myToken INNER JOIN users As myUser ON myToken.UserId=myUser.Id WHERE TokenCode='$token' and Ip='$ip'");
        return ($row);
    }

    public function setTokenHistory($tokenId,$controller,$method)
    {
        $sqlTokenHistory = "INSERT INTO `tokenhistory`(`TokenId`, `Controller`, `Method`)
                                                  VALUES($tokenId,'$controller','$method')";
        $row = $this->execQuery($sqlTokenHistory);
        return ($row);
    }

}

?>