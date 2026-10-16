import { createContext, useContext } from 'react'
import { DEFAULT_THEME_ID, THEMES, getTheme } from './themes'

export const STORAGE_KEY = 'teklehaymanot:theme'

export const ThemeContext = createContext(null)

/** Reads the persisted choice, falling back to the default. */
export function readStoredTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return THEMES.some((theme) => theme.id === stored) ? stored : DEFAULT_THEME_ID
  } catch {
    // Private browsing or blocked storage.
    return DEFAULT_THEME_ID
  }
}

export function persistTheme(id) {
  try {
    window.localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // Storage unavailable — the theme still applies for this session.
  }
}

/**
 * Lives in its own module (not alongside the provider component) so that
 * files exporting components stay Fast Refresh friendly.
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside a ThemeProvider')
  return context
}

export { getTheme }
