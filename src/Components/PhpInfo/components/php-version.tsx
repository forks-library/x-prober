import { type FC, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Link } from "@/Components/Button/components/index.tsx";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { OK } from "@/Components/Rest/http-status.ts";
import { template } from "@/Components/Utils/components/template.ts";
import { versionCompare } from "@/Components/Utils/components/version-compare.ts";
import { usePhpInfoStore } from "./store.ts";

export const PhpInfoPhpVersion: FC = () => {
  const { phpVersion, latestPhpVersion, setLatestPhpVersion } = usePhpInfoStore(
    useShallow((s) => ({
      latestPhpVersion: s.latestPhpVersion,
      phpVersion: s.pollData?.phpVersion ?? "",
      setLatestPhpVersion: s.setLatestPhpVersion,
    })),
  );
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await serverFetch<{ version: string }>(
        "latestPhpVersion",
      );
      if (data?.version && status === OK) {
        setLatestPhpVersion(data.version);
      }
    };
    fetchData();
  }, [setLatestPhpVersion]);
  const hasNewVersion = versionCompare(phpVersion, latestPhpVersion) < 0;
  return (
    <Link
      href="https://www.php.net/"
      title={gettext("Visit PHP.net Official website")}
    >
      {hasNewVersion && template(
        gettext("{{oldVersion}} (Latest: {{latestPhpVersion}})"),
        {
          latestPhpVersion,
          oldVersion: phpVersion,
        },
      )}
      {hasNewVersion || phpVersion}
    </Link>
  );
};
