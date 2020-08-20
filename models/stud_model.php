<?php
class stud_model extends model{
	public function getRows($fid=""){
		$sql ="SELECT * FROM studs";
		if($fid!="")
			$sql.=" WHERE fid=$fid ";
		$rows= $this->getAll( $sql);
		return $rows;
	}
	public function getRowById($sid){
		$sql ="SELECT * FROM studs WHERE sid=$sid ";
		$row= $this->getRow( $sql);
		return $row;
	}	
	public function addRow($name , $avgr , $fid )
	{
		$sql="INSERT INTO studs (name,avgr,fid)VALUES('$name',$avgr,$fid); ";
		$res= $this->execQuery($sql);
		return $res;
	}
	public function editRow($sid,$name , $avgr , $fid )
	{
		$sql="UPDATE studs SET name='$name',avgr=$avgr,fid=$fid WHERE sid=$sid";
		$res= $this->execQuery($sql);
		return $res;
	}	
	public function deleteRow($sid )
	{
		$sql="DELETE FROM studs WHERE sid=$sid";
		$res= $this->execQuery($sql);
		return $res;
	}	
}
?>