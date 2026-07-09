import type { FC, ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Location } from "@/Components/Location/components/index.tsx";
import { ModuleGroup } from "@/Components/Module/components/group.tsx";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { useIp } from "@/Components/Utils/components/use-ip.ts";
import { UiSingleColContainer } from "@/Components/ui/col/single-container.tsx";
import { MY_INFO_ID } from "./constants.ts";
import { useMyInfoStore } from "./store.ts";

export const MyInfo: FC = () => {
  const { hasPollData, pollDataIpv4, pollDataIpv6, phpLanguage } =
    useMyInfoStore(
      useShallow((s) => ({
        hasPollData: Boolean(s.pollData),
        phpLanguage: s.pollData?.phpLanguage ?? "-",
        pollDataIpv4: s.pollData?.ipv4 ?? "",
        pollDataIpv6: s.pollData?.ipv6 ?? "",
      })),
    );
  const { ip: ipv4, msg: ipv4Msg, isLoading: ipv4IsLoading } = useIp(4);
  const { ip: ipv6, msg: ipv6Msg, isLoading: ipv6IsLoading } = useIp(6);
  let myIpv4 = "";
  let myIpv6 = "";
  if (ipv4IsLoading) {
    myIpv4 = ipv4Msg;
  } else if (ipv4) {
    myIpv4 = ipv4;
  } else if (pollDataIpv4) {
    myIpv4 = pollDataIpv4;
  } else {
    myIpv4 = ipv4Msg;
  }
  if (ipv6IsLoading) {
    myIpv6 = ipv6Msg;
  } else if (ipv6) {
    myIpv6 = ipv6;
  } else if (pollDataIpv6) {
    myIpv6 = pollDataIpv6;
  } else {
    myIpv6 = ipv6Msg;
  }
  const items: [string, ReactNode][] = [
    [gettext("IPv4"), myIpv4],
    [gettext("IPv6"), myIpv6],
    [gettext("Location (IPv4)"), <Location ip={myIpv4} key="myLocalIpv4" />],
    [gettext("Browser UA"), navigator.userAgent],
    [gettext("JS Browser languages"), navigator.languages.join(",")],
    [gettext("PHP Browser languages"), phpLanguage],
  ];
  if (!hasPollData) {
    return null;
  }
  return (
    <ModuleItem id={MY_INFO_ID} title={gettext("My Info")}>
      <UiSingleColContainer>
        {items.map(([name, content]) => (
          <ModuleGroup key={name} label={name}>
            {content}
          </ModuleGroup>
        ))}
      </UiSingleColContainer>
    </ModuleItem>
  );
};
