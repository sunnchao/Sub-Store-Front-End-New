import { getData } from '../utils/service';
import { useScreen } from './useScreen';

export const useRequest = () => {
  const { isPc } = useScreen();

  const onerror = (err: APIRes.Error['error']) => {
    if (isPc.value) {
      window.$pcMessage.error(err.message);
    } else {
      console.log('mobile err: ', err);
    }
  };

  const subApi = {
    getFlow: (name: string) =>
      getData<Subscription.Flow>(`/api/sub/flow/${name}`, { onError: onerror }),
  };

  return {
    subApi,
  };
};
