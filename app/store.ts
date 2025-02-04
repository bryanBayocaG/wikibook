import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  themeIsDark: boolean;
  themeDark: () => void;
  themeLight: () => void;
};

type AuthStore = {
  currentAuth: boolean;
  currentAuthId: string;
  currentAuthImg: string | null;
  currentAuthEmail: string | null;
  currentAuthDisplayName: string | null;
  currentOff: () => void;
  currentOn: (
    id: string,
    img: string | null,
    email: string | null,
    name: string | null
  ) => void;
};

type Word = {
  id: string;
  name: string;
  definition: string;
};

type WordsState = {
  words: Word[];
  setWords: (words: Word[]) => void;
  addWord: (newWord: Word) => void;
  updateWord: (updatedWord: Word) => void;
  deleteWord: (id: string) => void;
  clearWords: () => void;
};

export const useThemeStore = create<
  ThemeStore,
  [["zustand/persist", ThemeStore]]
>(
  persist(
    (set) => ({
      themeIsDark: true,
      themeDark: () => {
        set({ themeIsDark: true });
      },
      themeLight: () => {
        set({ themeIsDark: false });
      },
    }),
    {
      name: "theme-store",
    }
  )
);

export const useWordsStore = create<
  WordsState,
  [["zustand/persist", WordsState]]
>(
  persist(
    (set) => ({
      words: [],
      setWords: (words) => set({ words }),
      addWord: (newWord) =>
        set((state) => ({
          words: [...state.words, newWord],
        })),
      updateWord: (updatedWord) =>
        set((state) => ({
          words: state.words.map((word) =>
            word.id === updatedWord.id ? updatedWord : word
          ),
        })),
      deleteWord: (id) =>
        set((state) => ({
          words: state.words.filter((word) => word.id !== id),
        })),
      clearWords: () => set({ words: [] }),
    }),
    {
      name: "words-store",
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
      name: "auth-store",
    }
  )
);

// const currentTheme = useThemeStore((state) => state.themeIsDark)
// const currentAuth = useAuthStore((state) => state.currentAuth)
