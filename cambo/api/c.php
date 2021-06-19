<?php
require_once('../lib/nusoap/nusoap.php');

//$testoss='test_';
set_time_limit (60*5);
//sleep(2);
if(isset($_GET['mgh'])) {
    ini_set('display_errors',1);
    ini_set('display_startup_errors',1);
    error_reporting(-1);
}
else{
    error_reporting(0);
}
header('Content-Type: application/json');
$json=file_get_contents('php://input');
if(isset($_GET['mockdata'])){
    $json='[{"IDeliveryNote":"behrad","IDocDate":"2020-06-14T13:47:44.097","IPstngDate":"2020-06-14T13:47:44.097","Development":null,"ItItem":[{"PurchaseOrder":"1105621665","PurchaseItem":10,"Material":"1017903","Quantity":22.00,"Unit":"KI","Plant":"1509","StorageLoc":"0001"},{"PurchaseOrder":"1105621665","PurchaseItem":20,"Material":"1017901","Quantity":10.00,"Unit":"KI","Plant":"1509","StorageLoc":"0001"},{"PurchaseOrder":"1105621665","PurchaseItem":30,"Material":"1017898","Quantity":9.00,"Unit":"KI","Plant":"1509","StorageLoc":"0001"},{"PurchaseOrder":"1105621665","PurchaseItem":40,"Material":"1017896","Quantity":6.00,"Unit":"KI","Plant":"1509","StorageLoc":"0001"},{"PurchaseOrder":"1105621665","PurchaseItem":50,"Material":"1017893","Quantity":5.00,"Unit":"KI","Plant":"1509","StorageLoc":"0001"},{"PurchaseOrder":"1105621665","PurchaseItem":60,"Material":"1017891","Quantity":90.00,"Unit":"KI","Plant":"1509","StorageLoc":"0001"},{"PurchaseOrder":"1105621665","PurchaseItem":70,"Material":"1000447","Quantity":10.00,"Unit":"KI","Plant":"1509","StorageLoc":"0001"}]}]';
}
$obj=json_decode($json,true);
$testlog=true;
$test=false;
if(isset($_GET['dev'])){ $test=true; }
if(isset($_GET['ERSVersion'])){ $version=$_GET['ERSVersion']; }else{$version='0.0.0.0';}
;
$version=explode('.',$version);
if(!isset($version) or
    ($version[0]=='2' and (int)($version[3])<9)

){// echo 'Upgrade ERS version';
    $obj=array();
    echo json_encode( array('success'=>false,'result'=>array(),'desc'=>'version issue') );
    exit;
}


{
    $db=$l->loadlib('db');
    $l->loadlib('tlog');
}
$tlang='fa';


//require_once(APPPATH.'includes/nusoap/nusoap.php');
$fakeres=false;
$blocked=false;
//check if migo is more than 72 hours , if so , it will send fake document number Blocked without connection to SAP
if( isset($obj[0]['IDocDate']) and time()-strtotime($obj[0]['IDocDate'])>(86400*7) ){
    // $blocked=true;
}else{$blocked=false;}
if(isset($_GET['live']) and $_GET['live']=='9'){ $blocked=false;}

if($testlog==true) {$l->tlog->act(0,'migox api' ); }

$username='RFC_ERS';
$password='ERS@2020';


if($test==true){
    $username='RFC_B2B';
    $password='345Er12!';
    $ossuser=$username;
    $osspass=$password;
    $ossurl='http://EVRSAPQA01:8000/sap/bc/srt/wsdl/srvc_00505697F6AA1EE9BDB2D482500328BE/wsdl11/allinone/ws_policy/document?sap-client=700';
    $client = new nusoap_client($ossurl, 'wsdl');
    $client->decodeUTF8(false);
    $client->setCredentials($ossuser, $osspass, 'basic');
}
else{

    $ossuser=$username;
    $osspass=$password;
    $ossurl='http://evrsapprod:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zrt_ws_001/700/zrt_ws_001/zrt_ws_001?sap-client=700';

}

$options=array('login'=>'','password'=>'');



$client = new nusoap_client($ossurl, 'wsdl');
$client->decodeUTF8(false);
$client->setCredentials($ossuser, $osspass, 'basic');
$res = $client->call('ZrtFm027', $params);
$params=array();
$params['IDeliveryNote']= substr( $obj[0]['IDeliveryNote'],0,16);
$params['IDocDate']= substr( $obj[0]['IDocDate'],0,10);
$params['IPstngDate']=substr( $obj[0]['IPstngDate'],0,10);

