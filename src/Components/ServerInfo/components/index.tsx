import { type FC, memo, type ReactNode, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { Location } from "@/Components/Location/components/index.tsx";
import { ModuleGroup } from "@/Components/Module/components/group.tsx";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { OK } from "@/Components/Rest/http-status.ts";
import { template } from "@/Components/Utils/components/template.ts";
import { UiMultiColContainer } from "@/Components/ui/col/multi-container.tsx";
import { UiSingleColContainer } from "@/Components/ui/col/single-container.tsx";
import { SERVER_INFO_ID } from "./constants.ts";
import { useServerInfoStore } from "./store.ts";
import type { ServerInfoPollDataProps } from "./types.ts";

const DEFAULT_UPTIME = { days: 0, hours: 0, mins: 0, secs: 0 };
const ServerTime: FC<{
  serverUptime: ServerInfoPollDataProps["serverUptime"];
  serverTime: ServerInfoPollDataProps["serverTime"];
}> = ({ serverUptime, serverTime }) => {
  const { days, hours, mins, secs } = serverUptime;
  const uptime = template(
    gettext("{{days}}d {{hours}}h {{mins}}min {{secs}}s"),
    { days, hours, mins, secs },
  );
  const items = [
    [gettext("Time"), serverTime],
    [gettext("Uptime"), uptime],
  ];
  return (
    <>
      {items.map(([title, content]) => (
        <ModuleGroup key={title} label={title} maxWidth={6}>
          {content}
        </ModuleGroup>
      ))}
    </>
  );
};
const SingleItems: FC<{
  cpuModel: ServerInfoPollDataProps["cpuModel"];
  serverOs: ServerInfoPollDataProps["serverOs"];
  scriptPath: ServerInfoPollDataProps["scriptPath"];
  publicIpv4: string;
}> = memo(({ cpuModel, serverOs, scriptPath, publicIpv4 }) => {
  const items: [string, ReactNode][] = [
    [
      gettext("Location (IPv4)"),
      <Location ip={publicIpv4} key="serverLocalIpv4" />,
    ],
    [gettext("CPU model"), cpuModel ?? gettext("Unavailable")],
    [gettext("OS"), serverOs ?? gettext("Unavailable")],
    [gettext("Script path"), scriptPath ?? gettext("Unavailable")],
  ];
  return (
    <UiSingleColContainer>
      {items.map(([title, content]) => (
        <ModuleGroup key={title} label={title} maxWidth={6}>
          {content}
        </ModuleGroup>
      ))}
    </UiSingleColContainer>
  );
});
const MultiItems: FC<{
  serverName: ServerInfoPollDataProps["serverName"];
  serverSoftware: ServerInfoPollDataProps["serverSoftware"];
  publicIpv4: string;
  publicIpv6: string;
  localIpv4: string;
  localIpv6: string;
}> = memo(
  ({
    serverName,
    serverSoftware,
    publicIpv4,
    publicIpv6,
    localIpv4,
    localIpv6,
  }) => {
    const items: [string, ReactNode][] = [
      [gettext("Name"), serverName ?? gettext("Unavailable")],
      [gettext("Web server"), serverSoftware ?? gettext("Unavailable")],
      [gettext("Public IPv4"), publicIpv4 || "-"],
      [gettext("Public IPv6"), publicIpv6 || "-"],
      [gettext("Local IPv4"), localIpv4 || "-"],
      [gettext("Local IPv6"), localIpv6 || "-"],
    ];
    return (
      <>
        {items.map(([title, content]) => (
          <ModuleGroup key={title} label={title} maxWidth={6}>
            {content}
          </ModuleGroup>
        ))}
      </>
    );
  },
);
export const LiveUptime: FC = () => {
  const { serverTime, serverUptime } = useServerInfoStore(
    useShallow((s) => ({
      serverTime: s.pollData?.serverTime ?? "-",
      serverUptime: s.pollData?.serverUptime ?? DEFAULT_UPTIME,
    })),
  );
  return <ServerTime serverTime={serverTime} serverUptime={serverUptime} />;
};
export const ServerInfo: FC = () => {
  const setPublicIpv4 = useServerInfoStore((s) => s.setPublicIpv4);
  const setPublicIpv6 = useServerInfoStore((s) => s.setPublicIpv6);
  const {
    hasPollData,
    publicIpv4,
    publicIpv6,
    localIpv4,
    localIpv6,
    serverName,
    serverSoftware,
    cpuModel,
    scriptPath,
    serverOs,
  } = useServerInfoStore(
    useShallow((s) => ({
      cpuModel: s.pollData?.cpuModel ?? "-",
      hasPollData: Boolean(s.pollData),
      localIpv4: s.pollData?.localIpv4 ?? "-",
      localIpv6: s.pollData?.localIpv6 ?? "-",
      publicIpv4: s.publicIpv4,
      publicIpv6: s.publicIpv6,
      scriptPath: s.pollData?.scriptPath ?? "-",
      serverName: s.pollData?.serverName ?? "-",
      serverOs: s.pollData?.serverOs ?? "-",
      serverSoftware: s.pollData?.serverSoftware ?? "-",
    })),
  );
  // fetch ipv4
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await serverFetch<{ ip: string }>(
        "serverPublicIpv4",
      );
      if (data?.ip && status === OK) {
        setPublicIpv4(data.ip);
      }
    };
    fetchData();
  }, [setPublicIpv4]);
  // fetch ipv6
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await serverFetch<{ ip: string }>(
        "serverPublicIpv6",
      );
      if (data?.ip && status === OK) {
        setPublicIpv6(data.ip);
      }
    };
    fetchData();
  }, [setPublicIpv6]);
  if (!hasPollData) {
    return null;
  }
  return (
    <ModuleItem id={SERVER_INFO_ID} title={gettext("Server Info")}>
      <UiMultiColContainer minWidth={20}>
        <LiveUptime />
        <MultiItems
          localIpv4={localIpv4}
          localIpv6={localIpv6}
          publicIpv4={publicIpv4}
          publicIpv6={publicIpv6}
          serverName={serverName}
          serverSoftware={serverSoftware}
        />
      </UiMultiColContainer>
      <SingleItems
        cpuModel={cpuModel}
        publicIpv4={publicIpv4}
        scriptPath={scriptPath}
        serverOs={serverOs}
      />
    </ModuleItem>
  );
};
