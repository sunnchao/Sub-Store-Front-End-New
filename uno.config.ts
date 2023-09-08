// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      'primary-light': '#18A058',
      'primary-dark': '#63E2B7',
      'text-1': '#181818',
      'text-2': '#303133',
      'text-3': '#606266',
      'text-4': '#C0C4CC',
    },
  },
  presets: [presetUno(), presetIcons()],
});
