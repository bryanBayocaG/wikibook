import { create } from "zustand";

type ThemeStore = {
  theme: string;
  themeDark: () => void;
  themeLight: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "dark",
  themeDark: () => {
    set({ theme: "dark" });
  },
  themeLight: () => {
    set({ theme: "light" });
  },
}));
