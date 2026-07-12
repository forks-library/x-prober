import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { usePollStore } from "@/Components/Poll/components/store.ts";
import { template } from "@/Components/Utils/components/template.ts";
import styles from "./index.module.scss";

export const Footer: FC = () => {
  const { hasConfig, APP_NAME, APP_URL, AUTHOR_NAME, AUTHOR_URL } =
    usePollStore(
      useShallow((s) => ({
        APP_NAME: s.pollData?.config?.APP_NAME,
        APP_URL: s.pollData?.config?.APP_URL,
        AUTHOR_NAME: s.pollData?.config?.AUTHOR_NAME,
        AUTHOR_URL: s.pollData?.config?.AUTHOR_URL,
        hasConfig: Boolean(s.pollData?.config),
      })),
    );
  if (!hasConfig) {
    return null;
  }
  return (
    <div
      className={styles.main}
      dangerouslySetInnerHTML={{
        __html: template(
          gettext("Generate by {{appName}} and developed by {{authorName}}"),
          {
            appName: `<a href="${APP_URL}" target="_blank">${APP_NAME}</a>`,
            authorName:
              `<a href="${AUTHOR_URL}" target="_blank">${AUTHOR_NAME}</a>`,
          },
        ),
      }}
    />
  );
};
