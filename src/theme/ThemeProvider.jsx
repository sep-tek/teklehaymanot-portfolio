import { useCallback, useEffect, useMemo, useState } from 'react'
import { THEMES } from './themes'
import { ThemeContext, persistTheme, readStoredTheme } from './themeContext'

/**
 * Holds the active theme, mirrors it onto <html data-theme> so CSS reacts,
 * and persists the choice in localStorage.
 */
export default function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(readStoredTheme)

  const theme = useMemo(
    () => THEMES.find((entry) => entry.id === themeId) ?? THEMES[0],
    [themeId],
  )

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme.id
    root.style.colorScheme = theme.scheme
  }, [theme.id, theme.scheme])

  const setTheme = useCallback((id) => {
    if (!THEMES.some((entry) => entry.id === id)) return
    setThemeId(id)
    persistTheme(id)
  }, [])

  const value = useMemo(
    () => ({ theme, themeId, setTheme, themes: THEMES }),
    [theme, themeId, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
