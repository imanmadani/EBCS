<?php
require_once "../Enum/IPG-Enum.php";
require_once "../Enum/BillType-Enum.php";

class model
{
    protected $conn;

    public function __construct()
    {
        //3306
        $this->conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, 3308);
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

    public function getUserByToken($token, $ip)
    {
        $row = $this->getRow("SELECT * FROM `token` AS myToken INNER JOIN users As myUser ON myToken.UserId=myUser.Id WHERE TokenCode='$token' and Ip='$ip'");
        return ($row);
    }

    public function checkToken($token, $ip)
    {
        $row = $this->getRow("SELECT myToken.Id FROM `token` AS myToken INNER JOIN users As myUser ON myToken.UserId=myUser.Id WHERE TokenCode='$token' and Ip='$ip'");
        $this->execQuery("UPDATE `exhibitions` SET `FlagBlock`= 1 WHERE `EndDateTime` < NOW()");
        return ($row);
    }

    public function getTokenHistoryByTokenId($token)
    {
        $row = $this->getRow("SELECT * FROM tokenhistory WHERE TokenId=$token AND InsertTime<=NOW() ORDER BY Id LIMIT 1");
        return ($row);
    }

    public function setTokenHistory($tokenId, $controller, $method)
    {
        $sqlTokenHistory = "INSERT INTO `tokenhistory`(`TokenId`, `Controller`, `Method`)
                                                  VALUES($tokenId,'$controller','$method')";
        $row = $this->execQuery($sqlTokenHistory);
        return ($row);
    }

    public function unvalidToken($tokenId)
    {
        $sqlTokenHistory = "UPDATE `token` SET `FlagValid`=0 WHERE `Id`=$tokenId";
        $row = $this->execQuery($sqlTokenHistory);
        return ($row);
    }

    public function sendSms($mobile, $text)
    {
        $text = $text . "\n" . "نمایشگاه بین المللی تهران";
        $sms_client = new SoapClient('http://payamak-service.ir/SendService.svc?wsdl', array('encoding' => 'UTF-8'));
        $parameters['userName'] = "c.malek64";
        $parameters['password'] = "06831";
        $parameters['fromNumber'] = "10009611";
        $parameters['toNumbers'] = array($mobile);
        $parameters['messageContent'] = $text;
        $parameters['isFlash'] = false;
        $recId = array(0);
        $status = 0x0;
        $parameters['recId'] = &$recId;
        $parameters['status'] = &$status;
        $result = $sms_client->SendSMS($parameters)->SendSMSResult;
        if ($result == 0) {
            return true;
        } else {
            return false;
        }

    }




}

?>
