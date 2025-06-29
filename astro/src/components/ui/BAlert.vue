<template>
  <transition name="fade">
    <div 
      v-if="show"
      :class="alertClasses" 
      role="alert">
      <slot />
      <button 
        v-if="dismissible" 
        type="button" 
        class="btn-close" 
        aria-label="Close"
        @click="dismiss">
      </button>
    </div>
  </transition>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  show: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'info'
  },
  dismissible: Boolean,
  fade: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'dismissed'])

const localShow = ref(props.modelValue !== undefined ? props.modelValue : props.show)

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    localShow.value = newVal
  }
})

watch(() => props.show, (newVal) => {
  if (props.modelValue === undefined) {
    localShow.value = newVal
  }
})

const alertClasses = computed(() => {
  const classes = ['alert', `alert-${props.variant}`]
  if (props.dismissible) {
    classes.push('alert-dismissible')
    if (props.fade) classes.push('fade', 'show')
  }
  return classes.join(' ')
})

const dismiss = () => {
  localShow.value = false
  emit('update:modelValue', false)
  emit('dismissed')
}

const show = computed(() => localShow.value)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>