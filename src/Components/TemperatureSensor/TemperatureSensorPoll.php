<?php

namespace InnStudio\Prober\Components\TemperatureSensor;

use Exception;
use InnStudio\Prober\Components\UserConfig\UserConfigApi;

final class TemperatureSensorPoll
{
    public function render()
    {
        $id = TemperatureSensorConstants::ID;
        if (UserConfigApi::isDisabled($id)) {
            return [
                $id => null,
            ];
        }
        $items = $this->getItems();
        $cpuTemp = $this->getCpuTemp();
        if (false !== $cpuTemp) {
            $items[] = [
                'id' => 'cpu',
                'name' => 'CPU',
                'celsius' => round($cpuTemp / 1000, 2),
            ];
        }

        return [
            $id => $items ?: null,
        ];
    }

    private function curl($url)
    {
        if ( ! \function_exists('curl_init')) {
            return (string) file_get_contents($url);
        }
        $ch = curl_init();
        curl_setopt_array($ch, [
            \CURLOPT_URL => $url,
            \CURLOPT_RETURNTRANSFER => true,
            \CURLOPT_TIMEOUT => 2,
        ]);
        $res = curl_exec($ch);

        return (string) $res;
    }

    private function getItems()
    {
        $items = [];
        $urls = UserConfigApi::get('temperatureSensors') ?: [];
        if ( ! $urls) {
            return [];
        }
        foreach ($urls as $url) {
            $res = $this->curl($url);
            if ( ! $res) {
                continue;
            }
            $item = json_decode($res, true);
            if ( ! $item || ! \is_array($item)) {
                continue;
            }
            $items[] = $item;
        }

        return $items;
    }

    private function getCpuTemp()
    {
        try {
            $path = '/sys/class/thermal/thermal_zone0/temp';
            if ( ! is_readable($path)) {
                return false;
            }

            return (float) file_get_contents($path);
        } catch (Exception $e) {
            return false;
        }
    }
}
