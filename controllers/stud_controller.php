<?php
class stud_controller extends controller{
	public function indexas($query)
	{
		$fid= $this->getVal('fid', $query);
	    $rows = $this->_model->getRows($fid); 	
	    $this->_res->set("rows" , $rows);
		$this->_res->output();	
	}
	public function edita($query)
	{
		$sid= $this->getVal('sid', $query);	
		if($sid!="")
		{
		  $row= $this->_model->getRowById($sid);
		  if($row){
	            $this->_res->set("row" , $row );
	       	    $this->_res->output();
		  }
		}
		$this->_res->output(200,"Sid invalid");
	}	
	
	public function savea($query)
	{
		$row  = $query['row'];
		$sid  = $this->getVal('sid',$row);
		$name = $this->getVal('name',$row);
		$avgr = $this->getVal('avgr',$row);
		$fid  = $this->getVal('fid',$row);
		if ( $sid==0 )
		     $this->_model->addRow($name , $avgr , $fid );
		else $this->_model->editRow($sid,$name , $avgr , $fid );
		$this->_res->output();
		
	}	
	public function deletea($query)
	{
	    $sid= $this->getVal('sid', $query);	
		if($sid!="")
		{
		  $sid=intval($query['sid']);
	      $this->_model->deleteRow($sid);
	      $this->_res->output();
	  }	else  $this->_res->output(200,"sid not defined");	
	}	
}
?>