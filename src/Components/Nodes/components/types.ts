import type { PollData } from "@/Components/Poll/components/types";

export type NodesItemProps = {
  id: string;
  loading: boolean;
  status: number;
  data: PollData | null;
};
export type NodesPollDataProps = {
  nodesIds: string[];
};
