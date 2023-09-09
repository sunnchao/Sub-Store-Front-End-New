<template>
  <n-modal
    v-model:show="addBackendModalIsVisible"
    preset="card"
    :style="{ width: '600px' }"
    title="新增后端"
    size="large"
    :bordered="false"
    :segmented="{ content: 'soft', footer: 'soft' }"
  >
    <n-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      size="medium"
      label-placement="top"
    >
      <n-form-item label="后端名称" path="name">
        <n-input
          v-model:value="formData.name"
          placeholder="请输入后端名称"
          clearable
        />
      </n-form-item>
      <n-form-item label="后端地址" path="url">
        <n-input
          v-model:value="formData.url"
          placeholder="请输入后端地址"
          clearable
        />
      </n-form-item>
    </n-form>

    <template #footer>
      <div class="flex justify-end gap-x-[8px]">
        <n-button secondary @click="addBackendModalIsVisible = false">
          取消
        </n-button>
        <n-button
          type="success"
          :disabled="!formData.name || !formData.url"
          @click="handleSubmitAddBackend"
        >
          确定
        </n-button>
      </div>
    </template>
  </n-modal>

  <n-card
    embedded
    bordered
    size="small"
    class="rounded-[8px]"
    :content-style="{ width: '100%' }"
  >
    <div class="flex flex-col justify-center">
      <div class="flex items-center gap-x-[8px]">
        <div class="aspect-1 w-[40px]">
          <img :src="appLogo.shape.value" alt="logo">
        </div>
        <p
          v-if="env"
          class="flex flex-col gap-y-[4px] text-[12px] font-medium leading-[1] text-text-secondary-light dark:text-text-secondary-dark"
        >
          <span>{{ env.backend }}</span>
          <span>{{ env.version }}</span>
        </p>
        <p v-else>
          未连接到后端
        </p>
      </div>

      <n-ellipsis
        class="mt-[8px] text-[12px] text-text-quaternary-light dark:text-text-quaternary-dark"
      >
        {{ currentApi.url + currentApi.url }}
      </n-ellipsis>

      <n-divider :style="{ marginTop: '16px', marginBottom: '12px' }" />

      <NPopselect
        ref="popselect"
        :value="currentApi.name"
        trigger="click"
        :options="dropdownOptions"
        width="trigger"
        @update:value="handleBackendApiSelect"
      >
        <n-button text icon-placement="right" strong>
          {{ currentApi.name }}
          <template #icon>
            <i class="i-solar-alt-arrow-down-line-duotone block" />
          </template>
        </n-button>

        <template #action>
          <n-button text @click="handleClickAddBackend">
            <template #icon>
              <i class="i-carbon-add block" />
            </template>
            新增后端
          </n-button>
        </template>
      </NPopselect>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { FormInst, FormItemRule } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import { useBackendApiUrl } from '../../hooks/useBackendApiUrl.ts';
import { useLogo } from '../../hooks/useLogo.ts';
import { useMessage } from '../../hooks/useMessage.tsx';
import { useRequest } from '../../hooks/useRequest.ts';
import { useResponsiveRequestData } from '../../hooks/useResponsiveRequestData.ts';
import { useAppStore } from '../../store/useAppStore.ts';

const { appLogo } = useLogo();

const { currentApi, backendApis, setCurrentApi, addApi } = useBackendApiUrl();
const { env } = storeToRefs(useAppStore());
const { setEnv } = useAppStore();
const { utilsApi } = useRequest();

useResponsiveRequestData(() => utilsApi.getEnv(), {
  onSucceed: d => setEnv(d),
});

const dropdownOptions = computed(() => {
  return backendApis.value.map(api => ({
    label: api.name,
    value: api.name,
  }));
});

const handleBackendApiSelect = (value: string) => {
  if (value === currentApi.value.name) return;
  setCurrentApi(value);
};

const popselect = ref<any>(null);
const addBackendModalIsVisible = ref(false);
const formRef = ref<FormInst | null>(null);
const formData = ref<Settings.BackendApi>({
  name: '',
  url: '',
});
const formRules = {
  name: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: '后端名称不能为空',
    },
    {
      validator(_: FormItemRule, value: string) {
        return !backendApis.value.some(api => api.name === value);
      },
      trigger: ['blur', 'input'],
      message: '后端名称不能重复',
    },
  ],
  url: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: '后端名称不能为空',
    },
  ],
};
const handleClickAddBackend = () => {
  popselect.value?.setShow(false);
  addBackendModalIsVisible.value = true;
};

const { showMessage } = useMessage();
const handleSubmitAddBackend = () => {
  formRef.value?.validate().then(async () => {
    const loading = showMessage({
      type: 'loading',
      message: '正在验证后端地址',
      duration: 0,
    })!;

    const { url } = formData.value;
    axios
      .get(`${url}/api/utils/env`)
      .then((res) => {
        if (res.status === 200 && res.data.data.backend) {
          addApi(formData.value);
          loading.type = 'success';
          loading.content = '后端新增成功！';
          addBackendModalIsVisible.value = false;
          formData.value = {
            name: '',
            url: '',
          };
        }
      })
      .catch(() => {
        loading.type = 'error';
        loading.content = '后端验证失败！请检查后端地址是否正确';
      })
      .finally(() => {
        setTimeout(() => {
          loading.destroy();
        }, 2000);
      });
  });
};
</script>
