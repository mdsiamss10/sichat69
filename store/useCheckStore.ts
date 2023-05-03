import create from "zustand";

interface CheckState {
  checked: boolean;
  toggle: () => void;
}

const useStore = create<CheckState>((set) => ({
  checked: false,
  toggle: () =>
    set((state) => ({
      checked: !state.checked,
    })),
}));

export default useStore;
