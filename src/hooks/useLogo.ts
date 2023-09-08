import darkLogo from '../assets/images/logo/dark.svg?url';
import darkRoundedLogo from '../assets/images/logo/dark_rounded.svg?url';
import darkShapeLogo from '../assets/images/logo/dark_shape.svg?url';
import lightLogo from '../assets/images/logo/light.svg?url';
import lightRoundedLogo from '../assets/images/logo/light_rounded.svg?url';
import lightShapeLogo from '../assets/images/logo/light_shape.svg?url';

export const useLogo = () => {
  return {
    logo: {
      dark: darkLogo,
      light: lightLogo,
      darkRounded: darkRoundedLogo,
      lightRounded: lightRoundedLogo,
      darkShape: darkShapeLogo,
      lightShape: lightShapeLogo,
    },
  };
};
