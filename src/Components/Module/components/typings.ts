import type { FC } from 'react';
export type ModuleProps = {
  id: string;
  content: FC;
  nav: FC;
};
export type SortedModuleProps = {
  id: string;
  priority: number;
};
