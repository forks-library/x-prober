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
export const PhpExtensions: FC = memo(() => {
  const shortItemsRaw = usePhpExtensionsStore(
    useShallow((s) => {
      if (!s.pollData) {
        return null;
      }
      return {
        curl: s.pollData.curl,
        exif: s.pollData.exif,
        fileinfo: s.pollData.fileinfo,
        gmagick: s.pollData.gmagick,
        imagick: s.pollData.imagick,
        ionCube: s.pollData.ionCube,
        ldap: s.pollData.ldap,
        mbstring: s.pollData.mbstring,
        memcache: s.pollData.memcache,
        memcached: s.pollData.memcached,
        mysqli: s.pollData.mysqli,
        opcache: s.pollData.opcache,
        opcacheEnabled: s.pollData.opcacheEnabled,
        opcacheJitEnabled: s.pollData.opcacheJitEnabled,
        phalcon: s.pollData.phalcon,
        redis: s.pollData.redis,
        simplexml: s.pollData.simplexml,
        sockets: s.pollData.sockets,
        sourceGuardian: s.pollData.sourceGuardian,
        sqlite3: s.pollData.sqlite3,
        swoole: s.pollData.swoole,
        xdebug: s.pollData.xdebug,
        zendOptimizer: s.pollData.zendOptimizer,
        zip: s.pollData.zip,
      };
    }),
  );
  const loadedExtensions = usePhpExtensionsStore(
    useShallow((s) => s.pollData?.loadedExtensions),
  );
  const sortedShortItems = useMemo(() => {
    if (!shortItemsRaw) {
      return [];
    }
    const items: [string, boolean][] = [
      ["Redis", Boolean(shortItemsRaw.redis)],
      ["SQLite3", Boolean(shortItemsRaw.sqlite3)],
      ["Memcache", Boolean(shortItemsRaw.memcache)],
      ["Memcached", Boolean(shortItemsRaw.memcached)],
      ["Opcache", Boolean(shortItemsRaw.opcache)],
      [gettext("Opcache enabled"), Boolean(shortItemsRaw.opcacheEnabled)],
      [
        gettext("Opcache JIT enabled"),
        Boolean(shortItemsRaw.opcacheJitEnabled),
      ],
      ["Swoole", Boolean(shortItemsRaw.swoole)],
      ["Image Magick", Boolean(shortItemsRaw.imagick)],
      ["Graphics Magick", Boolean(shortItemsRaw.gmagick)],
      ["Exif", Boolean(shortItemsRaw.exif)],
      ["Fileinfo", Boolean(shortItemsRaw.fileinfo)],
      ["SimpleXML", Boolean(shortItemsRaw.simplexml)],
      ["Sockets", Boolean(shortItemsRaw.sockets)],
      ["MySQLi", Boolean(shortItemsRaw.mysqli)],
      ["Zip", Boolean(shortItemsRaw.zip)],
      ["Multibyte String", Boolean(shortItemsRaw.mbstring)],
      ["Phalcon", Boolean(shortItemsRaw.phalcon)],
      ["Xdebug", Boolean(shortItemsRaw.xdebug)],
      ["Zend Optimizer", Boolean(shortItemsRaw.zendOptimizer)],
      ["ionCube", Boolean(shortItemsRaw.ionCube)],
      ["Source Guardian", Boolean(shortItemsRaw.sourceGuardian)],
      ["LDAP", Boolean(shortItemsRaw.ldap)],
      ["cURL", Boolean(shortItemsRaw.curl)],
    ];
    return items.sort((a, b) => a[0].localeCompare(b[0]));
  }, [shortItemsRaw]);
  const sortedLongItems = useMemo(() => {
    if (!loadedExtensions) {
      return [];
    }
    return loadedExtensions.slice().sort((a, b) => a.localeCompare(b));
  }, [loadedExtensions]);
  if (!shortItemsRaw) {
    return null;
  }
  return (
    <ModuleItem id={PHP_EXTENSIONS_ID} title={gettext("PHP Extensions")}>
      <UiMultiColContainer minWidth={14}>
        {sortedShortItems.map(([name, enabled]) => (
          <ModuleGroup key={name} label={name} maxWidth={10} minWidth={4}>
            <EnableStatus isEnable={enabled} />
          </ModuleGroup>
        ))}
      </UiMultiColContainer>
      <UiSingleColContainer>
        {Boolean(sortedLongItems.length) && (
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
