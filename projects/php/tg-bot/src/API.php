<?php

class API {
    public $ploader;
    public $bot;
    function __construct($pl, $bot, $clr) {
        $this->ploader = $pl;
        $this->bot = $bot;
        $this->clr = $clr;
    }

    function print($msg) {
        $title = $this->get_calling_class();
        if(strlen($title) < 1) $title = 'Server';
        echo $this->clr->string('[' . $title . '] ', 'yellow', null) . $msg;
    }

    function println($msg) {
        $this->print($msg . PHP_EOL);
    }

    function error($msg) {
        $title = $this->get_calling_class();
        if(strlen($title) < 1) $title = 'Server';
        echo $this->clr->string('[' . $title . '] ', 'red', null) . $msg . PHP_EOL;
    }

    // получить имя класса, который вызвал функцию
    function get_calling_class() {
        $trace = debug_backtrace();
        $class = $trace[1]['class'];

        for($i=1; $i<count( $trace ); $i++) {
            if(isset($trace[$i]))
            if($class != $trace[$i]['class'])
                return $trace[$i]['class'];
        }
    }
}
