import { useShallow } from "zustand/react/shallow";
import { useConfigStore } from "@/Components/Config/store.ts";
import { gettext } from "@/Components/Language/index.ts";
import { template } from "@/Components/Utils/components/template.ts";
import { useUpdaterStore } from "./store.ts";

export const useUpdateNotiText = (): string => {
  const { isUpdating, hasUpdateError, targetVersion } = useUpdaterStore(
    useShallow((s) => ({
      hasUpdateError: s.hasUpdateError,
      isUpdating: s.isUpdating,
      targetVersion: s.targetVersion,
    }))
  );
  const AppVersion = useConfigStore((s) => s?.pollData?.APP_VERSION ?? "-");
  if (isUpdating) {
    return gettext("⏳ Updating, please wait a second...");
  }
  if (hasUpdateError) {
    return gettext("❌ Update error, click here to try again?");
  }
  if (targetVersion) {
    return template(
      gettext("✨ Found new version: {{oldVersion}} ⇢ {{newVersion}}"),
      {
        newVersion: targetVersion,
        oldVersion: AppVersion,
      }
    );
  }
  return "";
};
