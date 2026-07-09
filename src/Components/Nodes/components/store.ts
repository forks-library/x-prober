import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { isDeepEqual } from "@/Components/Utils/components/is-deep-equal/index.ts";
import type { NodesItemProps, NodesPollDataProps } from "./types.ts";

type State = {
  items: NodesItemProps[];
  pollData: NodesPollDataProps | null;
  setPollData: (pollData: NodesPollDataProps | null) => void;
  setItems: (items: NodesItemProps[]) => void;
  setItem: ({ id, ...props }: Partial<NodesItemProps>) => void;
};
// const DEFAULT_ITEM = {
//   id: "",
//   url: "",
//   fetchUrl: "",
//   loading: true,
//   status: 204,
//   data: null,
// };
const createStore: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  items: [],
  pollData: null,
  setItem: ({ id, ...props }) => {
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        Object.assign(item, props);
      }
    });
  },
  setItems: (items) => set({ items }),
  setPollData: (data) => {
    set((state) => {
      if (isDeepEqual(data, state.pollData)) {
        return;
      }
      state.pollData = data;
    });
  },
});
export const useNodesStore = create<State>()(immer(createStore));
