import { create } from "zustand";

type ThemeStore = {
  theme: string;
  themeDark: () => void;
  themeLight: () => void;
};

type AuthStore = {
  currentAuth: boolean;
  currentOff: () => void;
  currentOn: () => void;
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

export const useAuthStore = create<AuthStore>((set) => ({
  currentAuth: false,
  currentOff: () => {
    set({ currentAuth: false });
  },
  currentOn: () => {
    set({ currentAuth: true });
  },
}));

// const currentTheme = useThemeStore((state) => state.theme)
// const currentAuth = useAuthStore((state) => state.currentAuth)
