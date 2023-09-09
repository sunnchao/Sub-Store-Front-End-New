// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  shortcuts: [
    {
      'pc-secondary-title':
        'text-[18px] font-bold text-text-secondary-light dark:text-text-secondary-dark',
    },
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
          dark: '#FFFFFFD0',
        },
        tertiary: {
          light: '#606266',
          dark: '#FFFFFFB0',
        },
        quaternary: {
          light: '#909399',
          dark: '#FFFFFF90',
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
