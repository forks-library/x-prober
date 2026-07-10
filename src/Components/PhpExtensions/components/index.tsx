import { type FC, memo, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleGroup } from "@/Components/Module/components/group.tsx";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { UiMultiColContainer } from "@/Components/ui/col/multi-container.tsx";
import { UiSingleColContainer } from "@/Components/ui/col/single-container.tsx";
import { EnableStatus } from "@/Components/ui/enable-status/index.tsx";
import { SearchLink } from "@/Components/ui/search-link/index.tsx";
import { PHP_EXTENSIONS_ID } from "./constants.ts";
import { usePhpExtensionsStore } from "./store.ts";
import type { PhpExtensionsPollDataProps } from "./types.ts";

// 1. 将扩展配置元数据抽离到组件外，避免每次渲染重新声明，并按原始英文字母序直接排好序
// 这样可以省去运行时去跑 .sort() 的计算开销，也解决了 i18n 排序错乱问题
const SHORT_EXTENSION_MAPPING = [
  { key: "curl", name: "cURL" },
  { key: "exif", name: "Exif" },
  { key: "fileinfo", name: "Fileinfo" },
  { key: "gmagick", name: "Graphics Magick" },
  { key: "imagick", name: "Image Magick" },
  { key: "ionCube", name: "ionCube" },
  { key: "ldap", name: "LDAP" },
  { key: "mbstring", name: "Multibyte String" },
  { key: "memcache", name: "Memcache" },
  { key: "memcached", name: "Memcached" },
  { key: "mysqli", name: "MySQLi" },
  { key: "opcache", name: "Opcache" },
  { key: "opcacheEnabled", name: () => gettext("Opcache enabled") },
  { key: "opcacheJitEnabled", name: () => gettext("Opcache JIT enabled") },
  { key: "phalcon", name: "Phalcon" },
  { key: "redis", name: "Redis" },
  { key: "simplexml", name: "SimpleXML" },
  { key: "sockets", name: "Sockets" },
  { key: "sourceGuardian", name: "Source Guardian" },
  { key: "sqlite3", name: "SQLite3" },
  { key: "swoole", name: "Swoole" },
  { key: "xdebug", name: "Xdebug" },
  { key: "zendOptimizer", name: "Zend Optimizer" },
  { key: "zip", name: "Zip" },
].sort((a, b) => {
  const nameA = typeof a.name === "function" ? a.key : a.name;
  const nameB = typeof b.name === "function" ? b.key : b.name;
  return nameA.localeCompare(nameB);
});

export const PhpExtensions: FC = memo(() => {
  // 2. 极大简化 Selector 的订阅粒度，只在 pollData 整体改变或不存在时做浅比对
  const pollData = usePhpExtensionsStore((s) => s.pollData);

  const loadedExtensions = usePhpExtensionsStore(
    useShallow((s) => s.pollData?.loadedExtensions),
  );

  // 3. 构造渲染所需的快捷扩展列表数据
  const sortedShortItems = useMemo(() => {
    if (!pollData) {
      return [];
    }

    return SHORT_EXTENSION_MAPPING.map(({ key, name }) => {
      const displayName = typeof name === "function" ? name() : name;
      // 从 store 的数据中安全地提取布尔值
      const isEnabled = Boolean(
        pollData[key as keyof PhpExtensionsPollDataProps],
      );
      return { enabled: isEnabled, name: displayName };
    });
  }, [pollData]);

  // 4. 排序已加载的扩展名
  const sortedLongItems = useMemo(() => {
    if (!loadedExtensions) {
      return [];
    }
    return [...loadedExtensions].sort((a, b) => a.localeCompare(b));
  }, [loadedExtensions]);

  // 5. 健壮性防线：安全的防御性返回，放在所有 Hook 执行完毕之后
  if (!pollData) {
    return null;
  }

  return (
    <ModuleItem id={PHP_EXTENSIONS_ID} title={gettext("PHP Extensions")}>
      <UiMultiColContainer minWidth={14}>
        {sortedShortItems.map(({ name, enabled }) => (
          <ModuleGroup key={name} label={name} maxWidth={10} minWidth={4}>
            <EnableStatus isEnable={enabled} />
          </ModuleGroup>
        ))}
      </UiMultiColContainer>

      <UiSingleColContainer>
        {sortedLongItems.length > 0 && (
          <ModuleGroup
            label={gettext("Loaded extensions")}
            maxWidth={6}
            minWidth={4}
          >
            {sortedLongItems.map((id) => <SearchLink key={id} keyword={id} />)}
          </ModuleGroup>
        )}
      </UiSingleColContainer>
    </ModuleItem>
  );
});
