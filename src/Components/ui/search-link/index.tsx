import copy from "copy-to-clipboard";
import { type FC, type MouseEvent, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { useToastStore } from "@/Components/Toast/components/store.ts";
import styles from "./index.module.scss";

const SearchButton: FC<{
  onCopy: (e: MouseEvent<HTMLButtonElement>) => void;
  keyword: string;
}> = ({ onCopy, keyword }) => (
  <button
    className={styles.button}
    onClick={onCopy}
    title={gettext("Click to copy text")}
    type="button"
  >
    {keyword}
  </button>
);

export const SearchLinks: FC<{ keywords: string[] }> = ({ keywords }) => {
  const open = useToastStore(useShallow((s) => s.open));
  const handleCopy = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      copy(e.currentTarget.textContent);
      open(gettext("Copied"));
    },
    [open],
  );
  return (
    <div className={styles.container}>
      {keywords.map((n) => (
        <SearchButton key={n} keyword={n} onCopy={handleCopy} />
      ))}
    </div>
  );
};
