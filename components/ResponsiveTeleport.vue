<template>
  <template v-if="isMounted">
    <teleport :to="props.to" :disabled="!isMobile">
      <slot></slot>
    </teleport>
  </template>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

// eslint-disable-next-line no-undef
const props = defineProps({
  breakpointRule: {
    type: Object,
    required: true,
    default() {
      return { rule: 'smaller', breakpoint: 'xl' }
    },
    validator: obj => {
      const hasKeys = 'rule' in obj && 'breakpoint' in obj
      const validRule = ['smaller', 'greater'].includes(obj.rule)
      const validBp = Object.keys(breakpointsTailwind).includes(obj.breakpoint)

      return hasKeys && validRule && validBp
    }
  },
  to: {
    type: String,
    required: true
  }
})

// all our breakpoints from TW
const breakpoints = useBreakpoints(breakpointsTailwind)
// will be valid when current breakpoint will be smaller then props.breakpoint
const breakpointValid = breakpoints[props.breakpointRule.rule](
  props.breakpointRule.breakpoint
)
// is mobile, can teleport start workking? yes if true
const isMobile = computed(() => breakpointValid.value)

// https://stackoverflow.com/questions/63652288/does-vue-3-teleport-only-works-to-port-outside-vue
const isMounted = ref(false)

// we need nextTick ...
// one nextTick way
onMounted(() => {
  nextTick(() => {
    isMounted.value = true
  })
})

// second nextTick way, works too ...
// onMounted(async () => {
//   await nextTick()
//   isMounted.value = true
// })
</script>
