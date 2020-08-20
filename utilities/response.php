<?php 
class Response 
{
    protected $_data = array();
    public function set($key, $value)
    {
        $this->_data[$key] = $value;
    }
    public function get($key)
    {
        return $this->_data[$key];
    }
    public function output($status=200,$message="OK")
    {
//        header("Content Type:application/json");
//        header("HTTP/1.1 $status");
        $res['status']=$status;
        $res['massage']=$message;
        $res['data'] = $this->_data;
        $res=json_encode($res);
        echo  $res;
        exit;
    }
}

?>