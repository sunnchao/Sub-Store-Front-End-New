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
      options.duration && (opt.duration = options.duration);

      switch (options.type) {
        case 'info':
          window.$pcMessage.info(options.message, opt);
          break;
        case 'error':
          window.$pcMessage.error(options.message, opt);
          break;
        case 'warning':
          window.$pcMessage.warning(options.message, opt);
          break;
        case 'success':
          window.$pcMessage.success(options.message, opt);
          break;
        case 'loading':
          window.$pcMessage.loading(options.message, opt);
          break;
      }
    } else {
      alert(options.message);
    }
  };

  return { showMessage };
};
