<?php
require_once 'Token.php';

class User extends Token
{
    public $Id;
    public $UserName;
    public $Password;
    public $FlagDelete;
    public $InsertTime;
    public $UpdateTime;
}

