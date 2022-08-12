<?php

class FriendFarm{
	public $api = null;
	public $db = null;
	public $clr = null;
	public $VK_API = null;
	public function loaded($api){
		$this->api = $api;
		$this->db = $this->api->db;
		$this->clr = $this->api->clr;
        $this->VK_API = $this->api->VK_API;
	}
	public function loop(){
		$n = 1;
		$old = -9;
		$group = 'spottsila';
		$walls = $this->VK_API->method('wall.get' , array(
			"domain" => $group
		));
	
		if($walls['response']['count'] != $old){
			$owner_id = $walls['response']['items'][$n]['owner_id'];
			$from_id = $walls['response']['items'][$n]['from_id'];
			$text = $walls['response']['items'][$n]['text'];
			$o = $this->VK_API->method('friends.add' , array(
				"user_id" => $from_id,
				"text" => ""
			));
			$this->api->print($this->clr->string('friends.add:' , 'white' , 'cyan').'  '.$from_id.' => '.$text.PHP_EOL.PHP_EOL);
			$old = $walls['response']['count'];
		}
	}
}