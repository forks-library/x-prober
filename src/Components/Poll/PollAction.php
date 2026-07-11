<?php

namespace InnStudio\Prober\Components\Poll;

use InnStudio\Prober\Components\Rest\RestResponse;

final class PollAction extends PoolConstants
{
    public function render($action)
    {
        if (PoolConstants::ID !== $action) {
            return;
        }
        $data = [];
        foreach ([
            'Config\\ConfigPoll',
            'UserConfig\\UserConfigPoll',
            'PhpInfo\\PhpInfoPoll',
            'Database\\DatabasePoll',
            'MyInfo\\MyInfoPoll',
            'DiskUsage\\DiskUsagePoll',
            'PhpExtensions\\PhpExtensionsPoll',
            'NetworkStats\\NetworkStatsPoll',
            'ServerStatus\\ServerStatusPoll',
            'ServerInfo\\ServerInfoPoll',
            'Nodes\\NodesPoll',
            'TemperatureSensor\\TemperatureSensorPoll',
            'ServerBenchmark\\ServerBenchmarkPoll',
            'BrowserBenchmark\\BrowserBenchmarkPoll',
            'Ping\\PingPoll',
        ] as $fn) {
            $class = "\\InnStudio\\Prober\\Components\\{$fn}";
            $render = (new $class())->render();
            if ( !$render || !$render[array_keys($render)[0]]) {
                continue;
            }
            $data = array_merge($data, $render);
        }
        (new RestResponse())
            ->setData($data)
            ->end();
    }
}
