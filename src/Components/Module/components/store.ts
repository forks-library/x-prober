import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  DEFAULT_MODULE_PRIORITES,
  getStorageModulePriorities,
  setStorageModulePriorities,
} from "@/Components/Module/components/priority.ts";

type State = {
  priorities: string[];
  setPriorities: (ids: string[]) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
};

const store: StateCreator<State, [["zustand/immer", never]]> = (set) => {
  const storagModulePriorities = getStorageModulePriorities();
  const initPriorities: string[] = DEFAULT_MODULE_PRIORITES.toSorted((a, b) => {
    const index1 = storagModulePriorities.indexOf(a);
    const index2 = storagModulePriorities.indexOf(b);
    return (index1 < 0 ? 0 : index1) - (index2 < 0 ? 0 : index2);
  });
  return {
    moveDown: (id) => {
      set((state) => {
        const i = state.priorities.indexOf(id);
        if (i < 0 || i === state.priorities.length - 1) {
          return;
        }
        [state.priorities[i], state.priorities[i + 1]] = [
          state.priorities[i + 1],
          state.priorities[i],
        ];
        setStorageModulePriorities(state.priorities);
      });
    },
    moveUp: (id) => {
      set((state) => {
        const i = state.priorities.indexOf(id);
        if (i <= 0) {
          return;
        }
        [state.priorities[i], state.priorities[i - 1]] = [
          state.priorities[i - 1],
          state.priorities[i],
        ];
        setStorageModulePriorities(state.priorities);
      });
    },
    priorities: initPriorities,
    setPriorities: (ids) =>
      set((state) => {
        state.priorities = ids;
        setStorageModulePriorities(ids);
      }),
  };
};

export const useModuleStore = create<State>()(immer(store));
