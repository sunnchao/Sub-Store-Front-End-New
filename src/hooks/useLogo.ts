import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';

import clashLogo from '../assets/images/logo/clash.png?url';
import clashMetaLogo from '../assets/images/logo/clash_meta.png?url';
import darkLogo from '../assets/images/logo/dark.svg?url';
import darkRoundedLogo from '../assets/images/logo/dark_rounded.svg?url';
import darkShapeLogo from '../assets/images/logo/dark_shape.svg?url';
import lightLogo from '../assets/images/logo/light.svg?url';
import lightRoundedLogo from '../assets/images/logo/light_rounded.svg?url';
import lightShapeLogo from '../assets/images/logo/light_shape.svg?url';
import loonLogo from '../assets/images/logo/loon.png?url';
import nodeLogo from '../assets/images/logo/node.svg?url';
import quanxLogo from '../assets/images/logo/quanx.png?url';
import shadowrocketLogo from '../assets/images/logo/shadowrocket.png?url';
import stashLogo from '../assets/images/logo/stash.png?url';
import surgeLogo from '../assets/images/logo/surge.png?url';
import v2rayLogo from '../assets/images/logo/v2ray.png?url';

export const useLogo = () => {
  const theme = useColorMode();

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
    toolLogo: {
      clash: clashLogo,
      clashMeta: clashMetaLogo,
      loon: loonLogo,
      quanx: quanxLogo,
      shadowrocket: shadowrocketLogo,
      stash: stashLogo,
      surge: surgeLogo,
      v2ray: v2rayLogo,
      node: nodeLogo,
    },
  };
};
