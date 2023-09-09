// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      primary: {
        light: '#18A058',
        dark: '#63E2B7',
      },
      text: {
        primary: {
          light: '#181818',
          dark: '#FFFFFFF0',
        },
        secondary: {
          light: '#303133',
          dark: '#FFFFFFB3',
        },
        tertiary: {
          light: '#606266',
          dark: '#FFFFFF66',
        },
        quaternary: {
          light: '#909399',
          dark: '#FFFFFF33',
        },
      },
      divider: {
        light: '#0001',
        dark: '#fff1',
      },
    },
  },
  presets: [presetUno(), presetIcons()],
});
