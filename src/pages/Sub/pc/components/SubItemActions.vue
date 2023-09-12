<template>
  <Transition name="opacity">
    <div
      v-if="props.isVisible"
      class="absolute left-0 top-0 z-100 h-full w-full flex items-center justify-center rounded-[4px] bg-[#fafafccc] px-[16px] backdrop-blur-[4px] dark:bg-[#18181ccc]"
    >
      <n-grid
        cols="1 224:2 340:3 456:4 572:5 688:6"
        responsive="self"
        :x-gap="8"
        :y-gap="8"
      >
        <n-grid-item class="flex justify-center">
          <n-button strong type="primary" quaternary @click="copyLink(props)">
            <template #icon>
              <i class="i-solar-copy-bold-duotone text-[16px] opacity-72" />
            </template>
            通用订阅
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button
            strong
            type="primary"
            quaternary
            @click="openPreview?.(props)"
          >
            <template #icon>
              <i
                class="i-solar-link-circle-bold-duotone text-[18px] opacity-72"
              />
            </template>
            专用订阅
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button strong type="primary" quaternary @click="editItem">
            <template #icon>
              <i class="i-solar-pen-2-bold-duotone text-[18px] opacity-72" />
            </template>
            编辑订阅
          </n-button>
        </n-grid-item>
      </n-grid>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCopySubsLink } from '../../../../hooks/useCopySubsLink.ts';

const props = defineProps<{
  isVisible: boolean
  type: Components.SubType
  name: string
}>();

const { copyLink } = useCopySubsLink();

const router = useRouter();
const editItem = () => {
  console.log('editItem');
  router.push(`/edit/${props.type}/${props.name}`);
};

const openPreview = inject<Components.PreviewMultiplePlatform>(
  'previewMultiplePlatform',
);
</script>

<style scoped lang="scss">
.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.3s;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
