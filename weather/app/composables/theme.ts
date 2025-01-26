interface ThemeState {
  name: string;
  class: string;
}

export const useTheme = () => {
  return useState<ThemeState>('theme', () => ({
    name: "zinc",
    class: "theme-zinc"
  }));
};
