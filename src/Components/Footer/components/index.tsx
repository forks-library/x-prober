import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { usePollStore } from "@/Components/Poll/components/store.ts";
import { template } from "@/Components/Utils/components/template";
import styles from "./index.module.scss";

export const Footer: FC = () => {
  const config = usePollStore(useShallow((s) => s.pollData?.config));
  if (!config) {
    return null;
  }
  const { APP_NAME, APP_URL, AUTHOR_NAME, AUTHOR_URL } = config;
  return (
    <div
      className={styles.main}
      dangerouslySetInnerHTML={{
        __html: template(
          gettext("Generate by {{appName}} and developed by {{authorName}}"),
          {
            appName: `<a href="${APP_URL}" target="_blank">${APP_NAME}</a>`,
            authorName: `<a href="${AUTHOR_URL}" target="_blank">${AUTHOR_NAME}</a>`,
          }
        ),
      }}
    />
  );
};
