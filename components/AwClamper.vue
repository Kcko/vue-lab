<template>
  <!-- OriginalHeight: {{ originalHeight }} <br />
  maxHeight: {{ maxHeight }} <br />
  _maxHeight {{ _maxHeight }} <br />
  isValidHeight {{ isValidHeight }} <br /> -->

  <div
    ref="el"
    class="Clamper"
    :class="{
      'Clamper--Collapsed': collapsed,
      'Clamper--Show': isMobile && isValidHeight
    }"
    :style="computedStyles"
  >
    <slot></slot>
    <div class="Clamper__Overlay"></div>
  </div>
  <div class="Clamper__Toggler">
    <div @click="toggle" class="text-center">
      <div class="Clamper__TogglerLine">
        <div v-if="!collapsed" class="text-msp-red" v-text="textMore"></div>
        <div v-else v-text="textLess"></div>
      </div>
      <div>
        <aw-icon
          icon="fe-chevron-down"
          class="w-5 h-5"
          :class="{ 'transform rotate-180': collapsed }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default {
  props: {
    maxHeight: {
      type: Number,
      required: true
    },
    responsiveMaxHeight: {
      type: Object,
      required: false,
      default: () => ({})
    },
    safeOffset: {
      type: Number,
      default: 100
    },
    toggleText: {
      type: [String, Array],
      default: 'Celý popis'
    },
    overlayHeight: {
      type: String,
      default: '80px' // can be any unit [px, %, rem ...]
    }
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isMobileX = breakpoints.smaller('md')
    const isMobile = true

    const isSm = breakpoints.greater('sm')
    const isMd = breakpoints.greater('md')
    const isLg = breakpoints.greater('lg')
    const isXl = breakpoints.greater('xl')
    const is2xl = breakpoints.greater('2xl')

    return {
      isMobile,
      isMobileX,
      isSm,
      isMd,
      isLg,
      isXl,
      is2xl
    }
  },
  data() {
    return {
      collapsed: false,
      originalHeight: null
    }
  },
  computed: {
    _maxHeight() {
      if (this.responsiveMaxHeight) {
        if (this.is2xl && this.responsiveMaxHeight['2xl']) {
          return this.responsiveMaxHeight['2xl']
        }
        if (this.isXl && this.responsiveMaxHeight['xl']) {
          return this.responsiveMaxHeight['xl']
        }
        if (this.isLg && this.responsiveMaxHeight['lg']) {
          return this.responsiveMaxHeight['lg']
        }
        if (this.isMd && this.responsiveMaxHeight['md']) {
          return this.responsiveMaxHeight['md']
        }
        if (this.isSm && this.responsiveMaxHeight['sm']) {
          return this.responsiveMaxHeight['sm']
        }
      }

      return this.maxHeight
    },

    textMore() {
      if (typeof this.toggleText === 'object') {
        return this.toggleText[0]
      }
      return this.toggleText
    },
    textLess() {
      if (typeof this.toggleText === 'object') {
        return this.toggleText[1]
      }
      return this.toggleText
    },
    isValidHeight() {
      return this.originalHeight > this._maxHeight + this.safeOffset
    },
    computedStyles() {
      if (this.isMobile && this.isValidHeight) {
        return {
          maxHeight: this.computedHeight,
          '--overlayHeight': this.overlayHeight
        }
      }

      return {
        '--overlayHeight': this.overlayHeight
      }
    },
    computedHeight() {
      if (this.isMobile && this.isValidHeight) {
        return this.collapsed
          ? this.originalHeight + 'px'
          : this._maxHeight + 'px'
      }

      return this.originalHeight + 'px'
    }
  },

  methods: {
    toggle() {
      this.collapsed = !this.collapsed
    },
    detectElementHeight() {
      this.originalHeight = this.$refs.el.scrollHeight
    }
  },
  mounted() {
    window.addEventListener('resize', this.detectElementHeight)
    this.detectElementHeight()
  },
  unmounted() {
    window.removeEventListener('resize', this.detectElementHeight)
  }
}
</script>

<style lang="scss" scoped>
.Clamper {
  @apply relative z-0;

  transition: 250ms ease-in-out;

  &__Overlay {
    //border: 1px solid lime;
    background: linear-gradient(to bottom, rgb(255 255 255 / 0.5), white);
    @apply absolute bottom-0 left-0 right-0 z-1;
    /*@apply h-20;*/
    height: var(--overlayHeight);

    @apply hidden;
  }

  &__Toggler {
    @apply py-2;
    @apply font-masoprofit-bold text-s14;
    @apply cursor-pointer leading-tight;
    @apply bg-white text-msp-dark;

    @apply hidden;
  }

  &__TogglerLine {
    @apply relative z-1;

    &:before {
      content: '';
      @apply h-px absolute top-1/2 left-0 right-0 bg-msp-gray-medium;
    }

    > div {
      @apply relative z-2;
      @apply bg-white inline-block px-5;
    }
  }
}

// Mobile device & safe height
.Clamper.Clamper--Show {
  overflow: hidden;
  // v chromu blbne 1px grid, zatim takto
  padding-right: 2px;

  .Clamper__Overlay {
    @apply block;
  }
}
.Clamper.Clamper--Show + .Clamper__Toggler {
  @apply block;
}

// Collapsed
.Clamper.Clamper--Collapsed {
  .Clamper__Overlay {
    @apply hidden;
  }
}
</style>
