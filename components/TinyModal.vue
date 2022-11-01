<template>
  <slot name="button" v-bind="{ open, close }"></slot>

  <teleport v-if="opened" to="#teleport">
    <transition name="fade" appear>
      <div class="ModalOverlay"></div>
    </transition>

    <div class="ModalOverlay2" :style="cssVars">
      <div @click="closeFromWrapper" class="ModalWrapper" ref="modalWrapper">
        <transition name="pop" appear>
          <div class="ModalContent">
            <button class="ModalContent__Close" @click="close">
              <aw-icon icon="fe-close" class="w-6 h-6 text-msp-red" />
            </button>
            <!-- <div class="RichText"> -->
            <slot v-bind="{ open, close }"></slot>
          </div>
          <!-- </div> -->
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    storeId: {
      type: String,
      required: false
    },
    maxWidth: {
      type: String,
      required: false
    },
    autoOpen: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      opened: false
    }
  },
  computed: {
    openedModalId() {
      return this.$store.state.tinyModal.id
    },
    cssVars() {
      return {
        '--modalMaxWidth': this.maxWidth || '1000px'
      }
    }
  },
  methods: {
    open() {
      this.opened = true
      document.documentElement.classList.add('TinyModalOpened')
      /*
      if (this.openedModalId != this.storeId) {
        this.$store.dispatch('tinyModal/open', { id: this.storeId })
      }
      */
    },
    closeFromWrapper(e) {
      if (e.target !== this.$refs.modalWrapper) {
        return
      }

      this.close()
    },
    close() {
      this.opened = false
      document.documentElement.classList.remove('TinyModalOpened')
      this.$store.dispatch('tinyModal/close')
    }
  },
  mounted() {
    if (this.autoOpen /*&& this.openedModalId != this.storeId*/) {
      this.open()
    }
  },
  watch: {
    openedModalId(newValue) {
      if (
        this.storeId &&
        newValue &&
        this.storeId == newValue &&
        !this.opened
      ) {
        this.open()
      }
    }
  }
}
</script>

<style lang="scss">
.ModalOverlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.6);
}

.ModalOverlay2 {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 10000;
}

.ModalWrapper {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  box-sizing: border-box;
}
.ModalContent {
  max-width: var(--modalMaxWidth);
  width: 100%;
  background: #fff;
  padding: 0px;
  @apply relative;
  z-index: 1;

  &__Close {
    @apply absolute right-0 top-0 z-10;
    @apply transform translate-y-5 -translate-x-4 text-msp-red;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: all 250ms ease;
  transform: scale(1);
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}
</style>
