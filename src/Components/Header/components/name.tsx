import { type FC, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useConfigStore } from "@/Components/Config/store.ts";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { OK } from "@/Components/Rest/http-status.ts";
import { useUpdaterStore } from "@/Components/Updater/components/store";
import { UpdaterLink } from "@/Components/Updater/components/updater-link";
import { versionCompare } from "@/Components/Utils/components/version-compare.ts";
import { HeaderLink } from "./link.tsx";
import styles from "./name.module.scss";

export const HeaderName: FC = () => {
  const { hasPollData, APP_NAME, APP_URL, APP_VERSION } = useConfigStore(
    useShallow((s) => ({
      APP_NAME: s.pollData?.APP_NAME,
      APP_URL: s.pollData?.APP_URL,
      APP_VERSION: s.pollData?.APP_VERSION,
      hasPollData: Boolean(s.pollData),
    })),
  );
  const { setTargetVersion, targetVersion } = useUpdaterStore(
    useShallow((s) => ({
      setTargetVersion: s.setTargetVersion,
      targetVersion: s.targetVersion,
    })),
  );
  // fetch new version
  useEffect(() => {
    if (!hasPollData) {
      return;
    }
    const fetchData = async () => {
      const { data, status } = await serverFetch<{
        version: string;
      }>("latestVersion");
      if (!data?.version || status !== OK) {
        return;
      }
      setTargetVersion(data.version);
    };
    fetchData();
  }, [hasPollData, setTargetVersion]);
  if (!hasPollData) {
    return null;
  }
  return (
    <h1 className={styles.main}>
      {targetVersion && APP_VERSION &&
          versionCompare(APP_VERSION, targetVersion) < 0
        ? <UpdaterLink />
        : (
          <HeaderLink href={APP_URL} rel="noreferrer" target="_blank">
            <span className={styles.name}>{APP_NAME}</span>
            <span className={styles.version}>{APP_VERSION}</span>
          </HeaderLink>
        )}
    </h1>
  );
};
