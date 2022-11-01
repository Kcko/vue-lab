<template>
  <div
    class="relative"
    :class="{
      isOverflowed: isOverflowed,
      isOnEnd: isOnEnd,
      isOnStart: isOnStart
    }"
  >
    <div
      class="TableOverflowSolver mb-8"
      ref="solver"
      style="max-width: 100%; overflow-x: auto"
      @scroll="scrollBehavior"
    >
      <slot></slot>
    </div>

    <div class="TableOverflowSolverOverLayStart"></div>
    <div class="TableOverflowSolverOverLayEnd"></div>
  </div>
</template>

<script>
const isOverflowed = (element) => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  )
}

export default {
  data() {
    return {
      isOverflowed: false,
      isOnStart: false,
      isOnEnd: false
    }
  },
  computed: {},

  methods: {
    scrollBehavior() {
      const el = this.$refs.solver
      let isOnStart = false
      let isOnEnd = false

      if (el.offsetWidth + el.scrollLeft >= el.scrollWidth) {
        isOnEnd = true
      }

      if (el.scrollLeft > 0) {
        isOnStart = true
      }

      this.isOnStart = isOnStart
      this.isOnEnd = isOnEnd
    },
    overflowDetect() {
      this.isOverflowed = isOverflowed(this.$refs.solver)
    }
  },
  mounted() {
    window.addEventListener('resize', this.overflowDetect)
    this.overflowDetect()
  },
  unmounted() {
    window.removeEventListener('resize', this.overflowDetect)
  }
}
</script>

<style lang="scss" scoped>
.TableOverflowSolverOverLayStart,
.TableOverflowSolverOverLayEnd {
  content: '';
  top: 0;
  bottom: 0;
  width: 50px;
  @apply absolute z-10;
  @apply invisible;
  @apply transition duration-150;
}

.TableOverflowSolverOverLayStart {
  left: 0;
  @apply bg-gradient-to-r from-bc-gray-bg to-transparent;
}
.TableOverflowSolverOverLayEnd {
  right: 0;
  @apply bg-gradient-to-l from-bc-gray-bg to-transparent;
}

.isOverflowed {
  .TableOverflowSolverOverLayEnd {
    @apply visible;
  }
}

.isOnStart {
  .TableOverflowSolverOverLayStart {
    @apply opacity-100;
    @apply visible;
  }
}
.isOnEnd {
  .TableOverflowSolverOverLayEnd {
    @apply opacity-0;
    @apply invisible;
  }
}
</style>