$params['ItItem']=array();

//get already sent data
$vsql='';
$first=true;
foreach($obj as $km=>$material){
        if($material['Quantity']=='0.0' or $material['Quantity']=='0.00' or  $material['Quantity']=='0'
        ){
            unset($obj[$km]);
            continue;
            //$material['Quantity']='0';
        }
    if($first==true){  $first=false; }else{ $vsql.=','; }
    $vsql.='('.$material['ID'].',\''.$material['PurchaseOrder'].'\','.$material['PurchaseItem'].')';

}
$list=array();
if(count($obj)>0){
$sql='SELECT  a.[ersid],a.[po_number],a.[po_item],a.documentnumber
  FROM [dbo].[rsm_migox_detail] a
 inner join
 (select * from (values
 '.$vsql.'
 ) AS X([ersid],[po_number],[po_item]) ) b
 on b.ersid=a.ersid and b.po_item=a.po_item and b.po_number=a.po_number';
$list=$l->db->QueryArray($sql);


}
$already=array();
foreach($list as $ls){
    $already[$ls['ersid']][$ls['po_number']][$ls['po_item']]=$ls;

}
//get already sent date
$itemlist=array();
foreach($obj as $material){
    if(isset($already[$material['ID']][$material['PurchaseOrder']][$material['PurchaseItem']])
    or
        isset($itemlist[$material['PurchaseItem']])
    ){
        continue;
        //$material['Quantity']='0';
    }
    $itemlist[$material['PurchaseItem']]=1;

    //$l->tlog->act(0,'mobile market label list '.$json.' post= '.$material->code);
    $params['ItItem']['item'][]=(object)array(
        'PurchaseOrder'=>''.$material['PurchaseOrder'],
        'PurchaseItem'=>''.$material['PurchaseItem'],
        'Material'=>'00000000000'.$material['Material'],
        'Quantity'=>''.$material['Quantity'],
        'Unit'=>''.$material['Unit'],
        'Plant'=>''.$material['Plant'],
        'StorageLoc'=>''.$material['StorageLoc']
    );

}
if(isset($material)){
    $baseinfo=array('Plant'=>$material['Plant'],
        'PurchaseOrder'=>$material['PurchaseOrder']
    );
}/*else{
    $baseinfo=array('Plant'=>'',
        'PurchaseOrder'=>''
    );
}*/


//var_dump($params);exit;
//print_r($params);exit;
if($blocked==false){
    if($baseinfo['Plant']!=''
    and isset($params['ItItem']['item']) and is_array($params['ItItem']['item']) and count($params['ItItem']['item'])>0
    ) {
        $res = $client->call('ZrtFm027', $params);
    }elseif(count($already)>0 and count($params['ItItem']['item'])==0 and isset($list[0]['documentnumber'])  ){
        $fakeres=true;
        $res=array();
        $res['EMatdocumentyear']='2020';
        $res['EMaterialdocument']=$list[0]['documentnumber'];
        $res['EtReturn']='';
        $res['ExError']='';
        $res['ItItem']=array();
    }
else{
        $res = false;
    }
}else{
    $res=array();
    $res['EMatdocumentyear']='2020';
    $res['EMaterialdocument']='Blocked';
    $res['EtReturn']='';
    $res['ExError']='';
    $res['ItItem']=array();


}
if(isset($obj) and is_array($obj) and count($obj)==0
and $json!='' and $json!='[]'
){
    $res=array();
    $res['EMatdocumentyear']='2020';
    $res['EMaterialdocument']='Blocked(Zero Items)';
    $res['EtReturn']='';
    $res['ExError']='';
    $res['ItItem']=array();
}


//print_r($res);exit;


