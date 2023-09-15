<template>
  <div>
    <LoadingAndError :loading="loading" :error="error" />

    <template v-if="props.data">
      <PCModuleForm
        :loading="loading"
        :default-value="form"
        @change-parsed="(v) => (isParsed = v)"
        @submit="changeFormData"
      />

      <n-divider />

      <PCModuleDetail is-edit :info="parsedData" @submit="update" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import PCModuleDetail from '../../../../components/pc/Modules/PCModuleDetail.vue';

const props = defineProps<{
  loading: boolean
  data?: Modules.BackendModule & { content: string }
  error: string
}>();
const emits = defineEmits<{
  (event: 'updateModule', data: Modules.PostInfo): void
}>();

const form = ref<Modules.Form>({
  moduleType: 'local',
  displayName: '',
  localContent: '',
  remoteContent: '',
  url: '',
});

const isParsed = ref(true);
const parsedData = ref<Modules.PostInfo | undefined>(undefined);

const changeFormData = (data: Modules.PostInfo) => {
  parsedData.value = data;
  isParsed.value = true;
};

const update = () => {
  if (!parsedData.value) return;
  emits('updateModule', parsedData.value);
};

const stop = watchEffect(() => {
  if (!props.loading && !props.error && props.data) {
    const moduleType = props.data.url ? 'remote' : 'local';
    const content = props.data.content;
    form.value = {
      moduleType,
      displayName: props.data.displayName,
      localContent: moduleType === 'local' ? content : '',
      remoteContent: moduleType === 'remote' ? content : '',
      url: props.data.url ?? '',
    };

    const { name, ...rest } = props.data;
    parsedData.value = rest;
    stop();
  }
});
</script>
