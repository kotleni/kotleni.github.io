<?php

class ConversationLeave{
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
            "count" => 10,
            "time_offset" => 0,
            "filters" => 0,
            "preview_length" => 100,
            "last_message_id" => 0
        ));
        $i = 0;
        foreach($messages['response']['items'] as $item){
            $userid = $item['conversation']['peer']['local_id'];
            if($item['conversation']['peer']['type'] == "chat" 
            and $item['conversation']['can_write']['allowed'] == 1 
            and $item['conversation']['chat_settings']['state'] != "kicked" 
            and $item['conversation']['chat_settings']['state'] != "left"){
                // Беседа
                $profile = $this->VK_API->method('users.get', array());
                $profile_id = $profile['response'][0]['id'];
                
                $this->VK_API->method('messages.send', array(
                    "peer_id" => 2000000000 + $userid,
                    "random_id" => rand(100220010,818882281),
                    "message" => "[PocketVK] Авто-выход из бесед."
                ));

                $this->VK_API->method('messages.removeChatUser', array(
                    "chat_id" => $userid,
                    "user_id" => $profile_id
                ));
            }
            $i++;
        }
    }
}