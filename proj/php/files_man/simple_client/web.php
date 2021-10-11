<?php

class Web {
    public $url = 'http://arersengit.7m.pl/';
    public $user = 'guest';

    function __construct($username) {
        $this->user = $username;
    }

    function req($method, $data) {
        return file_get_contents($this->url . $method . '.php?username=' . $this->user . $data);
    }

    function listFiles($dir) {
        return $this->req('list', '&dir=' . $dir);
    }


    function newFile($file) {
        return $this->req('add', '&file=' . $file);
    }

    function downloadFile($file) {
        return $this->req('get', '&file=' . $file);
    }

    function editFile($file, $data) {
        return $this->req('edit', '&file=' . $file . '&data=' . $data);
    }
}
