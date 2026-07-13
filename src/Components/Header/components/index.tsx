import type { FC } from "react";
import { Theme } from "@/Components/Theme/components/index.tsx";
import styles from "./index.module.scss";
import { HeaderName } from "./name.tsx";

export const Header: FC = () => (
  <div className={styles.main}>
    <HeaderName />
    <Theme />
  </div>
);
