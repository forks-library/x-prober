<?php

namespace InnStudio\Prober\Components\Utils;

final class UtilsTomlParser
{
    public static function parse($toml_string)
    {
        $result = [];
        // 统一换行符，防止 Windows 环境出错
        $toml_string = str_replace("\r\n", "\n", $toml_string);
        $lines = explode("\n", $toml_string);
        $current_group = &$result;

        $line_count = count($lines);
        for ($line_num = 0; $line_num < $line_count; $line_num++) {
            $line = trim($lines[$line_num]);

            if ('' === $line || '#' === $line[0]) {
                continue;
            }

            if ('[' === $line[0] && ']' === substr($line, -1)) {
                $group_name = substr($line, 1, -1);
                $groups = explode('.', $group_name);

                $current_group = &$result;
                foreach ($groups as $g) {
                    if (!isset($current_group[$g])) {
                        $current_group[$g] = [];
                    }
                    $current_group = &$current_group[$g];
                }
                continue;
            }

            if (false !== strpos($line, '=')) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);

                // --- 新增：处理多行数组/多行值 ---
                // 如果值以 '[' 开头，但当前行没有以 ']' 结尾，说明它跨行了
                if ('' !== $value && '[' === $value[0] && ']' !== substr($value, -1)) {
                    while ($line_num + 1 < $line_count) {
                        $line_num++;
                        $next_line = trim($lines[$line_num]);

                        // 忽略多行数组内部的注释和空行
                        if ('' === $next_line || '#' === $next_line[0]) {
                            continue;
                        }

                        $value .= ' ' . $next_line; // 拼接内容

                        // 如果遇到了闭合的 ']'，说明多行数组结束了
                        if (']' === substr($next_line, -1)) {
                            break;
                        }
                    }
                }
                // ---------------------------------

                $parsed_value = self::parse_value($value);
                $current_group[$key] = $parsed_value;
            }
        }

        return $result;
    }

    public static function parse_value($value)
    {
        if (preg_match('/^"(.*)"$/', $value, $matches)) {
            return str_replace('\\"', '"', $matches[1]);
        }

        if (preg_match("/^'(.*)'$/", $value, $matches)) {
            return $matches[1];
        }

        if ('true' === $value) {
            return true;
        }
        if ('false' === $value) {
            return false;
        }

        if (preg_match('/^-?\\d+$/', $value)) {
            return (int) $value;
        }

        if (preg_match('/^-?\\d+\\.\\d+$/', $value)) {
            return (float) $value;
        }

        if ('[' === $value[0] && ']' === substr($value, -1)) {
            $inner = trim(substr($value, 1, -1));
            if ('' === $inner) {
                return [];
            }

            $items = [];
            $current = '';
            $in_string = false;
            $string_char = '';
            $depth = 0; // 新增：用来记录方括号嵌套深度
            $i = 0;
            $len = \strlen($inner);

            while ($i < $len) {
                $char = $inner[$i];

                if (!$in_string && ('"' === $char || "'" === $char)) {
                    $in_string = true;
                    $string_char = $char;
                    $current .= $char;
                } elseif ($in_string && $char === $string_char && '\\' !== $inner[$i - 1]) {
                    $in_string = false;
                    $current .= $char;
                } elseif (!$in_string && '[' === $char) {
                    $depth++; // 进入内层数组
                    $current .= $char;
                } elseif (!$in_string && ']' === $char) {
                    $depth--; // 离开内层数组
                    $current .= $char;
                } elseif (!$in_string && ',' === $char) {
                    // 只有当 depth 为 0 时，才说明这是外层数组的逗号
                    if (0 === $depth) {
                        if ('' !== trim($current)) {
                            $items[] = self::parse_value(trim($current));
                        }
                        $current = '';
                    } else {
                        $current .= $char;
                    }
                } else {
                    $current .= $char;
                }
                ++$i;
            }

            if ('' !== trim($current)) {
                $items[] = self::parse_value(trim($current));
            }

            return $items;
        }

        return trim($value, '"\'');
    }
}
