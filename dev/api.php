<?php
namespace InnStudio\Prober\Components\PreDefine;
$version = phpversion();
if (version_compare($version, '5.4.0', '<')) {
    exit("需要 PHP 5.4 或更高版本。当前安装的版本是：{$version} | PHP 5.4+ is required. Currently installed version is: {$version}");
}
\define('XPROBER_TIMER', \microtime(true));
\define('XPROBER_IS_DEV', true);
\define('XPROBER_DIR', __DIR__);
include \dirname(__DIR__) . '/vendor/autoload.php';
new \InnStudio\Prober\Components\Bootstrap\Bootstrap(dirname(__DIR__));
