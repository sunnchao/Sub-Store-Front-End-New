import H5NotFound from '../pages/h5/Error/NotFound.vue';
import H5Home from '../pages/h5/Home/Home.vue';
import H5Sub from '../pages/h5/Sub/Sub.vue';
import PCNotFound from '../pages/pc/Error/NotFound.vue';
import PCHome from '../pages/pc/Home/Home.vue';
import PCSub from '../pages/pc/Sub/Sub.vue';

type Components = {
  home: any
  sub: any
  error: {
    notFound: any
  }
};

const pcComponents: Components = {
  home: PCHome,
  sub: PCSub,
  error: {
    notFound: PCNotFound,
  },
};
const h5Components: Components = {
  home: H5Home,
  sub: H5Sub,
  error: {
    notFound: H5NotFound,
  },
};

export const getRouteComponent = ({ obj, keys }: { obj?: Record<string, any>;keys: string[] }): any => {
  if (!obj) {
    obj = window.innerWidth < 768 ? h5Components : pcComponents;
  }
  if (keys.length === 1) {
    return obj[keys[0]];
  } else {
    return getRouteComponent({ obj: obj[keys[0]], keys: keys.slice(1) });
  }
};
