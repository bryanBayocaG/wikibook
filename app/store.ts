import { create } from "zustand";

type ThemeStore = {
  theme: string;
  themeDark: () => void;
  themeLight: () => void;
};

type AuthStore = {
  currentAuth: boolean;
  currentAuthId: string;
  currentOff: () => void;
  currentOn: (id: string) => void;
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
  currentAuthId: "",
  currentOff: () => {
    set({ currentAuth: false, currentAuthId: "" });
  },
  currentOn: (id) => {
    set({ currentAuth: true, currentAuthId: id });
  },
}));

// const currentTheme = useThemeStore((state) => state.theme)
// const currentAuth = useAuthStore((state) => state.currentAuth)
