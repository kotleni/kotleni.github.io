<?php

class AutoOnline{
    public $VK_API = null;
    public $clr = null;
    public $api = null;
    public function loaded($api){
        $this->VK_API = $api->VK_API;
        $this->clr = $api->clr;
        $this->api = $api;
    }

    public function loop(){
        $this->VK_API->method('account.setOnline' , null);
    }
}