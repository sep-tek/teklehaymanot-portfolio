import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown, Palette } from 'lucide-react'
import { useTheme } from '../../theme/themeContext'
import './themeSwitcher.css'

/**
 * Swatches are two-tone — surface plus accent — because four of the five
 * backgrounds are near-black and would be indistinguishable as flat dots.
 */
function swatchStyle(theme) {
  return {
    background: theme.swatch,
    boxShadow: `inset 0 0 0 1px ${theme.palette.line}, inset -3px -3px 0 -1.5px ${theme.palette.accent}`,
  }
}

/**
 * Compact theme control.
 *
 * Implemented as a listbox popover rather than a `<select>` so it can carry
 * swatches, but the keyboard contract is the same: Enter/Space/ArrowDown
 * opens, arrows move between options, Enter selects, Escape closes and
 * returns focus to the trigger.
 */
export default function ThemeSwitcher() {
  const { theme, themeId, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const root = useRef(null)
  const trigger = useRef(null)
  const list = useRef(null)
  const listboxId = useId()

  const close = useCallback(({ restoreFocus = true } = {}) => {
    setOpen(false)
    if (restoreFocus) trigger.current?.focus()
  }, [])

  // Dismiss on outside pointer press.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (root.current && !root.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Escape closes; Tab out also closes.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  const focusOption = (index) => {
    const options = list.current?.querySelectorAll('[role="option"]')
    if (!options?.length) return
    const wrapped = (index + options.length) % options.length
    options[wrapped].focus()
  }

  const onTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      // Focus the active option once the popover has rendered.
      requestAnimationFrame(() => {
        const options = list.current?.querySelectorAll('[role="option"]')
        const index = themes.findIndex((entry) => entry.id === themeId)
        options?.[event.key === 'ArrowUp' ? options.length - 1 : index]?.focus()
      })
    }
  }

  const onListKeyDown = (event) => {
    const options = list.current?.querySelectorAll('[role="option"]')
    const current = options ? [...options].indexOf(event.target) : -1

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusOption(current + 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        focusOption(current - 1)
        break
      case 'Home':
        event.preventDefault()
        focusOption(0)
        break
      case 'End':
        event.preventDefault()
        focusOption((options?.length ?? 1) - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (event.target.dataset.themeId) {
          setTheme(event.target.dataset.themeId)
          close()
        }
        break
      default:
        break
    }
  }

  return (
    <div className="theme-switcher" ref={root}>
      <button
        ref={trigger}
        type="button"
        className="theme-switcher__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
      >
        <Palette className="theme-switcher__icon" size={13} strokeWidth={1.7} aria-hidden="true" />
        <span className="theme-switcher__swatch" style={swatchStyle(theme)} aria-hidden="true" />
        <span className="theme-switcher__label">{theme.label}</span>
        <ChevronDown
          className={`theme-switcher__chevron ${open ? 'is-open' : ''}`}
          size={12}
          strokeWidth={2}
          aria-hidden="true"
        />
        <span className="sr-only">— change theme</span>
      </button>

      {open && (
        <ul
          ref={list}
          id={listboxId}
          className="theme-switcher__list"
          role="listbox"
          aria-label="Colour theme"
          aria-activedescendant={`${listboxId}-${themeId}`}
          onKeyDown={onListKeyDown}
        >
          {themes.map((entry) => {
            const selected = entry.id === themeId
            return (
              <li
                key={entry.id}
                id={`${listboxId}-${entry.id}`}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                data-theme-id={entry.id}
                className={`theme-switcher__option ${selected ? 'is-selected' : ''}`}
                onClick={() => {
                  setTheme(entry.id)
                  close()
                }}
              >
                <span className="theme-switcher__option-swatch" style={swatchStyle(entry)} aria-hidden="true" />
                <span className="theme-switcher__option-label">{entry.label}</span>
                {selected && <Check size={12} strokeWidth={2.4} aria-hidden="true" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
