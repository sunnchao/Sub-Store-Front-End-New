// 扩展 window 类型
import { MessageApiInjection } from "naive-ui/es/message/src/MessageProvider";

declare global {
  interface Window {
    $pcMessage: MessageApiInjection;
  }
}
