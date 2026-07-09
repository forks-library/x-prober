import { type FC, type MouseEvent, useCallback } from "react";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { HeaderButton } from "@/Components/Header/components/link.tsx";
import { gettext } from "@/Components/Language/index.ts";
import {
  CREATED,
  FORBIDDEN,
  INSUFFICIENT_STORAGE,
  INTERNAL_SERVER_ERROR,
} from "@/Components/Rest/http-status.ts";
import { useToastStore } from "@/Components/Toast/components/store.ts";
import { useUpdaterStore } from "./store.ts";
import { useUpdateNotiText } from "./use-update-noti-text.ts";
export const UpdaterLink: FC = () => {
  const notiText = useUpdateNotiText();
  const isUpdating = useUpdaterStore((s) => s.isUpdating);
  const setIsUpdating = useUpdaterStore((s) => s.setIsUpdating);
  const setHasUpdateError = useUpdaterStore((s) => s.setHasUpdateError);
  const open = useToastStore((s) => s.open);
  const handleUpdate = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isUpdating) {
        return;
      }
      setIsUpdating(true);
      const { status } = await serverFetch("update");
      switch (status) {
        case CREATED:
          open(gettext("Update success, refreshing..."));
          window.location.reload();
          return;
        case FORBIDDEN:
          open(gettext("Update is disabled in dev mode."));
          setIsUpdating(false);
          setHasUpdateError(true);
          return;
        case INSUFFICIENT_STORAGE:
        case INTERNAL_SERVER_ERROR:
          open(
            gettext(
              "Can not update file, please check the server permissions and space."
            )
          );
          setIsUpdating(false);
          setHasUpdateError(true);
          return;
        default:
      }
      open(gettext("Network error, please try again later."));
      setIsUpdating(false);
      setHasUpdateError(true);
    },
    [isUpdating, setIsUpdating, setHasUpdateError, open]
  );
  return (
    <HeaderButton onClick={handleUpdate} title={gettext("Click to update")}>
      {notiText}
    </HeaderButton>
  );
};
