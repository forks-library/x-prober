import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  isOpen: boolean;
  msg: string;
  timerId: number | null;
  setMsg: (msg: string) => void;
  open: (msg?: string) => void;
  close: (delaySeconds?: number) => void;
};
const createStore: StateCreator<State, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  close: (delaySeconds = 0) => {
    const currentTimerId = get().timerId;
    if (currentTimerId) {
      clearTimeout(currentTimerId);
    }
    if (delaySeconds === 0) {
      set((state) => {
        state.isOpen = false;
        state.timerId = null;
      });
      return;
    }
    const id = setTimeout(() => {
      set((state) => {
        state.isOpen = false;
        state.timerId = null;
      });
    }, delaySeconds * 1000);
    set((state) => {
      state.timerId = id;
    });
  },
  isOpen: false,
  msg: "",
  open: (msg) =>
    set((state) => {
      if (state.timerId) {
        clearTimeout(state.timerId);
      }
      state.isOpen = true;
      state.msg = msg ?? "";
      state.timerId = null;
    }),
  setMsg: (msg) =>
    set((state) => {
      state.msg = msg;
    }),
  timerId: null,
});
export const useToastStore = create<State>()(immer(createStore));
