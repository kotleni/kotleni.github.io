<?php

include 'src/ColoredLib.php';
include 'src/API.php';
include 'src/Plugin.php';
include 'src/PluginLoader.php';
include 'src/TelegramBot.php';

$clr = new ColoredLib();
$bot = new TelegramBot('', '');
$pl = new PluginLoader();
$api = new API($pl, $bot, $clr);

$api->println('Loading plugins...');
$pl->load($api);
