<template>
  <div
    class="relative z-1"
    :class="{
      isOverflowed: isOverflowed,
      isOnEnd: isOnEnd,
      isOnStart: isOnStart,
      [swipeAction]: true
    }"
  >
    <div
      class="Solver"
      ref="solver"
      style="max-width: 100%; overflow-x: auto"
      @scroll="scrollBehavior"
      v-touch:press="onTouch"
      v-touch:release="onRelease"
    >
      <slot></slot>
    </div>

    <span class="SwipeIcon" :style="{ height: solverHeight }">
      <aw-icon icon="fe-swipe-x" class="x-6 h-6" />
    </span>

    <span class="SwipeShadow" :style="{ height: solverHeight }">
      <!-- shadow under icon -->
    </span>
  </div>

  <!-- <div>{{ log }}</div> -->
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
      log: 'no action',
      solverHeight: 0,
      isOverflowed: false,
      isOnStart: false,
      isOnEnd: false,
      swipeAction: ''
    }
  },
  computed: {},

  methods: {
    onTouch() {
      this.log = 'onTouch'
      this.swipeAction = 'onTouch'
    },
    onRelease() {
      this.log = 'onRelease'
      this.swipeAction = 'onRelease'
    },
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
    },
    solverHeightDetection() {
      this.solverHeight = this.$refs.solver.clientHeight + 'px'
    }
  },
  mounted() {
    window.addEventListener('resize', this.overflowDetect)
    this.solverHeightDetection()
    this.overflowDetect()
  },
  unmounted() {
    window.removeEventListener('resize', this.overflowDetect)
  }
}
</script>

<style lang="scss" scoped>
.Solver {
  white-space: nowrap;
}

@keyframes swipe {
  0% {
    transform: translateX(-3px);
  }

  50% {
    transform: translateX(3px);
  }
}

// icon is hidden by default
.SwipeIcon {
  @apply bg-msp-gray-light absolute right-0 top-0 w-10 flex justify-center items-center hidden text-msp-gray-dark;
  z-index: 3;
  background: var(--shadowColor, green);
  svg {
    //@apply mt-2;
    animation: swipe 600ms linear infinite alternate;
  }
}

.SwipeShadow {
  @apply absolute right-0 top-0 bottom-0 w-10;
  z-index: 2;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    var(--shadowColor, green)
  );
}

// icon is visible when we can scroll
.isOverflowed {
  .SwipeIcon {
    @apply flex;
  }
  .SwipeShadow {
    @apply block;
  }
}

// icon is hidden when we are on the end of our scroll
.isOverflowed.isOnEnd {
  .SwipeIcon {
    @apply hidden #{!important};
  }
  .SwipeShadow {
    @apply hidden #{!important};
  }
}

.isOverflowed.onTouch {
  .SwipeIcon {
    @apply hidden;
  }
}
</style>
