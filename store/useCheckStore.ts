import { create } from "zustand";

interface CheckState {
  checked: boolean;
  toggle: () => void;
  unCheckChecked: () => void;
}

const useStore = create<CheckState>((set) => ({
  checked: false,
  toggle: () =>
    set((state) => ({
      checked: !state.checked,
    })),
  unCheckChecked: () =>
    set(() => ({
      checked: false,
    })),
}));

export default useStore;
