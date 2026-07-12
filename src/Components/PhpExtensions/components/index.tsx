import { type FC, memo, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleGroup } from "@/Components/Module/components/group.tsx";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { UiMultiColContainer } from "@/Components/ui/col/multi-container.tsx";
import { UiSingleColContainer } from "@/Components/ui/col/single-container.tsx";
import { EnableStatus } from "@/Components/ui/enable-status/index.tsx";
import { SearchLinks } from "@/Components/ui/search-link/index.tsx";
import { PHP_EXTENSIONS_ID } from "./constants.ts";
import { usePhpExtensionsStore } from "./store.ts";
import type { PhpExtensionsPollDataProps } from "./types.ts";

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
  const extensionStatuses = usePhpExtensionsStore(
    useShallow((s) => {
      if (!s.pollData) {
        return null;
      }
      const statusMap: Record<string, boolean> = {};
      for (const { key } of SHORT_EXTENSION_MAPPING) {
        statusMap[key] = Boolean(
          s.pollData?.[key as keyof PhpExtensionsPollDataProps],
        );
      }
      return statusMap;
    }),
  );
  const loadedExtensionsStr = usePhpExtensionsStore(
    (s) => s.pollData?.loadedExtensions?.join(",") ?? "",
  );
  const sortedShortItems = useMemo(() => {
    if (!extensionStatuses) {
      return [];
    }
    return SHORT_EXTENSION_MAPPING.map(({ key, name }) => {
      const displayName = typeof name === "function" ? name() : name;
      return {
        enabled: extensionStatuses[key] ?? false,
        name: displayName,
      };
    });
  }, [extensionStatuses]);
  const sortedLongItems = useMemo(() => {
    if (!loadedExtensionsStr) {
      return [];
    }
    return loadedExtensionsStr.split(",").sort((a, b) => a.localeCompare(b));
  }, [loadedExtensionsStr]);
  if (!extensionStatuses) {
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
        <ModuleGroup
          label={gettext("Loaded extensions")}
          maxWidth={6}
          minWidth={4}
        >
          <SearchLinks keywords={sortedLongItems} />
        </ModuleGroup>
      </UiSingleColContainer>
    </ModuleItem>
  );
});
