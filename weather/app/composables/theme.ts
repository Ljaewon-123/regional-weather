interface ThemeState {
  name: string;
  class: string;
}

export const useTheme = () => {
  const MAX_AGE_S = 60 * 60 * 24 * 365 * 3 // 3년, 초단위
  const currentTheme = useCookie<string>('theme', {
    maxAge: MAX_AGE_S 
  })
  const theme = useState<ThemeState>('theme', () => ({
    name: currentTheme.value || "zinc",
    class: `theme-${currentTheme.value}` || "theme-zinc"
  }))

  const setTheme = (name: string) => {
    theme.value.name = name
    theme.value.class = `theme-${name}`
    currentTheme.value = name
  }

  return {
    setTheme,
    theme
  }
};
