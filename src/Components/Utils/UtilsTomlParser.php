<?php

namespace InnStudio\Prober\Components\Utils;

final class UtilsTomlParser
{
    public static function parse($toml_string)
    {
        $result = [];
        $lines = explode("\n", $toml_string);
        $current_group = &$result;

        foreach ($lines as $line_num => $line) {
            $line = trim($line);

            if ('' === $line || '#' === $line[0]) {
                continue;
            }

            if ('[' === $line[0] && ']' === substr($line, -1)) {
                $group_name = substr($line, 1, -1);
                $groups = explode('.', $group_name);

                $current_group = &$result;
                foreach ($groups as $g) {
                    if ( ! isset($current_group[$g])) {
                        $current_group[$g] = [];
                    }
                    $current_group = &$current_group[$g];
                }
                continue;
            }

            if (false !== strpos($line, '=')) {
                [$key, $value] = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);

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
            $i = 0;
            $len = \strlen($inner);

            while ($i < $len) {
                $char = $inner[$i];

                if ( ! $in_string && ('"' === $char || "'" === $char)) {
                    $in_string = true;
                    $string_char = $char;
                    $current .= $char;
                } elseif ($in_string && $char === $string_char && '\\' !== $inner[$i - 1]) {
                    $in_string = false;
                    $current .= $char;
                } elseif ( ! $in_string && ',' === $char) {
                    $items[] = self::parse_value(trim($current));
                    $current = '';
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
