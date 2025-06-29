<template>
  <div class="test-vue">
    <h2>Bootstrap Vue Compatibility Test</h2>
    
    <!-- Test BAlert -->
    <BAlert show variant="success" dismissible>
      Vue 3 and Bootstrap 5 are working with our compatibility layer!
    </BAlert>
    
    <!-- Test BButton -->
    <BButton @click="count++" variant="primary" class="me-2">
      Clicked {{ count }} times
    </BButton>
    
    <BButton variant="secondary" size="sm" @click="count = 0">
      Reset
    </BButton>
    
    <!-- Test BCard -->
    <BCard title="Test Card" class="mt-3">
      <p>Count: {{ count }}</p>
      <BFormInput 
        v-model="inputText" 
        placeholder="Test input"
        class="mb-2"
      />
      <p v-if="inputText">You typed: {{ inputText }}</p>
    </BCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
const inputText = ref('');
</script>

<style scoped>
.test-vue {
  margin: 2rem 0;
}
</style>