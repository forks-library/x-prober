import { type FC, memo, type ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";
import { Link } from "@/Components/Button/components/index.tsx";
import { serverFetchRoute } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleGroup } from "@/Components/Module/components/group.tsx";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { UiMultiColContainer } from "@/Components/ui/col/multi-container.tsx";
import { UiSingleColContainer } from "@/Components/ui/col/single-container.tsx";
import { EnableStatus } from "@/Components/ui/enable-status/index.tsx";
import { SearchLink } from "@/Components/ui/search-link/index.tsx";
import { PHP_INFO_ID } from "./constants.ts";
import { PhpInfoPhpVersion } from "./php-version.tsx";
import { usePhpInfoStore } from "./store.ts";

export const PhpInfo: FC = memo(() => {
  const pollData = usePhpInfoStore(
    useShallow((s) => {
      if (!s.pollData) {
        return null;
      }
      return {
        allowUrlFopen: s.pollData.allowUrlFopen,
        defaultSocketTimeout: s.pollData.defaultSocketTimeout,
        disableClasses: s.pollData.disableClasses.join(","),
        disableFunctions: s.pollData.disableFunctions.join(","),
        displayErrors: s.pollData.displayErrors,
        errorReporting: s.pollData.errorReporting,
        maxExecutionTime: s.pollData.maxExecutionTime,
        maxInputVars: s.pollData.maxInputVars,
        memoryLimit: s.pollData.memoryLimit,
        postMaxSize: s.pollData.postMaxSize,
        sapi: s.pollData.sapi,
        smtp: s.pollData.smtp,
        uploadMaxFilesize: s.pollData.uploadMaxFilesize,
      };
    }),
  );
  if (!pollData) {
    return null;
  }
  const oneLineItems: [string, ReactNode][] = [
    [
      "PHP info",
      <Link
        href={serverFetchRoute("phpInfoDetail")}
        key="phpInfoDetail"
        target="_blank"
      >
        {gettext("Detail")}
      </Link>,
    ],
    [gettext("Version"), <PhpInfoPhpVersion key="phpVersion" />],
  ];
  const shortItems: [string, ReactNode][] = [
    [gettext("SAPI interface"), pollData.sapi],
    [
      gettext("Display errors"),
      <EnableStatus isEnable={pollData.displayErrors} key="displayErrors" />,
    ],
    [gettext("Error reporting"), pollData.errorReporting],
    [gettext("Max memory limit"), pollData.memoryLimit],
    [gettext("Max POST size"), pollData.postMaxSize],
    [gettext("Max upload size"), pollData.uploadMaxFilesize],
    [gettext("Max input variables"), pollData.maxInputVars],
    [gettext("Max execution time"), pollData.maxExecutionTime],
    [gettext("Timeout for socket"), pollData.defaultSocketTimeout],
    [
      gettext("Treatment URLs file"),
      <EnableStatus isEnable={pollData.allowUrlFopen} key="allowUrlFopen" />,
    ],
    [
      gettext("SMTP support"),
      <EnableStatus isEnable={pollData.smtp} key="smtp" />,
    ],
  ];
  const sortedFunctions = pollData.disableFunctions.split(",").toSorted();
  const sortedClasses = pollData.disableClasses.split(",").toSorted();
  const longItems: [string, ReactNode][] = [
    [
      gettext("Disabled functions"),
      sortedFunctions.length
        ? sortedFunctions.map((fn: string) => (
          <SearchLink key={fn} keyword={fn} />
        ))
        : "-",
    ],
    [
      gettext("Disabled classes"),
      sortedClasses.length
        ? sortedClasses.map((fn: string) => (
          <SearchLink key={fn} keyword={fn} />
        ))
        : "-",
    ],
  ];
  return (
    <ModuleItem id={PHP_INFO_ID} title={gettext("PHP Information")}>
      <UiMultiColContainer>
        {oneLineItems.map(([title, content]) => (
          <ModuleGroup key={title} label={title}>
            {content}
          </ModuleGroup>
        ))}
        {shortItems.map(([title, content]) => (
          <ModuleGroup key={title} label={title}>
            {content}
          </ModuleGroup>
        ))}
      </UiMultiColContainer>
      <UiSingleColContainer>
        {longItems.map(([title, content]) => (
          <ModuleGroup key={title} label={title} maxWidth={7} minWidth={4}>
            {content}
          </ModuleGroup>
        ))}
      </UiSingleColContainer>
    </ModuleItem>
  );
});
