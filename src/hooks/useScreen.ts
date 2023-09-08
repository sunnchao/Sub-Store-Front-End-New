import { computed, onBeforeUnmount, ref } from 'vue';

export const useScreen = () => {
  const width = ref(window.innerWidth);
  const isPc = computed(() => width.value > 640);

  const onResize = () => {
    width.value = window.innerWidth;
  };
  window.addEventListener('resize', onResize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
  });

  return {
    width,
    isPc,
  };
};
