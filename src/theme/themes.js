/**
 * Theme definitions.
 *
 * Each theme is split in two halves:
 *
 *   - `palette`  CSS custom properties applied to <html data-theme>.
 *                These drive every pixel of the document.
 *   - `scene`    parameters handed to the WebGL scene. The sphere stays
 *                iridescent in all of them; only the surrounding light,
 *                fog and ground tint change, so the iridescence never
 *                gets washed out.
 *
 * Tone mapping exposure is per-theme because a near-black scene and a
 * warm off-white one need very different headroom.
 */

export const DEFAULT_THEME_ID = 'midnight'

export const THEMES = [
  {
    id: 'midnight',
    label: 'Midnight',
    scheme: 'dark',
    swatch: '#0b0b10',
    palette: {
      void: '#000000',
      ink: '#f1f3f7',
      inkSoft: '#b4bac4',
      inkMute: '#838a95',
      line: 'rgba(255, 255, 255, 0.12)',
      accent: '#7ee8ff',
    },
    scene: {
      background: '#000000',
      fogNear: 12,
      fogFar: 32,
      exposure: 1.02,
      ambient: { color: '#0d1c26', intensity: 0.14 },
      key: { color: '#dcecff', intensity: 1.35 },
      rimLeft: { color: '#4fd8ff', intensity: 9 },
      rimRight: { color: '#ff6fd6', intensity: 6 },
      back: { color: '#8fb9ff', intensity: 7 },
      env: {
        key: '#ffffff',
        keyIntensity: 3.4,
        left: '#63e6ff',
        leftIntensity: 2.6,
        right: '#ff7ae0',
        rightIntensity: 2.1,
        under: '#9d7bff',
        underIntensity: 1.1,
        mint: '#8fffd4',
        mintIntensity: 0.7,
      },
      sphere: { color: '#f6f7fb', envMapIntensity: 1.15, roughness: 0.22 },
      ground: { color: '#5a6875', metalness: 0.42, roughness: 0.74, envMapIntensity: 0.4 },
    },
  },

  {
    id: 'pearl',
    label: 'Pearl',
    scheme: 'light',
    swatch: '#e9e3d8',
    palette: {
      void: '#f1ede5',
      ink: '#16150f',
      inkSoft: '#4c4941',
      inkMute: '#726e64',
      line: 'rgba(22, 21, 15, 0.16)',
      accent: '#8a5a2b',
    },
    scene: {
      background: '#f1ede5',
      fogNear: 11,
      fogFar: 30,
      exposure: 0.94,
      ambient: { color: '#fff8ec', intensity: 0.75 },
      key: { color: '#fffaf0', intensity: 1.1 },
      rimLeft: { color: '#9fc9e8', intensity: 3.2 },
      rimRight: { color: '#e2a8cf', intensity: 2.4 },
      back: { color: '#cfd9e6', intensity: 2.6 },
      env: {
        key: '#fffdf8',
        keyIntensity: 3.8,
        left: '#bcdcf2',
        leftIntensity: 2.2,
        right: '#f0c2dd',
        rightIntensity: 1.9,
        under: '#e8dcc8',
        underIntensity: 1.6,
        mint: '#d9ecd8',
        mintIntensity: 0.6,
        // A black shell would kill the fill in a light theme.
        shell: false,
      },
      // Slightly deeper than the page so the silhouette still reads.
      sphere: { color: '#ded7cb', envMapIntensity: 1.0, roughness: 0.24 },
      ground: { color: '#8c857a', metalness: 0.2, roughness: 0.82, envMapIntensity: 0.5 },
    },
  },

  {
    id: 'ocean',
    label: 'Ocean',
    scheme: 'dark',
    swatch: '#061021',
    palette: {
      void: '#050b16',
      ink: '#e6f1f8',
      inkSoft: '#a2b8c9',
      inkMute: '#6d8397',
      line: 'rgba(150, 200, 230, 0.18)',
      accent: '#63c8e8',
    },
    scene: {
      background: '#050b16',
      fogNear: 12,
      fogFar: 33,
      exposure: 1.0,
      ambient: { color: '#0b2233', intensity: 0.22 },
      key: { color: '#cfe6ff', intensity: 1.25 },
      rimLeft: { color: '#3fb6e8', intensity: 9 },
      rimRight: { color: '#6f8cf0', intensity: 6.5 },
      back: { color: '#2f6fa8', intensity: 7 },
      env: {
        key: '#ffffff',
        keyIntensity: 3.2,
        left: '#3fb6e8',
        leftIntensity: 3.0,
        right: '#8f7cf5',
        rightIntensity: 2.2,
        under: '#2b5f8c',
        underIntensity: 1.2,
        mint: '#7fe0d0',
        mintIntensity: 0.8,
      },
      sphere: { color: '#eef6fb', envMapIntensity: 1.1, roughness: 0.2 },
      ground: { color: '#3d5768', metalness: 0.4, roughness: 0.76, envMapIntensity: 0.45 },
    },
  },

  {
    id: 'forest',
    label: 'Forest',
    scheme: 'dark',
    swatch: '#0a120d',
    palette: {
      void: '#090d0b',
      ink: '#e8eee9',
      inkSoft: '#a5b2a8',
      inkMute: '#76837b',
      line: 'rgba(180, 220, 190, 0.16)',
      accent: '#9fc7a8',
    },
    scene: {
      background: '#090d0b',
      fogNear: 12,
      fogFar: 32,
      exposure: 1.0,
      ambient: { color: '#152219', intensity: 0.2 },
      key: { color: '#e9f2e6', intensity: 1.3 },
      rimLeft: { color: '#7fc9a0', intensity: 7.5 },
      rimRight: { color: '#c8d98f', intensity: 4.5 },
      back: { color: '#6f9c86', intensity: 6 },
      env: {
        key: '#ffffff',
        keyIntensity: 3.3,
        left: '#84d3a8',
        leftIntensity: 2.4,
        right: '#cfe08f',
        rightIntensity: 1.7,
        under: '#4f7a62',
        underIntensity: 1.2,
        mint: '#a9e6c8',
        mintIntensity: 0.9,
      },
      sphere: { color: '#f2f6f1', envMapIntensity: 1.1, roughness: 0.22 },
      ground: { color: '#4c5c50', metalness: 0.35, roughness: 0.78, envMapIntensity: 0.4 },
    },
  },

  {
    id: 'violet',
    label: 'Violet',
    scheme: 'dark',
    swatch: '#120d1c',
    palette: {
      void: '#0b0910',
      ink: '#eee9f5',
      inkSoft: '#b2a9c2',
      inkMute: '#7f7692',
      line: 'rgba(190, 170, 230, 0.17)',
      accent: '#b79ce6',
    },
    scene: {
      background: '#0b0910',
      fogNear: 12,
      fogFar: 32,
      exposure: 1.02,
      ambient: { color: '#1c152c', intensity: 0.2 },
      key: { color: '#f0e9ff', intensity: 1.3 },
      rimLeft: { color: '#a98cf0', intensity: 8 },
      rimRight: { color: '#e87fc4', intensity: 5.5 },
      back: { color: '#7a5fc4', intensity: 6.5 },
      env: {
        key: '#ffffff',
        keyIntensity: 3.3,
        left: '#b79ce6',
        leftIntensity: 2.8,
        right: '#f090d0',
        rightIntensity: 2.0,
        under: '#5a4490',
        underIntensity: 1.3,
        mint: '#9fe8d4',
        mintIntensity: 0.5,
      },
      sphere: { color: '#f6f2fb', envMapIntensity: 1.15, roughness: 0.2 },
      ground: { color: '#5b5470', metalness: 0.4, roughness: 0.75, envMapIntensity: 0.42 },
    },
  },
]

const BY_ID = new Map(THEMES.map((theme) => [theme.id, theme]))

export function getTheme(id) {
  return BY_ID.get(id) ?? BY_ID.get(DEFAULT_THEME_ID)
}
