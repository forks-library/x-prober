# Changelog / 更新日志

`X-Prober` 的所有重要变更都将记录在此文件中 All Notable changes to `X-Prober`
will be documented in this file

---

## 10.0.1 - 2026-07-14

### Fix / 修复

- 修复因 CSS Module 隔离导致的样式部分失效问题
- Fixed partial style failure caused by CSS Module isolation

### Optimize / 优化

- 优化 Ping 功能在某些情况下无法停止的问题
- Improved the Ping feature to ensure it can be stopped reliably in all cases

---

## 10.0.0 - 2026-07-13

### Breaking changes / 破坏性变更

- 配置文件由 `xconfig.toml` 替代原有的 `xconfig.json`
- 重新设计了用户界面及配色方案
- Use `xconfig.toml` instead of `xconfig.json` for configuration
- Completely redesigned UI and color palette

### Add / 新增

- 新增“良夜”（深色）与“曦光”（浅色）两套配色主题
- Added "LiangYe" (dark) and "XiGuang" (light) color schemes

### Fix / 修复

- 修复 PHP5 中 `str_*` 系列函数的兼容性错误
- 修复 `filter_input` 函数在 PHP 中已弃用的警告
- 修复 PHP5 中 `COUNTINE` 关键字错误
- Fixed `str_*` function errors in PHP5
- Fixed deprecated warnings in `filter_input` function
- Fixed `COUNTINE` keyword error in PHP5

### Optimize / 优化

- 使用 Zustand 替代 MobX 作为状态管理库
- 更新项目依赖包
- 提升性能与界面交互体验
- Replaced MobX with Zustand for state management
- Updated dependencies
- Improved performance and UI polish

---

## 9.1.1 - 2025-12-21

### Fix / 修复

- 修复 PHP7/PHP5 中 `mb_*` 函数的兼容性错误
- Fixed `mb_*` function errors in PHP7/PHP5

### Optimize / 优化

- 优化数据刷新间隔逻辑
- Optimized interval data fetching logic

---

## 9.1.0 - 2025-09-05

### Add / 新增

- 新增浏览器性能测试（Browser Benchmark）
- Added Browser Benchmark feature

---

## 9.0.8 - 2025-09-01

### Add / 新增

- 增加浏览器性能测试的占位界面
- Added placeholder UI for Browser Benchmark

### Fix / 修复

- 修复 Nginx `auth_basic` 认证错误
- Fixed Nginx `auth_basic` authentication error

### Optimize / 优化

- 调整字体样式
- Adjusted font styles

---

## 9.0.7 - 2025-08-16

### Add / 新增

- 新增「Ping」检测功能
- Added "Ping" feature

### Optimize / 优化

- 优化多语言文案
- 优化 Toast 提示样式
- Improved language translations
- Refined toast notification styles

---

## 9.0.6 - 2025-08-16

### Optimize / 优化

- 优化导航栏文字内容
- 优化多语言文案
- 优化整体样式细节
- Improved navigation item text
- Refined language translations
- Polished UI styles

---

## 9.0.5 - 2025-08-14

### Fix / 修复

- 修复节点信息获取错误
- Fixed nodes data fetching error

---

## 9.0.4 - 2025-08-14

### Fix / 修复

- 修复 PHP5.4 中 `array_find` 函数不存在的问题
- Fixed `array_find` function not available in PHP5.4

---

## 9.0.3 - 2025-08-14

### Fix / 修复

- 修复节点 API 请求错误
- 修复页脚样式异常
- 调整 PHP 版本显示文案
- Fixed nodes API error
- Fixed footer styling issue
- Adjusted PHP version display text

---

## 9.0.2 - 2025-08-14

### Fix / 修复

- 修复版本更新检测错误
- Fixed version update detection error

---

## 9.0.1 - 2025-08-14

### Fix / 修复

- 修复页脚未正确显示应用名称的问题
- Fixed footer not showing application name

---

## 9.0.0 - 2025-08-13

### Rewrite / 重写

- 重新设计用户界面
- 重构所有功能模块
- 移除 Webpack，改用 Vite
- 升级至 React 19
- Redesigned UI from scratch
- Rewrote all feature modules
- Replaced Webpack with Vite
- Upgraded to React 19

---

## 8.20.0 - 2025-03-23

