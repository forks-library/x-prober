<?php

declare(strict_types=1);

namespace InnStudio\Prober\Compiler;

use Exception;
use Generator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use SplFileInfo;

/**
 * Class Compiler
 * 负责将组件、配置、脚本和样式编译打包为单文件。
 * Compiles and packs components, configs, scripts, and styles into a single file.
 */
final class Compiler
{
    private string $baseDir;

    private string $compileFilePath;

    private string $componentsDir;

    public function __construct(private string $root)
    {
        $this->baseDir = "{$this->root}/src";
        $this->componentsDir = "{$this->baseDir}/Components";

        // 根据开发模式还是生产模式决定输出路径
        // Determine compile target path based on environment mode
        $this->compileFilePath = $this->isDev()
            ? "{$this->root}/dev/api.php"
            : "{$this->root}/dist/prober.php";
    }

    /**
     * 执行编译打包逻辑
     * Run the compile and pack process.
     */
    public function compile(): void
    {
        echo "Compile starting...\n";

        // 1. 初始化生成配置 / 1. Initialize and generate configuration
        try {
            $configGen = new ConfigGeneration(
                phpConfigPath: "{$this->componentsDir}/Config/ConfigApi.php",
                configPath: "{$this->root}/AppConfig.json",
                configPathDev: "{$this->root}/dev/AppConfig.json"
            );
            $configGen->generate();
        } catch (Exception $e) {
            echo '[Compiler Error] Config gen failed: ' . $e->getMessage() . "\n";

            return;
        }

        $code = '';

        // 2. 生产模式下，合并所有的 PHP 组件文件
        // 2. In production mode, merge all PHP component files
        if ( !$this->isDev()) {
            foreach ($this->yieldPhpFiles($this->componentsDir) as $filePath) {
                $code .= $this->getCodeViaFilePath($filePath);
            }
        }

        // 3. 组装前置预定义代码、主体代码与加载器
        // 3. Assemble pre-definitions, body code, and loader
        $preDefineCode = $this->preDefine([
            $this->genTimerCode(),
            $this->genDevMode(),
            $this->genDirPath(),
            $this->genVendorCode(),
        ]);

        $code = "<?php\n{$preDefineCode}\n{$code}";
        $code .= $this->loader();

        // 规范化换行符 / Normalize line breaks
        $code = preg_replace("/(\r\n|\r|\n)+/", "\n", $code);

        // 4. 写入初步打包的代码 / 4. Write compiled code into target file
        if ( !$this->writeFile($code)) {
            throw new Exception('[Compiler Error] Failed to write compiled source code.');
        }

        // 5. 生产模式下，注入前端 JS/CSS 到单文件中
        // 5. In production mode, inject frontend JS/CSS assets into the single file
        if ( !$this->isDev()) {
            try {
                $scriptGen = new ScriptGeneration(
                    scriptFilePath: "{$this->root}/.tmp/app.js",
                    distFilePath: $this->compileFilePath
                );
                $scriptGen->generate();

                $styleGen = new StyleGeneration(
                    styleFilePath: "{$this->root}/.tmp/app.css",
                    distFilePath: $this->compileFilePath
                );
                $styleGen->generate();
            } catch (Exception $e) {
                echo '[Compiler Error] Asset injection failed: ' . $e->getMessage() . "\n";

                return;
            }

            // 可选：如果不是 Debug 状态，可以对单文件做进一步清理（如 php_strip_whitespace）
            // Optional: If not in debug mode, further clean up the file (e.g., php_strip_whitespace)
            $finalContent = file_get_contents($this->compileFilePath);
            if (false !== $finalContent) {
                $this->writeFile($finalContent);
            }
        }

        echo "Compiled successfully!\n";
    }

    /**
     * 读取并清理子文件的 PHP 标签
     * Read and clean PHP tags from target file.
     */
    private function getCodeViaFilePath(string $filePath): string
    {
        // echo "Packing `{$filePath}`... ";

        $code = file_get_contents($filePath);
        if (false === $code) {
            echo "[FAILED] {$filePath}\n";

            return '';
        }

        $code = trim($code);

        // 💡 优化：使用正则安全去除开头的 <?php 标签，避免魔术数字 5 产生的截断 Bug
        // 💡 Opt: Safely remove leading <?php tag via regex to avoid bugs caused by magic number 5
        $code = preg_replace('/^<\\?php\\s*/i', '', $code);

        // echo "OK\n";

        return $code . "\n";
    }

    private function isDev(): bool
    {
        global $argv;

        return isset($argv) && \in_array('dev', $argv, true);
    }

    private function preDefine(array $code): string
    {
        $codeStr = implode("\n", $code);

        return <<<PHP
namespace InnStudio\\Prober\\Components\\PreDefine;
\$version = phpversion();
if (version_compare(\$version, '5.4.0', '<')) {
    exit("需要 PHP 5.4 或更高版本。当前安装的版本是：{\$version} | PHP 5.4+ is required. Currently installed version is: {\$version}");
}
{$codeStr}
PHP;
    }

    private function genDevMode(): string
    {
        return "\\define('XPROBER_IS_DEV', " . ($this->isDev() ? 'true' : 'false') . ');';
    }

    private function genDirPath(): string
    {
        return "\\define('XPROBER_DIR', __DIR__);";
    }

    private function genTimerCode(): string
    {
        return "\\define('XPROBER_TIMER', \\microtime(true));";
    }

    private function loader(): string
    {
        $bootstrapDir = $this->isDev() ? 'dirname(__DIR__)' : '__DIR__';

        return "\nnew \\InnStudio\\Prober\\Components\\Bootstrap\\Bootstrap({$bootstrapDir});\n";
    }

    private function genVendorCode(): string
    {
        if ( !$this->isDev()) {
            return '';
        }

        return "include \\dirname(__DIR__) . '/vendor/autoload.php';";
    }

    /**
     * 💡 优化：使用 SPL 内置的高性能递归迭代器，确保只产出有效的 PHP 文件路径
     * 💡 Opt: Use built-in SPL high-performance recursive iterator to yield only valid PHP file paths.
     *
     * * @return Generator<string>
     */
    private function yieldPhpFiles(string $dir): Generator
    {
        if ( !is_dir($dir)) {
            return;
        }

        $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));

        /** @var SplFileInfo $file */
        foreach ($iterator as $file) {
            if ($file->isFile() && 'php' === $file->getExtension()) {
                yield $file->getPathname();
            }
        }
    }

    private function writeFile(string $data): bool
    {
        $dir = \dirname($this->compileFilePath);

        if ( !is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            return false;
        }

        return false !== file_put_contents($this->compileFilePath, $data);
    }
}
