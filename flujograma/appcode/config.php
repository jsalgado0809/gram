<?php

class config{
	private $user = 'admin';
    private $passwd = 'admin';
    private $db = 'flujograma';
    private $port = '3307';
    private $host = 'localhost';

	function __construct() {
    }
	
	public function get_port(){
		return $this->port;
	}
	public function get_user(){
		return $this->user;
	}
		public function get_passwd(){
		return $this->passwd;
	}
		public function get_db(){
		return $this->db;
	}
		public function get_host(){
		return $this->host;
	}
		}
?>