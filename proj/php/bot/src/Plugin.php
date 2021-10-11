<?php

class Plugin {
    public $name;
    public $instance;
    public $api;
    function __construct($name, $instance, $api) {
        $this->name = $name;
        $this->instance = $instance;

        $this->api = $api;
        if(method_exists($this->instance, 'onLoad')) {
            $this->instance->onLoad($this->api);
        }
    }

    function onCommand() {

    }
}
