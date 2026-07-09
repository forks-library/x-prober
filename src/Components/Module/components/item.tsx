import type { FC, ReactNode } from "react";
import { ModuleArrow } from "@/Components/Module/components/arrow.tsx";
import styles from "./item.module.scss";

const ModuleItemTitle: FC<{
  id: string;
  title: string;
}> = ({ id, title }) => (
  <h2 className={styles.header}>
    <ModuleArrow isDown={false} moduleId={id} />
    <span className={styles.title}>{title}</span>
    <ModuleArrow isDown moduleId={id} />
  </h2>
);
export const ModuleItem: FC<{
  id: string;
  title: string;
  children: ReactNode;
}> = ({ id, title, children, ...props }) => (
  <div className={styles.main} id={id} {...props}>
    <ModuleItemTitle id={id} title={title} />
    <div className={styles.body}>{children}</div>
  </div>
);
