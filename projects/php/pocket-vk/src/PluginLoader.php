<?php

class PluginLoader{
    public $dir = "./plugins/";
    public $VK_API = null;
    public $clr = null;
    public $api = null;
    public $plugins = array();
    public function __construct($api){
        $this->api = $api;
        $this->VK_API = $api->VK_API;
        $this->clr = $api->clr;
        $files = array_diff(scandir($this->dir), array('.', '..'));
        foreach($files as $plugin){
            if(!is_dir('./plugins/'.$plugin)){
            $this->load($plugin);
        }
        }
    }

    public function load($plugin){
        include $this->dir . $plugin;
        $pulgin_class = str_replace('.php' , '' , $plugin);
        $vplug = new $pulgin_class;
        $this->plugins[] = $vplug;
        $this->api->print($this->clr->string('Plugin ' , 'light_cyan' , null) . $pulgin_class . $this->clr->string(' loaded.' , 'light_cyan' , null));
        $vplug->loaded($this->api);
    }

    public function loop(){
        foreach($this->plugins as $plugin){
            $plugin->loop();
        }
    }
}