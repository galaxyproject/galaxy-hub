<template>
  <div :class="cardClasses">
    <img 
      v-if="imgSrc" 
      :src="imgSrc" 
      :alt="imgAlt" 
      :class="imgClasses">
    
    <div v-if="hasHeader" class="card-header">
      <slot name="header">
        <h5 v-if="header" class="mb-0">{{ header }}</h5>
      </slot>
    </div>
    
    <div class="card-body">
      <h5 v-if="title" class="card-title">{{ title }}</h5>
      <h6 v-if="subTitle" class="card-subtitle mb-2 text-muted">{{ subTitle }}</h6>
      <div v-if="$slots.default" class="card-text">
        <slot />
      </div>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  title: String,
  subTitle: String,
  header: String,
  imgSrc: String,
  imgAlt: {
    type: String,
    default: ''
  },
  imgTop: {
    type: Boolean,
    default: true
  },
  imgBottom: Boolean,
  overlay: Boolean,
  bodyClass: [String, Array, Object],
  headerClass: [String, Array, Object],
  footerClass: [String, Array, Object],
  bgVariant: String,
  borderVariant: String,
  textVariant: String
})

const slots = useSlots()

const cardClasses = computed(() => {
  const classes = ['card']
  if (props.bgVariant) classes.push(`bg-${props.bgVariant}`)
  if (props.borderVariant) classes.push(`border-${props.borderVariant}`)
  if (props.textVariant) classes.push(`text-${props.textVariant}`)
  return classes
})

const imgClasses = computed(() => {
  if (props.imgTop && !props.imgBottom) return 'card-img-top'
  if (props.imgBottom && !props.imgTop) return 'card-img-bottom'
  if (props.overlay) return 'card-img'
  return 'card-img-top'
})

const hasHeader = computed(() => {
  return props.header || slots.header
})
</script>