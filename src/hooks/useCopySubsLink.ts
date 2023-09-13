import { useClipboard } from '@vueuse/core';
import { storeToRefs } from 'pinia';

import { useSubscriptionStore } from '../store/useSubscriptionStore.ts';
import { useAppMessage } from './useAppMessage.tsx';
import { useBackendApiUrl } from './useBackendApiUrl.ts';

const queryMap: Record<Utils.ProxyTools, string> = {
  universal: '',
  clash: 'Clash',
  clashMeta: 'ClashMeta',
  v2ray: 'V2Ray',
  surge: 'Surge',
  qx: 'QX',
  loon: 'Loon',
  shadowrocket: 'ShadowRocket',
  stash: 'Stash',
};

export const useCopySubsLink = () => {
  const { subs, collections } = storeToRefs(useSubscriptionStore());
  const { showAppMessage } = useAppMessage();
  const { currentApi } = useBackendApiUrl();
  const { copy } = useClipboard({ legacy: true });

  type Props = {
    proxyTool?: Utils.ProxyTools
    type: Components.SubType
    name: string
  };

  const getLink = (props: Props) => {
    const { proxyTool = 'universal', type, name } = props;

    if (!currentApi.value) {
      showAppMessage({
        type: 'error',
        message: '后端 API 地址无效！请检查后端',
      });
      return;
    }

    const base = `${currentApi.value.url}/download${
      type === 'collection' ? '/collection' : ''
    }`;

    let link = `${base}/${name}`;
    const query = queryMap[proxyTool];
    if (proxyTool !== 'universal' && query) {
      link += `?target=${query}`;
    }

    return link;
  };

  const copyLink = async (props: Props) => {
    const { proxyTool = 'universal', type, name } = props;

    const link = getLink(props);
    if (!link) return;

    const copyText = encodeURI(link);

    await copy(copyText).catch((e) => {
      showAppMessage({
        type: 'error',
        message: `复制失败！Error: ${e}`,
      });
    });

    let displayName: string | undefined;
    if (type === 'collection') {
      displayName = collections.value.find(c => c.name === name)?.displayName;
    } else {
      displayName = subs.value.find(s => s.name === name)?.displayName;
    }

    showAppMessage({
      type: 'success',
      message: `复制【${displayName ?? '未知'}】${
        `${queryMap[proxyTool]} ` || '通用'
      }订阅链接成功！`,
    });
  };

  return {
    getLink,
    copyLink,
  };
};
