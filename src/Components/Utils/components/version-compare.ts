const NUMBER_PARSE = /^\d+$/;

/**
 * Special prerelease tags weights.
 * Lower weight means an older/less stable version.
 *
 * 预发布标签的权重。
 * 权重越小，代表版本越旧、越不稳定。
 */
const SPECIAL_TAGS: Record<string, number> = {
  "#": -2,
  a: -5,
  alpha: -5,
  any: -7,
  b: -4,
  beta: -4,
  p: -6,
  patch: -6,
  pl: -1,
  pr: -6,
  rc: -3,
};

/**
 * Compares two software version strings.
 * Combines strict SemVer 2.0.0 specification with loose formatting compatibility.
 *
 * 比较两个软件版本号字符串。
 * 融合了严格的 SemVer 2.0.0 规范，同时兼顾了宽松的非标准格式兼容性。
 *
 * @example
 * versionCompare('1.0.0', '1.0.1'); // returns -1
 * versionCompare('1.0.0-alpha', '1.0.0'); // returns -1 (SemVer: prerelease < release)
 * versionCompare('1.0.0a', '1.0.0-beta'); // returns -1 ('a' < 'beta' / -5 < -4)
 * versionCompare('1.0.0+build.1', '1.0.0+build.2'); // returns 0 (Build metadata is ignored)
 * versionCompare('2.0', '2.0.0'); // returns 0 (Implicit zero filling)
 *
 * @param v1 - The first version string to compare / 第一个待比较的版本号
 * @param v2 - The second version string to compare / 第二个待比较的版本号
 * @returns 1 if v1 > v2; -1 if v1 < v2; 0 if they are equal
 *          如果 v1 > v2 返回 1；如果 v1 < v2 返回 -1；如果相等则返回 0
 */
export function versionCompare(v1: string, v2: string): number {
  /**
   * 1. SemVer Strict: Ignore build metadata (everything after '+')
   * 1. 严格遵循 SemVer：忽略构建元数据（截断 '+' 及其之后的内容）
   */
  const cleanVersion = (v: string): string => {
    const plusIdx = v.indexOf("+");
    return plusIdx === -1 ? v : v.slice(0, plusIdx);
  };

  /**
   * 2. Normalize and split the version string into segment arrays
   * 2. 标准化版本字符串并将其切分为片段数组
   */
  const prepare = (v: string): string[] => {
    return (
      cleanVersion(v)
        .trim()
        // Replace separators like '-' and '_' with dots / 将 '-' 和 '_' 替换为 '.'
        .replace(/[-_]/g, ".")
        // Insert dots between numbers and letters (e.g., '1a' -> '1.a') / 在数字与字母交界处补点
        .replace(/([0-9]+)([a-zA-Z]+)/g, "$1.$2")
        // Insert dots between letters and numbers (e.g., 'rc2' -> 'rc.2') / 在字母与数字交界处补点
        .replace(/([a-zA-Z]+)([0-9]+)/g, "$1.$2")
        // Split into segments / 按点切分为数组
        .split(".")
        // Filter out empty blocks / 过滤空片段
        .filter((s) => s.length > 0)
    );
  };

  const p1 = prepare(v1);
  const p2 = prepare(v2);

  /**
   * 3. Parse a single segment block and analyze its type and weight
   * 3. 解析单个片段，分析其类型与权重
   */
  const parsePart = (part: string | undefined) => {
    // Implicit zero filling for missing parts / 对缺失片段进行隐式补 0
    if (part === undefined || part === "") {
      return { isNum: true, val: 0, weight: 0 };
    }

    const isNum = NUMBER_PARSE.test(part);
    if (isNum) {
      return { isNum: true, val: Number.parseInt(part, 10), weight: 0 };
    }

    // Handle alpha/beta/rc tags in lower case / 转换为小写处理预发布标签
    const lowPart = part.toLowerCase();
    const weight = lowPart in SPECIAL_TAGS ? SPECIAL_TAGS[lowPart] : 0;
    return { isNum: false, val: lowPart, weight };
  };

  const maxLen = Math.max(p1.length, p2.length);

  /**
   * 4. Linear comparison loop
   * 4. 线性对齐比较循环
   */
  for (let i = 0; i < maxLen; i += 1) {
    const part1 = parsePart(p1[i]);
    const part2 = parsePart(p2[i]);

    // Case A: Both are numbers -> direct numeric comparison
    // 情况 A：双方都是数字 -> 直接对比数字大小
    if (part1.isNum && part2.isNum) {
      if (part1.val !== part2.val) {
        return part1.val > part2.val ? 1 : -1;
      }
    }
    // Case B: Mixed types (Number vs Tag)
    // 情况 B：混合类型比较（数字 vs 字母标签）
    else if (part1.isNum || part2.isNum) {
      if (part1.isNum) {
        // SemVer: 1.0.0 > 1.0.0-alpha. If tag weight is negative, number wins.
        // SemVer 规范中正式版大于预发布版。若标签权重为负，则数字大。
        return part2.weight < 0 ? 1 : -1;
      }
      return part1.weight > 0 ? 1 : -1;
    }
    // Case C: Both are tags -> compare weights first, then alphabetical order
    // 情况 C：双方都是字母标签 -> 先对比预设权重，相同则对比字母 ASCII 顺序
    else {
      if (part1.weight !== part2.weight) {
        return part1.weight > part2.weight ? 1 : -1;
      }
      if (part1.val !== part2.val) {
        return part1.val > part2.val ? 1 : -1;
      }
    }
  }

  // Fully identical / 完全一致
  return 0;
}
