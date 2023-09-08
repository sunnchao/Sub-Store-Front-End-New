import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

type FormattedFlow = {
  flow: number
  unit: string
};
type Transform = (flow: number, index?: number) => FormattedFlow;
const transform: Transform = (flow, index = 0) => {
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (flow > 1024) {
    return transform(flow / 1024, index + 1);
  } else {
    return { flow, unit: unit[index] };
  }
};

type FormatFlow = {
  expires: Dayjs
  remainDays: number
  total: FormattedFlow
  usage: FormattedFlow
  remainFlow: FormattedFlow
};
export const formatFlow = (flow: Subscription.Flow): FormatFlow => {
  const { expires, total, usage } = flow;
  const expiresDate = dayjs.unix(expires);
  const remainDays = expiresDate.diff(new Date(), 'day');
  const totalUsage = usage.upload + usage.download;
  const remainFlow = transform(total - totalUsage);

  return {
    expires: expiresDate,
    remainDays,
    total: transform(total),
    usage: transform(totalUsage),
    remainFlow,
  };
};
