<?php

namespace InnStudio\Prober\Compiler;

use InvalidArgumentException;
use RuntimeException;

final class StyleGeneration
{
    /**
     * 构造函数：仅用于接收和校验基础参数
     * Constructor: Only used to receive and validate basic parameters.
     */
    public function __construct(
        private string $styleFilePath,
        private string $distFilePath
    ) {
        if (empty($this->styleFilePath) || empty($this->distFilePath)) {
            throw new InvalidArgumentException('[StyleGeneration] Missing required file paths in arguments.');
        }
    }

    /**
     * 执行核心编译逻辑
     * Execute the core compilation logic.
     *
     * @throws RuntimeException 如果文件不存在或写入失败 / If files do not exist or writing fails
     */
    public function generate(): void
    {
        // 校验源样式文件是否存在
        // Validate if the source style file exists.
        if ( !is_file($this->styleFilePath)) {
            throw new RuntimeException("[StyleGeneration] File not found: {$this->styleFilePath}");
        }

        // 校验目标文件是否存在
        // Validate if the target dist file exists.
        if ( !is_file($this->distFilePath)) {
            throw new RuntimeException("[StyleGeneration] File not found: {$this->distFilePath}");
        }

        $styleContent = $this->getStyle();

        // 执行替换并写入文件
        // Perform replacement and write to file.
        if ($this->setStyle($styleContent)) {
            echo "[StyleGeneration] Script content has been written successfully.\n";
        } else {
            throw new RuntimeException('[StyleGeneration] Error: Cannot write script content to dist.');
        }
    }

    /**
     * 获取样式文件内容
     * Get the content of the style file.
     */
    private function getStyle(): string
    {
        $content = file_get_contents($this->styleFilePath);

        // 严格检查文件是否成功读取
        // Strictly check if the file was read successfully.
        if (false === $content) {
            throw new RuntimeException("[StyleGeneration] Failed to read style file: {$this->styleFilePath}");
        }

        return $content;
    }

    /**
     * 将样式内容替换到目标文件
     * Replace the style content into the target file.
     */
    private function setStyle(string $style): bool
    {
        $dist = file_get_contents($this->distFilePath);

        // 严格检查目标文件内容是否成功读取，且不为空
        // Strictly check if the target file content was read successfully and is not empty.
        if (false === $dist || '' === $dist) {
            return false;
        }

        // 替换占位符
        // Replace the placeholder.
        $dist = str_replace('{{X_STYLE}}', $style, $dist);

        // file_put_contents 失败时返回 false，成功时返回写入的字节数
        // file_put_contents returns false on failure, or the number of bytes written on success.
        return false !== file_put_contents($this->distFilePath, $dist);
    }
}
