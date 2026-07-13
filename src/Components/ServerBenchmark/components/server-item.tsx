import copyToClipboard from "copy-to-clipboard";
import type { FC, MouseEvent, ReactNode } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { template } from "@/Components/Utils/components/template.ts";
import { UiRuby } from "@/Components/ui/ruby/index.tsx";
import { ServerBenchmarkMarksMeter } from "./marks-meter.tsx";
import styles from "./server-item.module.scss";
import type { ServerBenchmarkMarksProps } from "./types.ts";

const ServerBenchmarkResult: FC<{
  cpu: number;
  read: number;
  write: number;
  date?: string;
}> = ({ cpu, read, write, date }) => {
  const total = cpu + read + write;
  const cpuString = cpu.toLocaleString();
  const readString = read.toLocaleString();
  const writeString = write.toLocaleString();
  const totalString = total.toLocaleString();
  const totalText = template(
    "{{cpu}} (CPU) + {{read}} (Read) + {{write}} (Write) = {{total}}",
    {
      cpu: cpuString,
      read: readString,
      total: totalString,
      write: writeString,
    },
  );
  const sign = <span className={styles.sign}>+</span>;
  const handleCopyMarks = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    copyToClipboard(totalText);
  };
  return (
    <button
      className={styles.marks}
      onClick={handleCopyMarks}
      title={gettext("Touch to copy marks")}
      type="button"
    >
      <UiRuby data-is-detail rt="CPU" ruby={cpuString} />
      {sign}
      <UiRuby data-is-detail rt={gettext("Read")} ruby={readString} />
      {sign}
      <UiRuby data-is-detail rt={gettext("Write")} ruby={writeString} />
      <span className={styles.sign}>=</span>
      <UiRuby data-is-total isResult rt={date || ""} ruby={totalString} />
    </button>
  );
};
export const ServerBenchmarkItem: FC<{
  header: ReactNode;
  marks: ServerBenchmarkMarksProps;
  maxMarks: number;
  date: string;
}> = ({ header, marks, maxMarks, date }) => {
  const { cpu, read, write } = marks;
  return (
    <div className={styles.main}>
      <div className={styles.header}>{header}</div>
      <ServerBenchmarkResult cpu={cpu} date={date} read={read} write={write} />
      <ServerBenchmarkMarksMeter
        total={cpu + read + write}
        totalMarks={maxMarks}
      />
    </div>
  );
};
