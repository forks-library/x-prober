import { Info } from "lucide-react";
import type { FC, ReactNode } from "react";
import styles from "./index.module.scss";

type UiDescriptionProps = {
  items: {
    id: string;
    text: ReactNode;
  }[];
};
export const UiDescription: FC<UiDescriptionProps> = ({ items }) => (
  <ul className={styles.main}>
    {items.map(({ id, text }) => (
      <li className={styles.item} key={id}>
        <Info />
        {text}
      </li>
    ))}
  </ul>
);
