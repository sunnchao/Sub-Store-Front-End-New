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

  <n-modal
    v-model:show="manageBackendModalIsVisible"
    :style="{ width: '600px' }"
    title="管理后端"
    size="large"
    :bordered="false"
    preset="card"
    :segmented="{ content: 'soft', footer: 'soft' }"
  >
    <ul
      v-if="backendApis.filter((sub) => sub.name !== '默认').length > 0"
      class="max-h-[400px] overflow-auto pr-[16px]"
    >
      <li
        v-for="api in backendApis.filter((sub) => sub.name !== '默认')"
        :key="api.name"
      >
        <div>
          <h2 class="flex items-center justify-between text-[16px]">
            <span>
              {{ api.name }}
              <n-tag
                v-if="api.name === currentApi.name"
                type="primary"
                size="small"
              >当前</n-tag>
            </span>

            <n-popconfirm
              positive-text="删除"
              :positive-button-props="{ type: 'error' }"
              negative-text="取消"
              @positive-click="removeApi(api.name)"
            >
              <template #trigger>
                <n-button size="small" text type="error">
                  删除
                </n-button>
              </template>
              确认删除后端 {{ api.name }} 吗？
            </n-popconfirm>
          </h2>
          <n-ellipsis
            class="max-w-[520px] text-[12px] text-text-quaternary-light dark:text-text-quaternary-dark"
          >
            {{ api.url }}
          </n-ellipsis>
        </div>
        <n-divider :style="{ marginTop: '8px', marginBottom: '16px' }" />
      </li>
    </ul>
    <div
      v-else
      class="h-[120px] flex items-center justify-center text-text-tertiary-light dark:text-text-tertiary-dark"
    >
      暂未添加自定义后端
    </div>
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
        <div
          v-if="env"
          class="aspect-1 w-[40px] flex items-center justify-center opacity-72 filter-brightness-0 dark:filter-brightness-100 dark:filter-saturate-0"
        >
          <img :src="env.logo" alt="logo">
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
        {{ currentApi.url }}
      </n-ellipsis>

      <n-divider :style="{ marginTop: '16px', marginBottom: '12px' }" />

      <NPopselect
        ref="popSelect"
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
          <n-space>
            <n-button text block @click="handleClickAddBackend">
              <template #icon>
                <i class="i-carbon-add block" />
              </template>
              新增
            </n-button>
            <n-divider vertical />
            <n-button text block @click="handleClickManageBackend">
              <template #icon>
                <i class="i-carbon-settings block text-[14px]" />
              </template>
              管理
            </n-button>
          </n-space>
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

import { useApi } from '../../hooks/useApi.ts';
import { useAppMessage } from '../../hooks/useAppMessage.tsx';
import { useBackendApiUrl } from '../../hooks/useBackendApiUrl.ts';
import { useRequest } from '../../hooks/useRequest.ts';
import { useAppStore } from '../../store/useAppStore.ts';

const { currentApi, backendApis, setCurrentApi, addApi, removeApi }
  = useBackendApiUrl();
const { env } = storeToRefs(useAppStore());
const { setEnv } = useAppStore();
const { utilsApi } = useApi();

useRequest(() => utilsApi.getEnv(), {
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

const popSelect = ref<any>(null);
const addBackendModalIsVisible = ref(false);
const manageBackendModalIsVisible = ref(false);
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
  popSelect.value?.setShow(false);
  addBackendModalIsVisible.value = true;
};
const handleClickManageBackend = () => {
  popSelect.value?.setShow(false);
  manageBackendModalIsVisible.value = true;
};

const { showAppMessage } = useAppMessage();
const handleSubmitAddBackend = () => {
  formRef.value?.validate().then(async () => {
    const loading = showAppMessage({
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
