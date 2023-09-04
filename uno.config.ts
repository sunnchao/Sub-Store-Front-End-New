// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      'primary': '#1784FC',
      'primary-lighter': '#4AA0FF',
      'primary-darker': '#0B5FB9',
      'text-1': '#181818',
      'text-2': '#303133',
      'text-3': '#606266',
      'text-4': '#C0C4CC',
    },
  },
  presets: [presetUno(), presetIcons()],
});
