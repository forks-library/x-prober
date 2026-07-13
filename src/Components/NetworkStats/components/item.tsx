import { type FC, memo } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { formatBytes } from "@/Components/Utils/components/format-bytes.ts";
import styles from "./item.module.scss";

type NetworksStatsItemProps = {
  id: string;
  rateRx?: number; // 既然解构时给了默认值 0，类型最好定义为可选
  rateTx?: number;
  totalRx?: number;
  totalTx?: number;
};

export const NetworksStatsItem: FC<NetworksStatsItemProps> = memo(
  ({ id, totalRx = 0, rateRx = 0, totalTx = 0, rateTx = 0 }) => {
    // 如果没有 id，直接拦截返回 null
    if (!id) {
      return null;
    }

    return (
      <div className={styles.main}>
        <div className={styles.id}>{id}</div>

        <div className={styles.rx}>
          <div className={styles.label}>{gettext("▼ Received")}</div>
          <div className={styles.total}>{formatBytes(totalRx)}</div>
          <div className={styles.rateRx}>{formatBytes(rateRx)}/s</div>
        </div>

        <div className={styles.tx}>
          <div className={styles.label}>{gettext("▲ Sent")}</div>
          <div className={styles.total}>{formatBytes(totalTx)}</div>
          <div className={styles.rateTx}>{formatBytes(rateTx)}/s</div>
        </div>
      </div>
    );
  },
);

NetworksStatsItem.displayName = "NetworksStatsItem";
