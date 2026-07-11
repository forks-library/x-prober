<?php

declare(strict_types=1);

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude(__DIR__ . '/dist')
    ->exclude(__DIR__ . '/.tmp')
    ->exclude(__DIR__ . '/dev')
    ->exclude(__DIR__ . '/node_modules');

return (new PhpCsFixer\Config())
    ->setParallelConfig(PhpCsFixer\Runner\Parallel\ParallelConfigFactory::detect())
    ->setIndent("    ")
    ->setRiskyAllowed(true)
    ->setLineEnding("\n")
    ->setUsingCache(false)
    ->setRules([
        // 核心规则集
        '@PSR2' => true,
        // 注意：由于是 PHP 5.4 老旧项目，关闭现代化的全量框架规则集，完全由下方细粒度控制，防止引入 7.0+ 语法
        '@Symfony' => false,
        '@PhpCsFixer' => false,

        // 基础语法与结构 (适配 PHP 5.4)
        'array_indentation' => true,
        'array_syntax' => ['syntax' => 'short'], // PHP 5.4 开始支持短数组 []
        'list_syntax' => ['syntax' => 'long'],   // PHP 5.4 不支持 list() 的短语法 []，必须用 long
        'blank_line_after_namespace' => true,
        'blank_line_after_opening_tag' => true,
        'class_attributes_separation' => [
            'elements' => ['const' => 'one', 'method' => 'one', 'property' => 'one']
        ],
        'class_definition' => [
            'multi_line_extends_each_single_line' => true,
            'single_item_single_line' => true,
        ],
        'elseif' => true,
        'encoding' => true,
        'full_opening_tag' => true,
        'function_declaration' => true,
        'indentation_type' => true,
        'line_ending' => true,
        'lowercase_keywords' => true,
        'method_argument_space' => ['on_multiline' => 'ensure_fully_multiline'],
        'no_closing_tag' => true,
        'no_spaces_after_function_name' => true,
        'no_trailing_whitespace' => true,
        'no_trailing_whitespace_in_comment' => true,
        'single_blank_line_at_eof' => true,
        'single_import_per_statement' => true,
        'single_line_after_imports' => true,
        'switch_case_semicolon_to_colon' => true,
        'switch_case_space' => true,
        'visibility_required' => ['elements' => ['property', 'method']], // PHP 5.4 支持类成员可见性，但不支持 const 可见性

        // 字符串与操作符
        'concat_space' => ['spacing' => 'one'],
        'declare_equal_normalize' => true,
        'lowercase_cast' => true,
        'native_function_casing' => true,
        'new_with_braces' => true,
        'object_operator_without_whitespace' => true,
        'standardize_not_equals' => true,
        'ternary_operator_spaces' => true,
        'unary_operator_spaces' => true,

        // 清理与无用代码移除
        'no_empty_comment' => true,
        'no_empty_statement' => true,
        'no_extra_blank_lines' => true,
        'no_leading_import_slash' => true,
        'no_leading_namespace_whitespace' => true,
        'no_singleline_whitespace_before_semicolons' => true,
        'no_unused_imports' => true,
        'no_useless_else' => true,
        'no_useless_return' => true,
        'no_whitespace_before_comma_in_array' => true,
        'no_whitespace_in_blank_line' => true,
        'trim_array_spaces' => true,
        'whitespace_after_comma_in_array' => true,

        // 严格性与代码规范
        'cast_spaces' => true,
        'magic_constant_casing' => true,
        'magic_method_casing' => true,
        'ordered_imports' => true,
        'single_quote' => true,
        'yoda_style' => true,
        'constant_case' => ['case' => 'lowercase'],

        // 显式禁用会破坏 PHP 5.4 语法的现代规则
        'declare_strict_types' => false,     // PHP 7.0+
        'void_return' => false,              // PHP 7.1+
        'modernize_types_casting' => false,  // 可能会引入 5.4 不支持的函数调用
        'ternary_to_null_coalescing' => false, // 禁止转换为 ?? 运算符 (PHP 7.0+)
        'nullable_type_declaration_for_default_null_value' => false, // 禁用可空类型 (PHP 7.1+)
    ])
    ->setFinder($finder);
