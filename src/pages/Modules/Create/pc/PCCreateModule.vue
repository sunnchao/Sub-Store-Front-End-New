<template>
  <div>
    <PCModuleForm
      :loading="false"
      :default-value="form"
      @change-parsed="(v) => (isParsed = v)"
      @submit="submitForm"
    />

    <n-divider />

    <PCModuleDetail :info="parsedData" @submit="addModule" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import PCModuleDetail from '../../../../components/pc/Modules/PCModuleDetail.vue';
import { useApi } from '../../../../hooks/useApi.ts';
import { useAppMessage } from '../../../../hooks/useAppMessage.tsx';

const { showAppMessage } = useAppMessage();
const { moduleApi } = useApi();

const form = ref<Modules.Form>({
  moduleType: 'remote',
  displayName: '',
  url: '',
  localContent: '',
  remoteContent: '',
});
const isParsed = ref(false);
const parsedData = ref<Modules.PostInfo | undefined>(undefined);
const submitForm = (data: Modules.PostInfo) => {
  parsedData.value = data;
  isParsed.value = true;
};

const router = useRouter();
const addModule = async () => {
  if (!parsedData.value) return;
  // const text = CONSTANTS.testText;
  // const json = moduleParser(text);
  const loading = showAppMessage({
    type: 'loading',
    message: '正在添加模块...',
  })!;

  await moduleApi.createModule(parsedData.value).catch(() => loading.destroy());

  router.push('/modules');
  loading.type = 'success';
  loading.content = '创建模块成功！';
  setTimeout(() => loading.destroy(), 1500);
};
</script>
