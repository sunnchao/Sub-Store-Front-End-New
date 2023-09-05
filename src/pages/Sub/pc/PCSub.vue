<template>
  <div>
    PC SUB
    {{ backendApis }}
  </div>
</template>

<script setup lang = "ts">
import { useBackendApiUrl } from '../../../hooks/useBackendApiUrl';

const { backendApis } = useBackendApiUrl();
</script>
