import { useScreen } from './useScreen.ts';

type MessageType = 'info' | 'error' | 'warning' | 'success' | 'loading';
type MessageOptions = {
  type: MessageType
  message: string
  duration?: number
};
export const useMessage = () => {
  const { isPc } = useScreen();

  const showMessage = (options: MessageOptions) => {
    if (isPc) {
      const opt: { duration?: number } = {};
      options.duration !== undefined && (opt.duration = options.duration);

      switch (options.type) {
        case 'info':
          return window.$pcMessage.info(options.message, opt);
        case 'error':
          return window.$pcMessage.error(options.message, opt);
        case 'warning':
          return window.$pcMessage.warning(options.message, opt);
        case 'success':
          return window.$pcMessage.success(options.message, opt);
        case 'loading':
          return window.$pcMessage.loading(options.message, opt);
      }
    } else {
      window.alert(options.message);
    }
  };

  return { showMessage };
};
