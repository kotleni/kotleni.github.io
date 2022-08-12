<?php

class TestCommand {
    public $api;
    function onLoad($api) {
        $this->api = $api;
    }

    function onMessage($user, $msg) {
        $this->api->println($msg);
    }
}
