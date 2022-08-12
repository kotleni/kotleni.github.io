<?php

class API{
    public $VK_API = null;
    public $clr = null;
    public $api_v = '2.0.0';
    public $emoji = array(
        "0️⃣","1️⃣","2️⃣",
        "3️⃣","4️⃣","5️⃣",
        "6️⃣","7️⃣","8️⃣",
        "9️⃣");
    public function __construct($clr){
        $this->clr = $clr;
    }

    public function print($text){
        print $this->clr->string("[" . date('H:i') . "] " , "light_green" , null) . $text.PHP_EOL;
    }

    public function halt(){
        exit(0);
    }

    public function syncVKAPI($VK_API){
        $this->VK_API = $VK_API;
    }

    public function loadConfig(){
    if(file_exists('./config.json')){
        $file = file_get_contents('./config.json');
        $arr = json_decode($file , TRUE);
    }else{
        exit($clr->string("Error loaded " , 'light_red' , null) . $clr->string("config.json" , 'cyan' , 'light_red') . PHP_EOL);
    }
    return $arr;
    }
}