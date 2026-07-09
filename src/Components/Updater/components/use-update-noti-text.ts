import { useShallow } from "zustand/react/shallow";
import { useConfigStore } from "@/Components/Config/store";
import { gettext } from "@/Components/Language";
import { template } from "@/Components/Utils/components/template";
import { useUpdaterStore } from "./store";

export const useUpdateNotiText = (): string => {
  const { isUpdating, hasUpdateError, targetVersion } = useUpdaterStore(
    useShallow((s) => ({
      isUpdating: s.isUpdating,
      hasUpdateError: s.hasUpdateError,
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
        oldVersion: AppVersion,
        newVersion: targetVersion,
      }
    );
  }
  return "";
};
