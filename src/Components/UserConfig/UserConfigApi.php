<?php

namespace InnStudio\Prober\Components\UserConfig;

use InnStudio\Prober\Components\Utils\UtilsTomlParser;

final class UserConfigApi
{
    private static $conf;

    private static $filename = 'xconfig.toml';

    public static function isDisabled($id)
    {
        return \in_array($id, self::get('disabled') ?: [], true);
    }

    public static function get($id = null)
    {
        self::setConf();
        if ($id) {
            return isset(self::$conf[$id]) ? self::$conf[$id] : null;
        }

        return self::$conf;
    }

    private static function getFilePath()
    {
        if ( !\defined('XPROBER_DIR')) {
            return '';
        }
        $filename = self::$filename;
        if (\defined('XPROBER_IS_DEV') && XPROBER_IS_DEV) {
            $path = \dirname(XPROBER_DIR) . "/{$filename}";
            if ( !file_exists($path) || !is_readable($path)) {
                return '';
            }

            return $path;
        }
        $path = XPROBER_DIR . "/{$filename}";
        if ( !file_exists($path) || !is_readable($path)) {
            return '';
        }

        return $path;
    }

    private static function setConf()
    {
        if (null !== self::$conf) {
            return;
        }
        $path = self::getFilePath();
        if ( !$path) {
            self::$conf = null;

            return;
        }
        $content = file_get_contents($path);
        if ( !$content) {
            self::$conf = null;

            return;
        }
        // toml
        $conf = UtilsTomlParser::parse($content);
        if ( !$conf) {
            self::$conf = null;

            return;
        }
        self::$conf = $conf;
    }
}
