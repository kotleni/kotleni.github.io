<?php

class SpamBan{ // account.ban
    public $VK_API = null;
    public $clr = null;
    public $api = null;
    public function loaded($api){
        $this->VK_API = $api->VK_API;
        $this->clr = $api->clr;
        $this->api = $api;
    }

    public function loop(){
        $messages = $this->VK_API->method('messages.getConversations' , array(
            "offset" => 0,
            "count" => 4,
            "time_offset" => 0,
            "filters" => 0,
            "preview_length" => 100,
            "last_message_id" => 0
        ));
        $userid = $messages['response']['items'][0]['conversation']['peer']['id'];
        $message = $messages['response']['items'][0]['last_message']['text'];
        $out = $messages['response']['items'][0]['last_message']['out'];
        
        $l = array(
            "http://",
            "https://",
            "го вз",
            "добавь в друзья",
            "vk.com",
            "t.me",
            "youtube.com",
            "подпишись",
            "го в др",
            "лайкни",
            "пж",
            "стену",
            "го на стеночку",
            "добавь"
        );
        if($out == 0){
            foreach($l as $e){
                $flex = strpos($message , $e);
            if($flex > -1){
                $this->VK_API->method('messages.send', array(
                    "user_id" => $userid,
                    "random_id" => rand(100220010,818882281),
                    "message" => "[PocketVK] Вы были заблокированы , по причине спама."
                ));
                $this->VK_API->method('account.ban', array(
                    "owner_id" => $userid
                ));
                $this->api->print($this->clr->string("account.ban ", 'green_light', null) .": ".$userid. '; Причина: ' . $message);
            }
        }
    }
    }
}