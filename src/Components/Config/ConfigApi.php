<?php
/**
 * 该文件是自动生成的。
 * The file is automatically generated.
 */

namespace InnStudio\Prober\Components\Config;

class ConfigApi
{
    public static $config = array (
  'APP_VERSION' => '10.0.0',
  'APP_NAME' => 'X Prober',
  'APP_URL' => 'https://github.com/kmvan/x-prober',
  'AUTHOR_URL' => 'https://inn-studio.com/prober',
  'UPDATE_PHP_URLS' => 
  array (
    0 => 'https://raw.githubusercontent.com/kmvan/x-prober/master/dist/prober.php',
    1 => 'https://api.inn-studio.com/download/?id=xprober',
  ),
  'APP_CONFIG_URLS' => 
  array (
    0 => 'https://raw.githubusercontent.com/kmvan/x-prober/master/AppConfig.json',
    1 => 'https://api.inn-studio.com/download/?id=xprober-config',
  ),
  'BENCHMARKS_URLS' => 
  array (
    0 => 'https://raw.githubusercontent.com/kmvan/x-prober/master/benchmarks.json',
    1 => 'https://api.inn-studio.com/download/?id=xprober-benchmarks',
  ),
  'BROWSER_BENCHMARKS_URLS' => 
  array (
    0 => 'https://raw.githubusercontent.com/kmvan/x-prober/master/browser-benchmarks.json',
    1 => 'https://api.inn-studio.com/download/?id=xprober-browser-benchmarks',
  ),
  'APP_CONFIG_URL_DEV' => 'http://localhost:8000/AppConfig.json',
  'AUTHOR_NAME' => 'INN STUDIO',
  'LATEST_PHP_STABLE_VERSION' => '8',
  'LATEST_NGINX_STABLE_VERSION' => '1.22.0',
  'BENCHMARKS' => 
  array (
    0 => 
    array (
      'name' => 'RamNode / PHP82 JIT',
      'url' => 'https://clientarea.ramnode.com/aff.php?aff=4143',
      'date' => '2023-05-02',
      'detail' => 
      array (
        'cpu' => 203245,
        'read' => 68706,
        'write' => 11452,
      ),
    ),
    1 => 
    array (
      'name' => 'SpartanHost / HDD / PHP80 JIT',
      'url' => 'https://billing.spartanhost.net/aff.php?aff=801',
      'date' => '2021-07-17',
      'proberUrl' => 'https://x-prober-server-benchmark-spartanhost-dalls.inn-studio.com',
      'binUrl' => 'https://lg.dal.spartanhost.net/100MB.test',
      'detail' => 
      array (
        'cpu' => 280903,
        'read' => 65551,
        'write' => 16238,
      ),
    ),
    2 => 
    array (
      'name' => 'Vultr / Tokyo / PHP82 JIT',
      'url' => 'https://www.vultr.com/?ref=7826363-4F',
      'date' => '2023-05-02',
      'proberUrl' => 'https://x-prober-server-benchmark-vultr-tokyo.inn-studio.com/',
      'binUrl' => 'https://hnd-jp-ping.vultr.com/vultr.com.100MB.bin',
      'detail' => 
      array (
        'cpu' => 243748,
        'read' => 46066,
        'write' => 13824,
      ),
    ),
    3 => 
    array (
      'name' => 'BandwagonHOST / KVM / PHP80 JIT',
      'url' => 'https://bandwagonhost.com/aff.php?aff=34116',
      'proberUrl' => 'https://x-prober-server-benchmark-bwh-los-angeles.inn-studio.com/',
      'binUrl' => 'https://x-prober-server-benchmark-bwh-los-angeles.inn-studio.com/512m.bin',
      'date' => '2021-07-17',
      'detail' => 
      array (
        'cpu' => 185491,
        'read' => 13616,
        'write' => 4529,
      ),
    ),
  ),
);
}
