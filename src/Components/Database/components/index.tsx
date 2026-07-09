import { type FC, memo } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleGroup } from "@/Components/Module/components/group.tsx";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { UiMultiColContainer } from "@/Components/ui/col/multi-container.tsx";
import { EnableStatus } from "@/Components/ui/enable-status/index.tsx";
import { DATABASE_ID } from "./constants.ts";
import { useDatabaseStore } from "./store";

export const Database: FC = memo(() => {
  const pollData = useDatabaseStore(useShallow((s) => s.pollData));
  const shortItems: [string, boolean | string][] = [
    ["SQLite3", pollData?.sqlite3 ?? false],
    ["MySQLi client", pollData?.mysqliClientVersion ?? false],
    ["Mongo", pollData?.mongo ?? false],
    ["MongoDB", pollData?.mongoDb ?? false],
    ["PostgreSQL", pollData?.postgreSql ?? false],
    ["Paradox", pollData?.paradox ?? false],
    ["MS SQL", pollData?.msSql ?? false],
    ["PDO", pollData?.pdo ?? false],
  ];
  return (
    <ModuleItem id={DATABASE_ID} title={gettext("Database")}>
      <UiMultiColContainer minWidth={14}>
        {shortItems.map(([name, content]) => (
          <ModuleGroup key={name} label={name} maxWidth={7} minWidth={4}>
            <EnableStatus isEnable={Boolean(content)} text={content} />
          </ModuleGroup>
        ))}
      </UiMultiColContainer>
    </ModuleItem>
  );
});
