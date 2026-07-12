<?php

namespace InnStudio\Prober\Components\Bootstrap;

use InnStudio\Prober\Components\Config\ConfigApi;
use InnStudio\Prober\Components\WindowConfig\WindowConfigApi;

final class Render
{
    public function __construct()
    {
        if (\defined('XPROBER_IS_DEV') && XPROBER_IS_DEV) {
            return;
        }
        $appName = ConfigApi::$config['APP_NAME'];
        $version = ConfigApi::$config['APP_VERSION'];
        $loadScript = \defined('XPROBER_IS_DEV') && XPROBER_IS_DEV ? '' : "<script src='?action=script&amp;v={$version}'></script>";
        $loadStyle = \defined('XPROBER_IS_DEV') && XPROBER_IS_DEV ? '' : "<link rel='stylesheet' href='?action=style&amp;v={$version}'>";
        $globalConfig = WindowConfigApi::getGlobalConfig();
        echo <<<HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<meta name="renderer" content="webkit">
<title>{$appName} {$version}</title>
{$globalConfig}
{$loadScript}
<style>
:root {
    --x-init-fg: oklch(0.1 0 0);
    --x-init-body-fg: oklch(0.1 0 0);
    --x-init-body-bg: oklch(0.9 0 0);
    --x-init-loading-bg: oklch(0 0 0 / 0.3);
    --x-init-loading-fg: oklch(0.1 0 0);
}

[data-theme="dark"] {
    --x-init-fg: oklch(0.9 0 0);
    --x-init-body-fg: oklch(0.9 0 0);
    --x-init-body-bg: oklch(0.1 0 0);
    --x-init-loading-bg: oklch(1 0 0 / 0.3);
    --x-init-loading-fg: oklch(0.9 0 0);
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
body {
    gap: var(--x-init-gutter);
    background: var(--x-init-body-bg);
    color: var(--x-init-body-fg);
    line-height: 1.5;
    padding:0;
    margin:0;
}
#loading {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    height: 100svh;
    font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
        "PingFang SC", "PingFang TC", "Microsoft YaHei", "Source Han Sans SC",
        "Noto Sans CJK SC", sans-serif;
}
#loading::before {
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    content: "";
    border: 1px solid var(--x-init-loading-bg);
    border-top-color: var(--x-init-loading-fg);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
</style>
{$loadStyle}
</head>
<body>
<div id=loading>Thinking...</div>
</body>
</html>
HTML;
    }
}
