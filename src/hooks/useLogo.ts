import { useOsTheme } from 'naive-ui';
import { computed } from 'vue';

import darkLogo from '../assets/images/logo/dark.svg?url';
import darkRoundedLogo from '../assets/images/logo/dark_rounded.svg?url';
import darkShapeLogo from '../assets/images/logo/dark_shape.svg?url';
import lightLogo from '../assets/images/logo/light.svg?url';
import lightRoundedLogo from '../assets/images/logo/light_rounded.svg?url';
import lightShapeLogo from '../assets/images/logo/light_shape.svg?url';

export const useLogo = () => {
  const theme = useOsTheme();

  const appLogo = computed(() =>
    theme.value === 'dark' ? darkLogo : lightLogo,
  );
  const appRoundedLogo = computed(() =>
    theme.value === 'dark' ? darkRoundedLogo : lightRoundedLogo,
  );
  const appShapeLogo = computed(() =>
    theme.value === 'dark' ? darkShapeLogo : lightShapeLogo,
  );

  return {
    appLogo: {
      normal: appLogo,
      rounded: appRoundedLogo,
      shape: appShapeLogo,
    },
  };
};
