<template>
  <component 
    :is="computedTag"
    :class="buttonClasses" 
    :disabled="disabled"
    :href="href"
    :to="to"
    @click="handleClick">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: String,
  disabled: Boolean,
  block: Boolean,
  pill: Boolean,
  squared: Boolean,
  href: String,
  to: [String, Object],
  tag: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const computedTag = computed(() => {
  if (props.href) return 'a'
  if (props.to) return 'router-link'
  return props.tag
})

const buttonClasses = computed(() => {
  const classes = ['btn']
  classes.push(`btn-${props.variant}`)
  if (props.size) classes.push(`btn-${props.size}`)
  if (props.block) classes.push('w-100')
  if (props.pill) classes.push('rounded-pill')
  if (props.squared) classes.push('rounded-0')
  return classes.join(' ')
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>