<template>
  <n-list>
    <n-list-item v-for="processor in filterProcess" :key="processor.id">
      <n-thing
        v-if="typeof processor.module === 'string'"
        :title="processor.module"
      />

      <n-thing
        v-else
        :title="processor.module.displayName"
        :description="processor.module.title"
      >
        <p>{{ processor.module?.description }}</p>
        <div class="mt-[16px]">
          <h2 class="font-medium">
            配置参数
          </h2>
          <n-grid class="mt-[8px]" :cols="3" :x-gap="12" :y-gap="16">
            <n-grid-item
              v-for="(param, key) in processor.module.params"
              :key="key"
            >
              <p class="mb-[4px] flex items-center font-medium">
                {{ key }}
                <n-popover trigger="hover">
                  <template #trigger>
                    <i
                      class="i-solar-info-circle-linear ml-[6px] inline-block text-[16px] opacity-48"
                    />
                  </template>
                  <span>{{
                    `${param.description} - 数据类型：${
                      param.dataType
                    } - 默认值：${param.defaultValue ?? "无"}`
                  }}</span>
                </n-popover>
              </p>

              <n-switch
                v-if="param.dataType === 'boolean'"
                :value="processor.values[key]"
                @update:value="(v) => updateValue(processor.id, key, v)"
              />

              <n-input
                v-if="param.dataType === 'string'"
                :value="processor.values[key]"
                type="textarea"
                :placeholder="param.description"
                :autosize="{ minRows: 1, maxRows: 3 }"
                @update:value="(v) => updateValue(processor.id, key, v)"
              />

              <n-input-number
                v-if="param.dataType === 'number'"
                :value="processor.values[key]"
                :placeholder="param.description"
                @update:value="(v) => updateValue(processor.id, key, v)"
              />

              <n-select
                v-if="param.dataType === 'select'"
                :value="processor.values[key]"
                :options="param.options"
                :placeholder="param.description"
                @update:value="(v) => updateValue(processor.id, key, v)"
              />

              <n-select
                v-if="param.dataType === 'multiSelect'"
                multiple
                :value="processor.values[key]"
                :options="param.options"
                :placeholder="param.description"
                @update:value="(v) => updateValue(processor.id, key, v)"
              />
            </n-grid-item>
          </n-grid>
        </div>
      </n-thing>

      <template #suffix>
        <n-button>Suffix</n-button>
      </template>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useModuleStore } from '../../../../store/useModuleStore.ts';

const props = defineProps<{
  value: Subscription.Processors;
}>();
const emits = defineEmits<{
  (e: 'change', list: Subscription.Processors): void;
}>();

const store = useModuleStore();
const { modules } = storeToRefs(store);

const filterProcess = computed(() =>
  props.value
    .filter(p => p.type === 'Script Operator' && p.args.mode === 'link')
    .map((p) => {
      const link = p.args.content;
      const matches = link.match(/^\/api\/module\/([a-zA-Z0-9]+)#?.*$/);
      if (matches) {
        const moduleName = matches[1];
        const module = modules.value.find(m => m.name === moduleName);
        const valueStr = decodeURI(link).split('#')?.[1];

        if (!module) {
          return {
            ...p,
            module: '未知模块',
            values: {},
          };
        }
        if (!valueStr) {
          return {
            ...p,
            module,
            values: {},
          };
        }

        try {
          const values = JSON.parse(valueStr);
          console.log(values);
          return {
            ...p,
            module,
            values,
          };
        } catch (e) {
          console.log(`解析模块【${module.displayName}】参数出错: ${e}`);
          return {
            ...p,
            module,
            values: {},
          };
        }
      } else {
        return {
          ...p,
          module: '未知模块',
          values: {},
        };
      }
    }),
);

const updateValue = (id: number, key: string, value: any) => {
  const processCopy = [...props.value];
  const processor = processCopy.find(p => p.id === id);
  if (!processor) return;
  const [path, paramStr] = decodeURI(processor.args.content).split('#');
  const obj = JSON.parse(paramStr);
  obj[key] = value;
  processor.args.content = encodeURI(`${path}#${JSON.stringify(obj)}`);

  emits('change', processCopy);
};
</script>