### Fix / 修复

- 修复 #224 反馈的问题
- Fixed issue #224

---

## 8.19.0 - 2024-08-18

### Optimize / 优化

- 调整 `is_readable` 函数调用时的警告处理
- Adjusted warning handling for `is_readable` function

---

## 8.18.0 - 2024-07-27

### Add / 新增

- 增加 ARM 架构 CPU 检测
- Added ARM CPU detection

### Optimize / 优化

- 优化磁盘使用率检测逻辑
- Optimized disk usage detection

---

## 8.17.0 - 2023-12-31

### Add / 新增

- 增加磁盘使用详情展示
- Added detailed disk usage information

### Optimize / 优化

- 优化界面样式
- Optimized UI styles

---

## 8.16.0 - 2022-12-14

### Add / 新增

- 增加服务器性能测试冷却时间配置项
- Added configurable cooldown for server benchmark

---

## 8.15.0 - 2022-12-08

### Optimize / 优化

- 优化界面样式
- Optimized UI styles

---

## 8.14.0 - 2022-11-14

### Add / 新增

- 新增深色模式
- Added dark mode

---

## 8.13.0 - 2022-11-14

### Fix / 修复

- 修复页面背景色异常
- Fixed body color issue

---

## 8.12.0 - 2022-11-14

### Remove / 移除

- 移除 `styled-components` 依赖
- 移除深色模式（即将回归）
- Removed `styled-components`
- Removed dark mode (coming back soon)

### Remove / 移除

- 移除对 PHP5.3 的兼容支持
- Dropped PHP5.3 compatibility

---

## 8.11.0 - 2022-10-22

### Remove / 移除

- 移除对 PHP5.3 的兼容支持
- Dropped PHP5.3 compatibility

### Optimize / 优化

- 更新项目依赖包
- Updated dependencies

---

## 8.10.0 - 2022-06-19

### Add / 新增

- 新增 PDO 数据库驱动检测
- Added PDO database driver detector

---

## 8.9.0 - 2022-04-02

### Optimize / 优化

- 移除 babel-loader
- 升级至 React 18
- 优化文件更新逻辑
- Removed babel-loader
- Upgraded to React 18
- Optimized file update logic

---

## 8.8.0 - 2022-01-08

### Fix / 修复

- 修复 `ping` 功能报错
- Fixed `ping` feature error

### Optimize / 优化

- 优化粗体字体样式
- Optimized bold font style

---

## 8.7.0 - 2021-12-05

### Fix / 修复

- 修复 PHP5.4 中 `pow` 函数的兼容性错误
- Fixed `pow` function error in PHP5.4

---

## 8.6.0 - 2021-10-25

### Fix / 修复

- 修复“我的服务器性能测试”按钮点击错误
- Fixed "My Server Benchmark" button error

---

## 8.5.0 - 2021-10-19

### Fix / 修复

- 修复 PHP8.1 中 `FILTER_SANITIZE_STRING` 已弃用的问题
- Fixed `FILTER_SANITIZE_STRING` deprecation in PHP8.1

### Optimize / 优化

- 内部优化
- Internal improvements

---

## 8.4.0 - 2021-10-18

### Optimize / 优化

- 优化 MobX 6 状态存储层
- 更新项目依赖包
- Optimized store for MobX 6
- Updated dependencies

---

## 8.3.0 - 2021-08-16

### Fix / 修复

- 修复 `mb_substr_count` 函数兼容性问题
- Fixed `mb_substr_count` function issue

---

## 8.2.0 - 2021-08-14

### Fix / 修复

- 修复进度条颜色显示错误
- Fixed progress bar color error

---

## 8.1.0 - 2021-08-14

### Optimize / 优化

- 优化页面最大宽度
- ESLint 代码规范修复
- Optimized page max width
- Fixed ESLint warnings

---

## 8.0.0 - 2021-07-13

### Add / 新增

- 全新服务器性能测试功能
- Brand new server benchmarks

---

## 7.7.0 - 2021-06-30

### Fix / 修复

- 修复 IPv4/IPv6 信息项重复显示问题
- Fixed duplicate IPv4/IPv6 items

---

## 7.6.0 - 2021-06-28

### Optimize / 优化

