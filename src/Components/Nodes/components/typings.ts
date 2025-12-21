import type { PollDataProps } from '@/Components/Poll/components/typings.ts';
export type NodesItemProps = {
  id: string;
  loading: boolean;
  status: number;
  data: PollDataProps | null;
};
export type NodesPollDataProps = {
  nodesIds: string[];
};
