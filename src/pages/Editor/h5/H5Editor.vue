<template>  
  <div>  
    <LoadingAndError :loading="loading" :error="error" />  

    <AddProcessorModal  
      :is-visible="addProcessorModalIsVisible"  
      :modules="modules"  
      @add="addProcessor"  
      @close="addProcessorModalIsVisible = false"  
    />  

    <div v-if="form" class="form-container">  
      <div class="form-item">  
        <label>标识名称</label>  
        <input v-model="form.name" placeholder="请输入唯一标识名称" disabled />  
      </div>  

      <div class="form-item">  
        <label>展示名称</label>  
        <input  
          v-model="form.displayName"  
          placeholder="请输入订阅展示名称"  
        />  
      </div>  

      <div class="form-item" v-if="props.type === 'sub'">  
        <label>订阅类型</label>  
<select v-model="form.source">
          <option value="remote">远程</option>  
          <option value="local">本地</option>  
        </select>  
      </div>  

      <div class="form-item" v-if="form.source === 'remote'">  
        <label>订阅地址</label>  
<input  
  v-model="form.url"  
  placeholder="请输入 NodeList 订阅地址"  
/>
      </div>  

      <div class="form-item" v-if="form.source === 'local'">  
        <label>节点内容</label>  
<textarea  
  v-model="form.content"  
  placeholder="请输入节点信息"  
></textarea>
      </div>  

      <div class="form-item" v-if="props.type === 'collection'">  
        <label>包含子订阅</label>  
<select  
  v-model="form.subscriptions"  
  multiple  
>
          <option  
            v-for="sub in subs"  
            :key="sub.name"  
            :value="sub.name"  
          >  
            {{ sub.displayName || sub.name }}  
          </option>  
        </select>  
      </div>  

      <div class="form-footer">  
        <button @click="submitForm">提交</button>  
      </div>  
    </div>  
  </div>  
</template>  

<script setup lang="ts">  
import { ref } from 'vue';
import AddProcessorModal from './components/AddProcessorModal.vue';

import { useSubscriptionStore } from '../../../store/useSubscriptionStore.js';
import { useModuleStore } from '../../../store/useModuleStore.js';

const props = defineProps<{ name?: string; type: string }>();
const loading = ref(false);
const error = ref('');
const subStore = useSubscriptionStore();  
const { subs } = storeToRefs(subStore);  

const form = ref({  
  name: '',  
  displayName: '',  
  content: '',  
  url: '',  
  source: 'remote',
  subscriptions: [],
  process: [],  
});

const addProcessorModalIsVisible = ref(false);  
const addProcessor = (name: string) => {
  addProcessorModalIsVisible.value = false;
  // logic to add processor
};

const submitForm = () => {
  console.log('表单已提交', form.value);
};
</script>