if(isset($res) and $res!=false and count($res)>0  ){
    // if(isset($res['EtReturn'])){ unset($res['EtReturn']); }
    //if(isset($res['ItItem'])){ unset($res['ItItem']); }
    if(isset($res['EMaterialdocument']) and strlen($res['EMaterialdocument'])>2){
        //saving data from sap
        $sql='';
        foreach($obj as $item){
            //if it's not the first line
            if($sql!=''){ $sql.=',';  }

$sql.='(
'.$l->db->escape(((isset($item['ID']))?$item['ID']:'')).'
,'.$l->db->escape(((isset($item['Plant']))?$item['Plant']:'')).'
,'.$l->db->escape(((isset($item['PurchaseOrder']))?$item['PurchaseOrder']:'')).'
,'.$l->db->escape((isset($item['PurchaseItem']))?$item['PurchaseItem']:'').'
,'.$l->db->escape((isset($item['Material']))?$item['Material']:'').'
,'.$l->db->escape((isset($item['IDeliveryNote']))?$item['IDeliveryNote']:'').'
,'.$l->db->escape((isset($item['Quantity']))?$item['Quantity']:'').'
,'.$l->db->escape((isset($item['Unit']))?$item['Unit']:'').'
,'.$l->db->escape((isset($item['IDocDate']))?$item['IDocDate']:'').'
,'.$l->db->escape((isset($item['IPstngDate']))?$item['IPstngDate']:'').'
,'.$l->db->escape((isset($res['EMaterialdocument']))?$res['EMaterialdocument']:'').'
,'.time().'
)';

        }
        if($fakeres==false){
        $sql='INSERT INTO [dbo].[rsm_migox_detail]
            ([ersid]
           ,[plant]
           ,[po_number]
           ,[po_item]
           ,[material]
           ,[deliverynote]
           ,[quantity]
           ,[unit]
           ,[documentdate]
           ,[postingdate]
           ,[documentnumber]
           ,[time])
     VALUES
          '.$sql;


        if($l->db->Query($sql)){}
        }

    }

    if(isset($res['EMaterialdocument']) and strlen($res['EMaterialdocument'])>2){
        $res['EMaterialdocument']=$res['EMatdocumentyear'].$res['EMaterialdocument'];
    }

    echo json_encode( array('success'=>true,'result'=>$res) );
}
else{

    echo json_encode( array('success'=>false,'result'=>array(),'desc'=>'no sap output') );
}

$sql='INSERT INTO [dbo].[rsm_migox_log]
           ([time]
           ,[date]
           ,[result]
           ,[documentnumber]
           ,[request]  
           ,[ip]
           ,[live]
           ,[TotalDiskC]
           ,[AvailableDiskC]
           ,[TotalDiskD]
           ,[AvailableDiskD]
           ,[TotalMemory]
           ,[FreeMemory]
           ,[percentOccupied]
           ,[ERSVersion]
           ,[Flag_n]
           ,[Flag_1]
           ,[Flag_2]
           ,[Flag_3]
           ,[Plant]
           ,[PurchaseOrder]
           ,[items]
           ,[hostname]
            ,[sentitems]
           )
     VALUES
           ('.time().'
           ,'.$l->db->escape(date('Y-m-d')).'
           ,'.$l->db->escape( (isset($res))?serialize($res):'' ) .'
           ,'.$l->db->escape( (isset($res) and isset($res['EMaterialdocument']))?($res['EMaterialdocument']):'' ) .'
           ,'.$l->db->escape( (isset($json))?$json:'' ) .'
           ,'.$l->db->escape( (isset($_SERVER['REMOTE_ADDR']))?$_SERVER['REMOTE_ADDR']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['live']))?$_GET['live']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['TotalDiskC']))?$_GET['TotalDiskC']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['AvailableDiskC']))?$_GET['AvailableDiskC']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['TotalDiskD']))?$_GET['TotalDiskD']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['AvailableDiskD']))?$_GET['AvailableDiskD']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['TotalMemory']))?$_GET['TotalMemory']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['FreeMemory']))?$_GET['FreeMemory']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['percentOccupied']))?$_GET['percentOccupied']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['ERSVersion']))?$_GET['ERSVersion']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['Flag_n']))?$_GET['Flag_n']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['Flag_1']))?$_GET['Flag_1']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['Flag_2']))?$_GET['Flag_2']:'' ) .'
           ,'.$l->db->escape( (isset($_GET['Flag_3']))?$_GET['Flag_3']:'' ) .'
           ,'.$l->db->escape( (isset($baseinfo['Plant']))?$baseinfo['Plant']:NULL ) .'
           ,'.$l->db->escape( (isset($baseinfo['PurchaseOrder']))?$baseinfo['PurchaseOrder']:NULL ) .'
           ,'.$l->db->escape( (isset($obj))?count($obj):NULL ) .'
            ,'.$l->db->escape( (isset($_GET['hostname']))?$_GET['hostname']:'' ) .'
            ,'.$l->db->escape( (isset($params['ItItem']['item']))?count($params['ItItem']['item']):NULL ) .'
          
           
           )
';
// echo $sql;
$l->db->Query($sql);
//   exit;