- 优化服务器信息视图渲染性能
- 更新项目依赖包
- 更新 ESLint 配置
- Optimized server info view performance
- Updated dependencies
- Updated ESLint config

---

## 7.5.0 - 2021-04-10

### Fix / 修复

- 修复系统负载更新错误
- Fixed system load update error

---

## 7.4.0 - 2021-02-25

### Add / 新增

- 新增 PHP8 Opcache JIT 检测器
- Added PHP8 Opcache JIT detector

### Fix / 修复

- 修复 `build-lang.js` 脚本中 lodash 报错
- 修复日语翻译错误
- Fixed lodash error in `build-lang.js` script
- Fixed Japanese translation errors

---

## 7.3.0 - 2021-02-24

### Fix / 修复

- 修复 PHP5 中 null 合并运算符的兼容问题
- Fixed null coalescing operator in PHP5

### Optimize / 优化

- 优化导航模块
- 优化 IP 地址显示文本
- 优化地理位置显示文本
- 使用 PNPM 替代 npm
- Optimized nav module
- Improved IP text display
- Improved location text display
- Switched to PNPM instead of npm

---

## 7.2.0 - 2021-02-18

### Optimize / 优化

- 优化 IPv4/v6 文字描述
- 优化导航栏样式
- 优化标题样式
- 优化进度条样式
- 调整 JS 至 ES2016 规范
- Improved IPv4/v6 text descriptions
- Refined nav styles
- Refined title styles
- Refined progress bar styles
- Adjusted JS to ES2016 scheme

---

## 7.1.0 - 2021-02-17

### Fix / 修复

- 修复 Zend "Optimizer" 拼写错误（感谢 Jack Cherng）
- Fixed typo in Zend "Optimizer" (thanks Jack Cherng)

### Optimize / 优化

- 优化默认配色，使其更精致
- 优化深色配色，使其更深邃
- Refined default color scheme
- Enhanced dark color scheme

---

## 7.0.0 - 2021-02-13

### Add / 新增

- 新增深色模式
- 新增服务器 IPv4/IPv6 信息
- 新增服务器 IPv4 地理位置信息
- 新增本机 IPv4/IPv6 信息
- 新增本机 IPv4 地理位置信息
- Added dark mode
- Added server IPv4/IPv6 information
- Added server IPv4 location information
- Added my IPv4/IPv6 information
- Added my IPv4 location information

### Adjust / 调整

- 调整整体配色方案
- Adjusted color schemes

---

## 6.7.0 - 2021-01-28

### Add / 新增

- 增加服务器性能测试结果复制功能
- Added copy feature for server benchmark results

### Optimize / 优化

- 优化颜色样式
- 优化 HTML 结构
- Optimized color styles
- Optimized HTML structure

---

## 6.6.0 - 2020-12-31

### Update / 更新

- 重构数据获取逻辑
- 更新 PHP 稳定版本号
- Rewrote fetch actions
- Updated PHP stable version

---

## 6.5.0 - 2020-10-29

### Update / 更新

- 使用 React Hooks 重构代码
- Refactored with React Hooks

---

## 6.3.0 - 2020-10-18

### Update / 更新

- 升级 Webpack 至 5.1 并重新配置
- 更新项目依赖包
- Upgraded Webpack to 5.1 and re-configured
- Updated dependencies

### Fix / 修复

- 修复 PHP 8 中 `mysqli_get_client_version()` 不应带参数的问题（感谢 Jack Cherng
  #104）
