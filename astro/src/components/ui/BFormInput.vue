<template>
  <input
    :type="type"
    :class="inputClasses"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :min="min"
    :max="max"
    :step="step"
    :autocomplete="autocomplete"
    @input="updateValue"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  size: String,
  state: {
    type: Boolean,
    default: null
  },
  min: [String, Number],
  max: [String, Number],
  step: [String, Number],
  autocomplete: String
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const inputClasses = computed(() => {
  const classes = ['form-control']
  if (props.size) classes.push(`form-control-${props.size}`)
  if (props.state === true) classes.push('is-valid')
  else if (props.state === false) classes.push('is-invalid')
  return classes
})

const updateValue = (event) => {
  const value = event.target.value
  emit('update:modelValue', props.type === 'number' ? Number(value) : value)
}
</script>