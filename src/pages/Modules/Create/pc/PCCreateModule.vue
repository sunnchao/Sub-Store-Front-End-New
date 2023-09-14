<template>
  <div>PC CreateModule</div>
</template>

<script setup lang="ts">
import { CONSTANTS } from '../../../../constants';
import { moduleParser } from '../../../../utils/moduleParser.ts';

const addModule = async () => {
  const text = CONSTANTS.testText;
  const json = moduleParser(text);
  const loading = showAppMessage({
    type: 'loading',
    message: '正在添加模块...',
  })!;

  await moduleApi
    .createModule({
      ...json,
      content: text,
      url: 'test',
    })
    .catch(() => loading.destroy());

  loading.content = '创建模块成功，正在更新数据...';

  const modules = await moduleApi.getModules();
  setModules(modules);

  loading.type = 'success';
  loading.content = '添加模块成功！';
  setTimeout(() => loading.destroy(), 1500);
};
</script>

<style scoped></style>
