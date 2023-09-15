<template>
  <div>
    <n-form
      ref="formRef"
      v-model:model="formData"
      :label-width="80"
      :rules="rules"
      class="flex flex-col"
    >
      <div class="w-full flex gap-x-[16px]">
        <n-form-item label="模块类型" path="moduleType" class="shrink-0 grow-0">
          <n-radio-group v-model:value="formData.moduleType" name="left-size">
            <n-radio-button value="remote">
              远程
            </n-radio-button>
            <n-radio-button value="local">
              本地
            </n-radio-button>
          </n-radio-group>
        </n-form-item>

        <n-form-item
          label="显示名称"
          path="displayName"
          class="shrink-1 grow-1"
        >
          <n-input
            v-model:value="formData.displayName"
            placeholder="输入模块展示名称，用于识别"
          />
        </n-form-item>

        <n-form-item
          v-if="formData.moduleType === 'remote'"
          label="URL"
          path="url"
          class="shrink-1 grow-1"
        >
          <n-input
            v-model:value="formData.url"
            placeholder="输入远程脚本 Raw URL，以 http(s):// 开头"
          />
        </n-form-item>
      </div>

      <n-form-item
        v-if="formData.moduleType === 'local'"
        label="本地脚本内容"
        path="localContent"
      >
        <n-input
          v-model:value="formData.localContent"
          placeholder="请输入脚本内容"
          class="font-mono"
          type="textarea"
          :spellcheck="false"
          :autosize="{
            minRows: 8,
            maxRows: 16,
          }"
        />
      </n-form-item>
      <n-form-item v-else label="远程脚本内容" path="remoteContent">
        <n-card size="small" class="max-h-[400px] overflow-auto">
          <n-code
            v-if="formData.remoteContent"
            :style="{ fontSize: '12px', lineHeight: '1.7' }"
            :code="formData.remoteContent"
            language="javascript"
            show-line-numbers
          />
          <p
            v-else
            class="text-[14px] text-text-tertiary-light dark:text-text-tertiary-dark"
          >
            输入 URL 后点击解析会自动填入远程脚本内容
          </p>
        </n-card>
      </n-form-item>

      <n-button
        secondary
        attr-type="button"
        :loading="loading"
        @click="handleValidateClick"
      >
        解析
      </n-button>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { tryOnBeforeUnmount } from '@vueuse/core';
import axios from 'axios';
import type { FormInst, FormRules } from 'naive-ui';
import { ref, watch } from 'vue';

import { useAppMessage } from '../../../hooks/useAppMessage.tsx';
import { moduleParser } from '../../../utils/moduleParser.ts';

const props = defineProps<{
  defaultValue: Modules.Form
}>();
const emits = defineEmits<{
  (event: 'changeParsed', isParsed: boolean): void
  (event: 'submit', data: Modules.PostInfo): void
}>();

const loading = ref(false);
const formData = ref<Modules.Form>({ ...props.defaultValue });
const formRef = ref<FormInst | null>(null);
const rules: FormRules = {
  moduleType: {
    required: true,
    message: '请选择类型',
    trigger: ['change'],
  },
  displayName: {
    required: true,
    message: '请输入显示名称',
    trigger: ['change'],
  },
  url: [
    {
      required: true,
      message: '请输入URL',
      trigger: ['change'],
    },
    {
      message: 'URL 格式不合法',
      trigger: ['change'],
      pattern: /^https?:\/\/.+/,
    },
  ],
  localContent: {
    required: true,
    message: '请输入脚本内容',
    trigger: ['change'],
  },
};

const stop = watch(
  formData,
  () => {
    emits('changeParsed', false);
  },
  { deep: true },
);
tryOnBeforeUnmount(() => {
  stop();
});

const getFileContent = async (url: string) => {
  const data = await axios.get(url);
  return data.data;
};

const { showAppMessage } = useAppMessage();
const handleValidateClick = (e: MouseEvent) => {
  loading.value = true;

  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const msg = showAppMessage({
        type: 'loading',
        message: '正在解析模块...',
      })!;
      let postData: Modules.PostInfo = {
        displayName: formData.value.displayName,
        content: '',
        title: '',
        scope: [],
      };

      // 如果是远程模块，获取远程脚本内容
      if (formData.value.moduleType === 'remote') {
        msg.content = '正在获取远程脚本内容...';
        formData.value.remoteContent = await getFileContent(
          formData.value.url,
        ).catch(() => {
          msg.type = 'error';
          msg.content = '获取远程脚本内容失败！请检查 URL 是否正确';
          setTimeout(() => msg.destroy(), 1500);
        });
        postData.content = formData.value.remoteContent;
        postData.url = formData.value.url;
      } else {
        postData.content = formData.value.localContent;
      }

      // 解析模块
      msg.content = '正在解析模块内容...';
      const { ok, result } = moduleParser(postData.content);
      if (!ok) {
        msg.type = 'error';
        msg.content = `解析脚本内容失败！${result}`;
      } else {
        postData = { ...postData, ...result };

        if (postData.title === '' || postData.scope.length === 0) {
          msg.type = 'error';
          msg.content
            = '解析模块失败！请检查 SUB_STORE_SCHEMA 中的 title / scope 是否为空';
        } else {
          msg.type = 'success';
          msg.content = '解析模块成功！检查解析结果无误后点击添加即可';
          emits('submit', postData);
        }
      }

      setTimeout(() => msg.destroy(), 1500);
    }
  });

  loading.value = false;
};
</script>
