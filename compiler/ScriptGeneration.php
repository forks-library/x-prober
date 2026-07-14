<?php

declare(strict_types=1);

namespace InnStudio\Prober\Compiler;

use InvalidArgumentException;
use RuntimeException;

/**
 * Class ScriptGeneration
 * 负责将脚本内容注入到指定的模板文件中。
 * Responsible for injecting script content into a designated template file.
 */
final class ScriptGeneration
{
    /**
     * 使用 PHP 8.0+ 构造函数属性提升，直接声明和初始化属性。
     * Use PHP 8.0+ Constructor Property Promotion to declare and initialize properties.
     */
    public function __construct(
        private string $scriptFilePath,
        private string $distFilePath
    ) {
    }

    /**
     * 执行脚本生成逻辑
     * Execute the script generation logic.
     *
     * @throws InvalidArgumentException 当文件不存在时抛出 | Thrown when files do not exist
     * @throws RuntimeException         当读取或写入失败时抛出 | Thrown when read/write operations fail
     */
    public function generate(): void
    {
        // 验证源脚本文件是否存在 / Validate if the source script file exists
        if ( !is_file($this->scriptFilePath)) {
            throw new InvalidArgumentException("[ScriptGeneration] Source file not found: {$this->scriptFilePath}");
        }

        // 验证目标模板文件是否存在 / Validate if the destination file exists
        if ( !is_file($this->distFilePath)) {
            throw new InvalidArgumentException("[ScriptGeneration] Destination file not found: {$this->distFilePath}");
        }

        $scriptContent = $this->getScript();

        $this->setScript($scriptContent);

        echo "[ScriptGeneration] Script content has been written successfully.\n";
    }

    /**
     * 获取源脚本内容
     * Get the content of the source script.
     */
    private function getScript(): string
    {
        $content = file_get_contents($this->scriptFilePath);

        if (false === $content) {
            throw new RuntimeException("[ScriptGeneration] Failed to read source file: {$this->scriptFilePath}");
        }

        return $content;
    }

    /**
     * 将脚本内容替换并写入到目标文件中
     * Replace placeholders and write content to the destination file.
     */
    private function setScript(string $script): void
    {
        $distContent = file_get_contents($this->distFilePath);

        // 如果读取失败，或者文件为空，抛出异常
        // If reading fails or the file is empty, throw an exception
        if (false === $distContent || '' === $distContent) {
            throw new RuntimeException("[ScriptGeneration] Destination file is empty or unreadable: {$this->distFilePath}");
        }

        // 检查是否存在占位符（可选优化：防止无效替换）
        // Check if the placeholder exists (Optional optimization: prevent redundant writes)
        if ( !str_contains($distContent, '{{X_SCRIPT}}')) {
            throw new RuntimeException('[ScriptGeneration] Placeholder {{X_SCRIPT}} not found in destination file.');
        }

        $updatedContent = str_replace('{{X_SCRIPT}}', $script, $distContent);

        // 执行写入操作 / Perform the write operation
        $result = file_put_contents($this->distFilePath, $updatedContent);

        if (false === $result) {
            throw new RuntimeException('[ScriptGeneration] Failed to write script content to destination.');
        }
    }
}
