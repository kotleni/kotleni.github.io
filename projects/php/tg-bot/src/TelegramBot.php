<?php

class TelegramBot {
    public $token;
    public $username;
    function __construct($token, $username) {
        $this->token = $token;
        $this->username = $username;
    }
}
