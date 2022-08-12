<?php

class PluginLoader {
    public $dir = 'plugins/';
    public $list = array();
    function __construct() {

    }

    function load($api) {
        $files = array_diff(scandir($this->dir), array('.', '..'));
        foreach ($files as $file) {
            include $this->dir . $file;
            $class_name = str_replace('.php' , '' , $file);

            $instance = new $class_name;
            $api->println('Plugin ' . $class_name . ' loaded!', 'PluginLoader');

            $plugin = new Plugin($class_name, $instance, $api);
            $this->list[] = $plugin;
        }
    }
}
