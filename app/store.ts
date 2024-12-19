import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  theme: string;
  themeDark: () => void;
  themeLight: () => void;
};

type AuthStore = {
  currentAuth: boolean;
  currentAuthId: string;
  currentAuthImg: string | null;
  currentAuthEmail: string | null;
  currentAuthDisplayName: string | null;
  currentOff: (id: string, img: string, email: string, name: string) => void;
  currentOn: (
    id: string,
    img: string | null,
    email: string | null,
    name: string | null
  ) => void;
};

// type ThemePersist = PersistOptions<ThemeStore>;

export const useThemeStore = create<
  ThemeStore,
  [["zustand/persist", ThemeStore]]
>(
  persist(
    (set) => ({
      theme: "dark",
      themeDark: () => {
        set({ theme: "dark" });
      },
      themeLight: () => {
        set({ theme: "light" });
      },
    }),
    {
      name: "theme-store",
    }
  )
);

export const useAuthStore = create<AuthStore, [["zustand/persist", AuthStore]]>(
  persist(
    (set) => ({
      currentAuth: false,
      currentAuthId: "",
      currentAuthImg: "",
      currentAuthEmail: "",
      currentAuthDisplayName: "",
      currentOff: () => {
        set({
          currentAuth: false,
          currentAuthId: "",
          currentAuthImg: "",
          currentAuthEmail: "",
          currentAuthDisplayName: "",
        });
      },
      currentOn: (id, img, email, name) => {
        set({
          currentAuth: true,
          currentAuthId: id,
          currentAuthImg: img,
          currentAuthEmail: email,
          currentAuthDisplayName: name,
        });
      },
    }),
    {
      name: "auth-store", // unique name for the storage
    }
  )
);

// const currentTheme = useThemeStore((state) => state.theme)
// const currentAuth = useAuthStore((state) => state.currentAuth)
