<template>
  <n-list :style="{ backgroundColor: 'transparent' }">
    <n-list-item
      v-for="processor in filterProcess"
      :key="processor.id"
      :style="{ alignItems: 'flex-start' }"
    >
      <n-thing v-if="processor.text" :title="processor.text" />

      <n-thing v-if="processor.module && !processor.text">
        <div class="mt-[16px] flex items-center justify-between">
          <div class="flex items-center justify-center">
            <h1 class="text-[20px] font-medium">
              {{ processor.module.displayName }}
            </h1>
            <n-divider vertical />
            <h1>{{ processor.module.title }}</h1>
            <n-tag type="primary" class="ml-[8px]" size="small">
              {{ processor.module.version }}
            </n-tag>
          </div>

          <!-- 模块操作 -->
          <div>
            <n-popconfirm
              positive-text="确认删除"
              negative-text="取消"
              :positive-button-props="{ type: 'error' }"
              @positive-click="deleteProcessor(processor.id)"
            >
              <template #trigger>
                <n-button type="error" quaternary size="small">
                  <template #icon>
                    <i class="i-solar-trash-bin-trash-bold-duotone" />
                  </template>
                  删除
                </n-button>
              </template>
              确定删除该处理器么？已修改的参数值将被丢弃
            </n-popconfirm>
          </div>
        </div>

        <p class="my-[16px]">
          {{ processor.module?.description }}
        </p>

        <div>
          <h2 class="text-[16px] font-medium">
            配置参数
          </h2>

          <n-grid
            class="mt-[12px]"
            cols="2 400:3 600:4 900:5 1100:6 1400:7"
            :x-gap="12"
            :y-gap="16"
          >
            <n-grid-item
              v-for="(param, key) in processor.module.params"
              :key="key"
            >
              <p class="mb-[4px] flex items-center font-medium">
                {{ param.name || key }}
                <n-popover
                  trigger="manual"
                  :show="showPopoverKey.includes(processor.id + key)"
                >
                  <template #trigger>
                    <i
                      class="i-solar-info-circle-linear ml-[6px] inline-block text-[16px] opacity-48"
                      @mouseenter="showPopover(processor.id + key)"
                      @mouseleave="closePopover(processor.id + key)"
                    />
                  </template>
                  <p>{{ `${param.description}` }}</p>
                  <p>{{ `数据类型：${param.dataType}` }}</p>
                  <p>{{ `默认值：${param.defaultValue ?? "无"}` }}</p>
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
                :placeholder="param.placeholder ?? ''"
                clearable
                :autosize="{ minRows: 1, maxRows: 3 }"
                @update:value="(v) => updateValue(processor.id, key, v)"
                @focus="showPopover(processor.id + key)"
                @blur="closePopover(processor.id + key)"
              />

              <n-input-number
                v-if="param.dataType === 'number'"
                :value="processor.values[key]"
                :placeholder="param.placeholder ?? ''"
                clearable
                @update:value="(v) => updateValue(processor.id, key, v)"
                @focus="showPopover(processor.id + key)"
                @blur="closePopover(processor.id + key)"
              />

              <n-select
                v-if="param.dataType === 'select'"
                :value="processor.values[key]"
                :options="param.options"
                @update:value="(v) => updateValue(processor.id, key, v)"
                @focus="showPopover(processor.id + key)"
                @blur="closePopover(processor.id + key)"
              />

              <n-select
                v-if="param.dataType === 'multiSelect'"
                multiple
                :value="processor.values[key]"
                :options="param.options"
                @update:value="(v) => updateValue(processor.id, key, v)"
                @focus="showPopover(processor.id + key)"
                @blur="closePopover(processor.id + key)"
              />
            </n-grid-item>
          </n-grid>
        </div>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import { useModuleStore } from '../../../../store/useModuleStore.ts';

const props = defineProps<{
  value: Subscription.Processors;
}>();
const emits = defineEmits<{
  (e: 'change', list: Subscription.Processors): void;
}>();

const store = useModuleStore();
const { modules } = storeToRefs(store);

type Process = Subscription.Processor & {
  text: string;
  module: Modules.BackendModule | null;
  values: Record<string, any>;
};

const filterProcess = computed(() => {
  const process = props.value.filter(
    p => p.type === 'Script Operator' && p.args.mode === 'link',
  );
  if (!process.length) return [];

  return process.map((p) => {
    const item: Process = {
      ...p,
      text: '',
      module: null,
      values: {},
    };

    const link = p.args.content;
    const matches = link.match(/^\/api\/module\/([a-zA-Z0-9]+)#?.*$/);

    if (matches) {
      const moduleName = matches[1];
      const module = modules.value.find(m => m.name === moduleName);
      const valueStr = decodeURI(link).split('#')?.[1];

      if (!module) {
        item.text = '未知模块';
      } else {
        item.module = module;
        if (valueStr) {
          try {
            const values = JSON.parse(valueStr);
            console.log(values);
            item.values = values;
          } catch (e) {
            console.log(`解析模块【${module.displayName}】参数出错: ${e}`);
            return item;
          }
        }
      }
    } else {
      item.text = '未知模块';
    }

    return item;
  });
});

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

const deleteProcessor = (id: number) => {
  const processCopy = [...props.value];
  const index = processCopy.findIndex(p => p.id === id);
  if (index === -1) return;
  processCopy.splice(index, 1);
  emits('change', processCopy);
};

const showPopoverKey = ref<string[]>([]);
const showPopover = (key: string) => {
  showPopoverKey.value.push(key);
};
const closePopover = (key: string) => {
  showPopoverKey.value = showPopoverKey.value.filter(k => k !== key);
};
</script>