- Fixed `mysqli_get_client_version()` should not have arguments in PHP 8 (thanks
  Jack Cherng #104)

---

## 6.2.0 - 2020-09-18

### Add / 新增

- 增加服务器 IP 显示开关
- Added server IP feature toggle

### Update / 更新

- 更新 npm 依赖包
- Updated npm packages

---

## 6.1.0 - 2020-08-20

### Fix / 修复

- 修复节点网络速率显示错误
- Fixed nodes network speed display error

---

## 6.0.0 - 2020-08-19

### Add / 新增

- 新增节点（Nodes）功能
- Added Nodes feature

---

## 5.0.0 - 2020-08-11

### Add / 新增

- 新增多套配色方案
- Added color schemes

---

## 4.10.0 - 2020-08-11

### Add / 新增

- 新增 `xconfig.json` 配置文件，用于探针设置
- 添加功能禁用配置项
- 增加更多开发脚本
- Added `xconfig.json` for probe configuration
- Added feature disable settings
- Added more development scripts

---

## 4.9.0 - 2020-06-06

### Optimize / 优化

- 优化部分设备的网络统计显示
- Optimized network stats for some devices

---

## 4.8.0 - 2020-05-04

### Add / 新增

- 添加启动动画
- Added startup animation

### Update / 更新

- 许可证由 GPL2.0 升级至 GPL3.0
- Updated license from GPL2.0 to GPL3.0

### Optimize / 优化

- 微小的样式优化
- Minor style tweaks

---

## 4.7.0 - 2020-04-25

### Fix / 修复

- 修复内存刷新错误
- Fixed memory refresh error

### Update / 更新

- 更新 Nginx 稳定版版本号
- 更新 SQLite3 稳定版版本号
- 更新 MySQLi 客户端版本号
- Updated Nginx stable version
- Updated SQLite3 stable version
- Updated MySQLi client version

### Optimize / 优化

- 移除 lodash 库，减小 JS 文件体积
- Removed lodash to reduce JS bundle size

---

## 4.6.0 - 2020-04-22

### Fix / 修复

- 修复 32 位操作系统下大数字显示错误
- Fixed large number error on 32-bit OS

---

## 4.5.0 - 2020-04-10

### Optimize / 优化

- 优化语言显示效果
- Optimized language display

---

## 4.4.0 - 2020-04-08

### Update / 更新

- 更新项目依赖包
- Updated packages

---

## 4.3.0 - 2020-02-22

### Add / 新增

- 增加内存使用情况说明
- Added memory usage description

### Optimize / 优化

- 优化界面颜色
- 优化 Ping 按钮样式
- Optimized UI colors
- Refined Ping button style

---

## 4.2.0 - 2020-02-06

### Optimize / 优化

- 减小 JS 文件体积
- Reduced JS file size

### Add / 新增

- 新增 `php-dev.sh` 开发辅助脚本
- 生产环境增加 babel-loader
- Added `php-dev.sh` for development
- Added babel-loader for production

### Update / 更新

- 更新项目依赖包
- Updated packages

---

## 4.1.0 - 2020-01-30

### Add / 新增

- 增加磁盘实时使用率展示
- Added real-time disk usage

### Optimize / 优化

- 优化系统负载描述
- 移除 babel
- 调整接口命名规范
- Optimized system load description
- Removed babel
- Adjusted interface naming convention

---

## 4.0.0 - 2020-01-13

### Add / 新增

- 全新模块可排序功能
- New module sortability

### Optimize / 优化

- 优化进度条性能
- 优化文本大小写
- Optimized progress performance
- Optimized text case

---

## 3.11.0 - 2020-01-12

### Add / 新增

- 增加 `extensions` 目录以备未来扩展
- Added `extensions` directory for future extensions

### Optimize / 优化

- 优化温度传感器显示
- Optimized temperature sensor display

---

## 3.10.0 - 2020-01-10

### Fix / 修复

- 修复底部导航项切换问题
- Fixed bottom nav item switch

### Optimize / 优化

- 调整颜色搭配
- Adjusted colors

---

## 3.9.0 - 2020-01-09

### Add / 新增

- 新增温度传感器功能 (#7)
- 导航栏在移动端可滚动
- Added temperature sensor feature (#7)
- Navbar scrollable on mobile view

### Fix / 修复

- 修复开发环境下语言 JSON 文件路径错误
- Fixed language JSON file path error (for dev)

---

## 3.8.0 - 2020-01-06

### Optimize / 优化

- 优化引导加载代码
- Optimized bootstrap code

### Update / 更新

- 更新性能测试基准数据
- 更新项目依赖包
- Updated benchmarks
- Updated packages

---

## 3.7.0 - 2019-12-03

### Add / 新增

- 增加多个更新检查源
- Added multiple update check sources

---

## 3.6.0 - 2019-11-20

### Fix / 修复

- 修复 mbstring 扩展检测问题
- Fixed mbstring extension detection

### Update / 更新

- 更新繁体中文（zh_TW）翻译
- Updated zh_TW translation

---

## 3.5.0 - 2019-11-20

### Add / 新增

- 增加 HTTP 认证支持
- Added HTTP authorization

### Update / 更新

- 更新 SQLite3 版本号
- Updated SQLite3 version

---

## 3.4.0 - 2019-10-21

### Optimize / 优化

- 重命名 styled-components 组件
- Renamed styled-components components

---

## 3.3.0 - 2019-09-19

### Optimize / 优化

- 优化缺口位置
- 优化语言生成工具
- Optimized notch position
- Optimized language generation tool

### Update / 更新

- 更新 Nginx 版本至 1.16.1
- Updated Nginx version to 1.16.1

---

## 3.2 - 2019-08-03

### Fix / 修复

- 修复旧版浏览器中进度条颜色错误
- Fixed progress bar color error in older browsers

---

## 3.1 - 2019-08-01

### Optimize / 优化

- 优化页面滚动体验
- 优化视图显示尺寸
- Optimized page scroller
- Optimized viewer size

---

## 3.0 - 2019-08-31

### Add / 新增

- 独立的 PING 功能
- 纯 JS 渲染信息
- 支持 2K/4K 分辨率
- 增加 Windows 下 CPU 使用率
- Independent PING feature
- Pure JS rendering
- Support for 2K/4K resolution
- Added CPU usage for Windows

### Optimize / 优化

- 优化多语言文案
- 精简服务器性能测试项目
- Optimized language translations
- Trimmed server benchmark items

---

## 2.4.5 - 2019-08-04

### Update / 更新

- 更新最新 PHP 版本至 7.3.8
- Updated latest PHP version to 7.3.8

---

## 2.4.4 - 2019-07-11

### Fix / 修复

- 修复 lodash 安全漏洞
- Fixed lodash security vulnerabilities

---

## 2.4.3 - 2019-07-06

### Fix / 修复

- 修复 #31 除零错误
- Fixed #31 division by zero error

### Update / 更新

- 更新最新 PHP 版本至 7.3.7
- Updated latest PHP version to 7.3.7

---

## 2.4.2 - 2019-06-10

### Update / 更新

- 更新最新 PHP 版本至 7.3.6
- 更新 SpartanHost 性能测试数据
- Updated latest PHP version to 7.3.6
- Updated SpartanHost benchmarks

### Fix / 修复

- 修复 `tar` 包问题
- Fixed `tar` package

---

## 2.4.1 - 2019-05-24

### Optimize / 优化

- 优化 `position:fixed` 性能
- Optimized `position:fixed` performance

---

## 2.4.0 - 2019-05-14

### Add / 新增

- 新增 Ping 服务器功能
- Added Ping Server feature

### Update / 更新

- 更新 PHP 版本至 7.3.5
- 更新 NGINX 版本至 1.16.0
- 更新 SQLite 版本至 3.28.0
- Updated PHP version to 7.3.5
- Updated NGINX version to 1.16.0
- Updated SQLite version to 3.28.0

---

## 2.3.2 - 2019-04-07

### Update / 更新

- 更新 PHP 版本至 7.3.4
- Updated PHP version to 7.3.4

---

## 2.3.1 - 2019-03-16

### Optimize / 优化

- 将“Fork me”图片改为 HTML 文字
- 移除 Microsoft YaHei/YaHei UI 字体
- 调整 VSCode 配置
- 调整 php-cs-fixer 配置
- Changed "Fork me" image to HTML text
- Removed Microsoft YaHei/YaHei UI fonts
- Adjusted VSCode settings
- Adjusted php-cs-fixer config

---

## 2.3.0 - 2019-03-15

### Add / 新增

- 增加多个更新源
- 增加 NGINX 最新版本提示
- Added multiple update sources
- Added NGINX latest version tip

---

## 2.2.2 - 2019-03-14

### Fix / 修复

- 修复 Windows 下的错误
- Fixed error on Windows

---

## 2.2.1 - 2019-03-13

### Optimize / 优化

- 优化 HTML class 命名
- Optimized HTML class names

---

## 2.2.0 - 2019-03-09

### Add / 新增

- 编译增加调试模式
- 网络测速（服务器性能测试）增加二进制下载
- 增加探针页面（服务器性能测试）
- 执行服务器性能测试时增加休眠操作
- 增加最新 PHP 版本 7.3.3
- 增加 1Gbits 服务器性能测试
- Added debug mode for compiler
- Added binary download for network speed testing (server benchmark)
- Added prober page (server benchmark)
- Added sleep operation during server benchmark
- Added latest PHP version 7.3.3
- Added 1Gbits server benchmark

### Optimize / 优化

- 将 `seconds` 简写为 `s`
- Changed `seconds` to `s`

---

## 2.1.8 - 2019-03-05

### Add / 新增

- 对 fetch 请求禁用缓存
- Disable cache for fetch requests

---

## 2.1.7 - 2019-03-02

### Optimize / 优化

- 优化更新后清理 OPCACHE 缓存的操作
- Optimized OPCACHE cache clearing after update

---

## 2.1.6 - 2019-03-01

### Add / 新增

- 增加服务器性能测试日期
- 增加 APP 配置文件
- 增加进度条高亮样式
- 增加 SQLite3 扩展检测
- 增加 SimpleXML 扩展检测
- Added server benchmark date
- Added APP config file
- Added progress highlight style
- Added SQLite3 extension detection
- Added SimpleXML extension detection

### Optimize / 优化

- 优化服务器性能测试样式
- 优化 Firefox 下模块标题样式
- Optimized server benchmark style
- Optimized module title style for Firefox

---

## 2.1.5 - 2019-02-20

### Add / 新增

- 增加详细信息性能测试
- 增加 Monovm 性能测试结果
- Added detailed benchmark information
- Added Monovm benchmark results

### Fix / 修复

- 修复进度条中零值文字描述错误
- Fixed zero value text description error in progress

---

## 2.1.4 - 2019-02-19

### Add / 新增

- 增加内存真实使用率
- Added real memory usage

### Optimize / 优化

- 优化内存 cache/buffers 使用信息
- Optimized memory cache/buffers usage information

---

## 2.1.3 - 2019-02-14

### Add / 新增

- 增加 Google 搜索关键字
- Added Google search keyword

---

## 2.1.2 - 2019-02-11

### Update / 更新

- 更新最新 PHP 版本至 7.3.2
- Updated latest PHP version to 7.3.2

---

## 2.1.1 - 2019-02-09

### Add / 新增

- 增加 Vultr PHP7.3 性能测试数据
- 更新资源文件
- Added Vultr PHP7.3 benchmarks
- Updated package assets

---

## 2.1.0 - 2019-01-29

### Add / 新增

- 增加内存 cached/buffers 信息
- 增加 Swap cached 信息
- Added memory cached/buffers info
- Added swap cached info

---

## 2.0.9 - 2019-01-28

### Add / 新增

- 增加资源文件缓存头
- Added assets file cache header

### Fix / 修复

- 修复 #14（磁盘使用率）
- Fixed #14 (disk usage)

### Optimize / 优化

- 优化条目列表样式
- Optimized item list styles

---

## 2.0.8 - 2019-01-27

### Optimize / 优化

- 优化样式，视觉更舒适
- 调整 PHP 已加载扩展的位置
- Optimized styles for better comfort
- Adjusted PHP loaded extensions position

### Add / 新增

- 增加日语翻译
- Added Japanese language

---

## 2.0.7 - 2019-01-22

### Fix / 修复

- 修复磁盘进度条显示错误
- Fixed disk progress error

---

## 2.0.6 - 2019-01-22

### Fix / 修复

- 修复总内存显示不正确的问题
- Fixed incorrect total memory

### Optimize / 优化

- 优化进度条逻辑
- Optimized progress logic

---

## 2.0.5 - 2019-01-21

### Add / 新增

- 增加工具提示样式
- 增加详细性能测试工具提示
- 增加 cURL 扩展检测项
- 增加 LDAP 扩展检测项
- 无 SWAP 时自动隐藏 SWAP 进度条
- Added tooltip style
- Added detailed benchmark tooltip
- Added cURL extension detection
- Added LDAP extension detection
- Hide SWAP progress when no SWAP

### Optimize / 优化

- 优化缺口位置
- 优化 fetch 引导逻辑
- 优化 CPU 进度显示
- 优化样式细节
- Optimized notch position
- Optimized fetch bootstrap
- Optimized CPU progress display
- Refined styles

---

## 2.0.4 - 2019-01-19

### Optimize / 优化

- 移除 `is_readable()` 函数的警告信息
- 移除 HTML 压缩
- Removed warning for `is_readable()` function
- Removed HTML minification

---

## 2.0.3 - 2019-01-14

### Add / 新增

- 增加调试模式
- Added debug mode

### Fix / 修复

- 修复 PHP5.6- 兼容性问题
- Fixed compatibility for PHP5.6-

### Adjust / 调整

- 调整代码规范配置
- Adjusted fix-cs config

---

## 2.0.2 - 2019-01-14

### Fix / 修复

- 修复 #10 错误报告警告
- Fixed #10 error reporting warning

### Optimize / 优化

- 优化缺口样式
- Optimized notch style

---

## 2.0.1 - 2019-01-13

### Optimize / 优化

- 优化进度条样式
- 优化缺口样式
- 优化页脚样式
- Optimized progress style
- Optimized notch style
- Optimized footer style

---

## 2.0.0 - 2019-01-13

### Add / 新增

- 增加最新 PHP 版本 7.3.1
- 增加 ionCube 扩展检测
- 增加 SourceGuardian 扩展检测
- 增加 Phalcon 扩展检测
- 增加 FileInfo 扩展检测
- 增加 Graphics Magick 扩展检测
- 引入 React + Mobx 开发环境
- 更新开发者文档
- Added latest PHP version 7.3.1
- Added ionCube extension checker
- Added SourceGuardian extension checker
- Added Phalcon extension checker
- Added FileInfo extension checker
- Added Graphics Magick extension checker
- Added React + MobX for developer environment
- Updated developer documentation

### Optimize / 优化

- 重写所有 HTML 代码
- 重新设计用户界面
- Rewrote all HTML code
- Redesigned UI

### Remove / 移除

- 放弃对 IE 浏览器的支持
- Dropped IE browser support

---

## 1.7.5 - 2018-12-20

### Add / 新增

- 增加最新 PHP 版本 7.3.0
- 自更新后自动清理 OPCACHE 缓存
- Added latest PHP version 7.3.0
- Auto clear OPCACHE after self-update

---

## 1.7.4 - 2018-11-22

### Fix / 修复

- 修复 PHP5.3~5.6 下的错误
- Fixed errors on PHP5.3~5.6

---

## 1.7.3 - 2018-11-18

### Optimize / 优化

- 优化多语言文案
- 优化模块输出方式
- 优化 API 接口命名
- 优化事件系统
- 重命名编译器文件
- Optimized language translations
- Optimized module output method
- Optimized API interface names
- Optimized events system
- Renamed compiler file

### Add / 新增

- 增加 `disable_classes` 检测项
- 内置最新 PHP 版本通知
- Added `disable_classes` item
- Added built-in latest PHP version notification

### Remove / 移除

- 移除 awesome 图标
- Removed awesome icon

---

## 1.7.2 - 2018-10-02

### Optimize / 优化

- 优化 Windows 下获取空闲磁盘空间的方法（感谢 @jfcherng）
- 增加 php-cs-fixer 对 PHP5.3/7.2 的支持（感谢 @jfcherng）
- 为编译器补充缺失的类型提示（感谢 @jfcherng）
- Optimized free disk space retrieval on Windows (contributed by @jfcherng)
- Added php-cs-fixer support for PHP5.3/7.2 (contributed by @jfcherng)
- Added missing type hints for compiler (contributed by @jfcherng)

### Fix / 修复

- 修复代码缩进异常（感谢 @jfcherng）
- Fixed abnormal code indentation (contributed by @jfcherng)

---

## 1.7.1 - 2018-09-18

### Optimize / 优化

- 重新设计 I18n 模块
- 使用 Poedit 进行翻译
- 优化 PHP 错误报告显示
- 优化 CPU 负载文本格式
- Redesigned I18n module
- Used Poedit for translation
- Optimized PHP error reporting display
- Optimized CPU load text format

---

## 1.7.0 - 2018-09-05

### Add / 新增

- 增加 zh-HK 语言
- 增加浏览器语言信息
- 增加 SpartanHost 性能测试数据
- Added zh-HK language
- Added browser language information
- Added SpartanHost benchmarks

### Optimize / 优化

- 优化性能测试描述文本
- Optimized benchmark description text

---

## 1.6.1 - 2018-09-03

### Fix / 修复

- 修正拼写错误并移除多余尾部空格（感谢 @jfcherng）
- Fixed a typo and removed unnecessary trailing spaces (contributed by
  @jfcherng)

---

## 1.6.0 - 2018-09-03

### Add / 新增

- 新增 PHP 已加载扩展行（感谢 @jfcherng）
- 新增 zh-TW 语言（感谢 @jfcherng）
- Added a new row for PHP loaded extensions (contributed by @jfcherng)
- Added zh-TW language (contributed by @jfcherng)

### Fix / 修复

- 修复 Swoole 扩展检测条件错误（感谢 @jfcherng）
- Fixed Swoole extension checker condition error (contributed by @jfcherng)

---

## 1.5.2 - 2018-09-02

### Add / 新增

- 增加 VPSSERVER 性能测试数据
- 增加 Amazon 性能测试数据
- Added VPSSERVER server benchmark
- Added Amazon server benchmark

---

## 1.5.1 - 2018-07-11

### Fix / 修复

- 修复标题 JS 错误
- Fixed title JS error

---

## 1.5.0 - 2018-07-11

### Add / 新增

- 增加 Swap 内存动态显示
- 增加 Bandwagon HOST 性能测试数据
- 增加更多扩展检测
- Added swap memory dynamic display
- Added Bandwagon HOST benchmark
- Added more extension checkers

### Fix / 修复

- 修复版本更新错误
- Fixed update version error

### Optimize / 优化

- 优化进度条高值样式
- 优化链接样式
- Optimized progress high value style
- Optimized link style

---

## 1.4.0 - 2018-06-13

### Add / 新增

- 增加自动更新功能
- 增加 RamNode VPS 性能测试数据
- Added auto-update
- Added RamNode VPS benchmark points

### Fix / 修复

- 修复磁盘检测覆盖错误
- Fixed disk space checker override error

### Optimize / 优化

- 优化头部标题样式
- Optimized header title style

---

## 1.3.3 - 2018-03-18

### Fix / 修复

- 修复性能测试无限循环的问题
- Fixed benchmark unlimited loop bug

---

## 1.3.2 - 2018-03-17

### Fix / 修复

- 修复 Apache2.2 时区错误
- 修复 PHP5.3 中数据库错误
- Fixed Apache2.2 timezone error
- Fixed database error in PHP5.3

---

## 1.3.1 - 2018-03-01

### Fix / 修复

- 修复部分系统磁盘显示错误
- 修复翻译问题
- Fixed disk display error on some OS
- Fixed translation

---

## 1.3.0 - 2017-12-11

### Add / 新增

- 增加 Windows 操作系统下的 CPU 使用率
- 增加腾讯云和 Vultr 服务器性能测试结果
- 增加性能测试的表情符号提示
- 优化导航样式
- 修复 Windows 下的错误
- Added CPU usage on Windows OS
- Added Tencent and Vultr server benchmark results
- Added emoji tips for server benchmark
- Optimized nav style
- Fixed error on Windows OS

---

## 1.2.0 - 2017-11-22

### Add / 新增

- 增加服务器性能测试功能
- Added server performance benchmark

### Optimize / 优化

- 优化图标
- Optimized icons

---

## 1.1.1 - 2017-11-10

### Fix / 修复

- 修复 PHP5.3 下的错误
- Fixed errors in PHP5.3

---

## 1.1.0 - 2017-11-09

### Add / 新增

- 增加绝大多数 PHP 数据库扩展检测
- Added most PHP database checkers

### Optimize / 优化

- 将 Build.php 更名为 compile.php
- 优化编译器代码
- Renamed Build.php to compile.php
- Optimized compiler code

### Fix / 修复

- 修复 `display_errors` 关闭时状态显示为空的问题
- Fixed PHP `display_errors` showing empty when Off

---

## 1.0.2 - 2017-10-28

### Fix / 修复

- 修复 Windows 下 CPU 负载平均值显示错误
- Fixed CPU load average error on Windows

---

## 1.0.1 - 2017-10-27

### Fix / 修复

- 修复网络统计 TX 数据错误
- Fixed network stats TX data error

---

## 1.0.0 - 2017-10-25

### Add / 新增

- 发布第一个版本 1.0.0
- Published first version 1.0.0
