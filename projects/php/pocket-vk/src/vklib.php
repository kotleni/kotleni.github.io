<?php
/*
    VKLIB PHP (Тестировалось на 7.3.7)
    Простая библиотека для работы с VK API
    Unicon (t.me/baddev , t.me/unicon_dev)
*/

class VKLIB{
    public $api_url = 'http://api.vk.com/method/';
    public $api_v = "";
    public $token = "";
    public $arrContextOptions = array(
        "ssl"=>array(
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        ),
    ); // фикс проблем с SSL

    public function __construct($token , $api_v){
        $this->token = $token;
        $this->api_v = $api_v;
    }

    public function method($method , $params){
        $p = $params;
        $p['v'] = $this->api_v;
        $p['access_token'] = $this->token;
        $out = json_decode($this->request($this->api_url . $method , $p) , TRUE);
        //echo json_encode($out);
        return $out;
    }

    public function request($url , $params){
        $query = http_build_query($params);
        $x = file_get_contents($url .'?'. $query , false, stream_context_create($this->arrContextOptions));
        //print $x;
        return $x;
    }




    // deprecated
    public function setOnline(){
        $req = file_get_contents($this->api_url . 'account.setOnline?v=' .$this->api_v . '&access_token=' . $this->token , false, stream_context_create($this->arrContextOptions));
        return json_decode($req , TRUE);
    }
    
    public function setStatus($text){
        $req = file_get_contents($this->api_url . 'status.set?v=' .$this->api_v . '&access_token=' . $this->token . '&text=' .$text, false, stream_context_create($this->arrContextOptions));
        return json_decode($req , TRUE);
    }
    
    public function getBanned(){
        $req = file_get_contents($this->api_url . 'account.getBanned?v=' .$this->api_v . '&access_token=' . $this->token . '&count=100', false, stream_context_create($this->arrContextOptions));
        return json_decode($req , TRUE);
    }

    public function getInfo(){
        $req = file_get_contents($this->api_url . 'account.getInfo?v=' .$this->api_v . '&access_token=' . $this->token, false, stream_context_create($this->arrContextOptions));
        return json_decode($req , TRUE);
    }
    
    public function getReqFriends(){
        $req = file_get_contents($this->api_url . 'friends.getRequests?v=' .$this->api_v . '&access_token=' . $this->token, false, stream_context_create($this->arrContextOptions));
       // echo $req;
        return json_decode($req , TRUE);
    }

    public function addFriend($id){
        $req = file_get_contents($this->api_url . 'friends.add?v=' .$this->api_v . '&access_token=' . $this->token . '&user_id=' . $id, false, stream_context_create($this->arrContextOptions));
        return json_decode($req , TRUE);
    }
  
}
