<?php

declare(strict_types=1);

namespace InnStudio\Prober\Compiler;

use InvalidArgumentException;
use RuntimeException;

/**
 * Class ConfigGeneration
 * 负责解析 JSON 配置文件并将其转换为 PHP 类文件，同时同步到开发路径。
 * Responsible for parsing JSON config and converting it to a PHP class file, while syncing it to the dev path.
 */
final class ConfigGeneration
{
    /**
     * 使用 PHP 8.0+ 构造函数属性提升 / Use PHP 8.0+ Constructor Property Promotion.
     */
    public function __construct(
        private string $phpConfigPath,
        private string $configPath,
        private string $configPathDev
    ) {
    }

    /**
     * 执行配置生成与复制逻辑
     * Execute configuration generation and copying logic.
     *
     * @throws InvalidArgumentException 当主配置文件不存在时抛出 | Thrown when the main config file does not exist
     * @throws RuntimeException         当生成或复制失败时抛出 | Thrown when generation or copying fails
     */
    public function generate(): void
    {
        // 验证主配置文件是否存在 / Validate if the main config file exists
        if ( ! is_file($this->configPath)) {
            throw new InvalidArgumentException("[ConfigGeneration] File invalid: {$this->configPath}");
        }

        // 生成 PHP 配置文件 / Generate the PHP configuration file
        $this->genPhpConfig();

        // 备份/同步配置文件到开发环境 / Copy/sync config file to dev environment
        $this->copyConfigToTmp();

        echo "[ConfigGeneration] PHP config file generated successfully.\n";
    }

    /**
     * 复制配置文件到开发/临时路径
     * Copy the configuration file to the dev/temporary path.
     */
    private function copyConfigToTmp(): void
    {
        if ( ! copy($this->configPath, $this->configPathDev)) {
            throw new RuntimeException("[ConfigGeneration] Failed to copy config to dev path: {$this->configPathDev}");
        }
    }

    /**
     * 解析 JSON 并生成对应的 PHP 配置类
     * Parse JSON and generate the corresponding PHP configuration class.
     */
    private function genPhpConfig(): void
    {
        $configRaw = file_get_contents($this->configPath);

        if (false === $configRaw || '' === $configRaw) {
            throw new RuntimeException("[ConfigGeneration] Failed to read or empty config file: {$this->configPath}");
        }

        // 解析 JSON 数据 / Parse JSON data
        $configData = json_decode($configRaw, true);

        if (null === $configData && \JSON_ERROR_NONE !== json_last_error()) {
            throw new RuntimeException('[ConfigGeneration] JSON decode error: ' . json_last_error_msg());
        }

        // 将数组转换为一等 PHP 代码格式 / Export array into clean PHP code format
        $exportedConfig = var_export($configData, true);

        $configContent = <<<PHP
<?php
/**
 * 该文件是自动生成的。
 * The file is automatically generated.
 */

namespace InnStudio\\Prober\\Components\\Config;

class ConfigApi
{
    public static \$config = {$exportedConfig};
}

PHP;

        // 写入 PHP 文件 / Write to the PHP file
        if (false === file_put_contents($this->phpConfigPath, $configContent)) {
            throw new RuntimeException("[ConfigGeneration] Error: cannot write generated content to {$this->phpConfigPath}");
        }
    }
}
