<?php

namespace InnStudio\Prober\Components\WindowConfig;

use InnStudio\Prober\Components\Utils\UtilsNetwork;

class WindowConfigApi
{
    public static function getConfig()
    {
        return [
            'IS_DEV' => false,
            'AUTHORIZATION' => UtilsNetwork::getAuthorization(),
            'THEME' => '',
        ];
    }

    public static function getGlobalConfig()
    {
        $config = json_encode(self::getConfig(), \JSON_UNESCAPED_SLASHES | \JSON_UNESCAPED_UNICODE);

        return <<<HTML
<script>
window['GLOBAL_CONFIG'] = {$config};
try {
    const storedTheme = String(localStorage.getItem("x-theme:v1") ?? "");
    let theme = storedTheme;
    if (storedTheme) {
        window.GLOBAL_CONFIG.THEME = storedTheme;
    } else {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
} catch (e) {
    console.error(e);
}
</script>
HTML;
    }
}
