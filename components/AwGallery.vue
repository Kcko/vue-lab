<template>
  <slot name="main" v-bind="{ images, showImage }"></slot>
  <slot name="gallery" v-bind="{ images, showImage, imagesThumbs }"></slot>

  <div class="AwGallery" v-if="showModal" @click="closeImage()">
    <div
      class="AwGallery__Pic"
      v-touch:swipe.left="swipeLeft"
      v-touch:swipe.right="swipeRight"
    >
      <aw-img
        :image="currentImage"
        size="modal"
        class="AwGallery__Image"
        @click.stop=""
      />
    </div>

    <span class="AwGallery__Close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
      >
        <title>close</title>
        <g
          stroke-linejoin="miter"
          stroke-linecap="square"
          stroke-width=".5"
          fill="none"
          stroke="#fff"
        >
          <path d="M6.343 6.343l11.314 11.314m-11.314 0L17.657 6.343"></path>
        </g>
      </svg>
    </span>

    <span
      v-show="totalImages > 1"
      @click.stop="prevImage()"
      class="AwGallery__Prev"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="miter"
          stroke-linecap="square"
          stroke-width=".5"
          fill="none"
          stroke="#fff"
        >
          <path d="M14 18l-6-6 6-6"></path>
        </g>
      </svg>
    </span>

    <span
      v-show="totalImages > 1"
      @click.stop="nextImage()"
      class="AwGallery__Next"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="miter"
          stroke-linecap="square"
          stroke-width=".5"
          fill="none"
          stroke="#fff"
        >
          <path d="M10 6l6 6-6 6"></path>
        </g></svg
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    images: Array
  },
  data() {
    return {
      currentImage: null,
      currentIndex: null,
      showModal: false
    }
  },
  computed: {
    totalImages() {
      return this.images.length
    },
    imagesThumbs() {
      return this.images //.slice(1)
    }
  },
  methods: {
    showImage(index) {
      this.showModal = true
      this.currentIndex = index
      this.currentImage = this.images[index]
      document.querySelector('html').classList.add('Locked')
    },
    prevImage() {
      if (this.currentIndex === 0) {
        this.showImage(this.totalImages - 1)
      } else {
        this.showImage(this.currentIndex - 1)
      }
    },
    nextImage() {
      if (this.currentIndex >= this.totalImages - 1) {
        this.showImage(0)
      } else {
        this.showImage(this.currentIndex + 1)
      }
    },
    swipeLeft() {
      this.prevImage()
    },
    swipeRight() {
      this.nextImage()
    },
    closeImage() {
      this.showModal = false
      this.currentIndex = null
      this.currentImage = null
      document.querySelector('html').classList.remove('Locked')
    }
  },
  mounted() {
    document.addEventListener('keydown', e => {
      if (!this.showModal) return

      if (e.key === 'Escape') {
        this.closeImage()
      }
      if (e.key === 'ArrowLeft') {
        this.prevImage()
      }

      if (e.key === 'ArrowRight') {
        this.nextImage()
      }
    })
  }
}
</script>

<style lang="scss">
.AwGallery {
  background: rgba(#000, 0.75);
  position: fixed;
  z-index: 99999564;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 0px solid red;
}

.AwGallery__Pic {
  position: fixed;
  width: calc(100% - 150px);
  height: calc(100% - 150px);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  //@apply border border-red-400;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
}

.AwGallery__Pic > img,
.AwGallery__Image {
  max-width: 100%;
  max-height: 100%;
  //object-fit: contain;
  //@apply border border-green-400;
}

.AwGallery__Close {
  color: #fff;
  position: fixed;
  top: 10px;
  font-size: 55px;
  right: 15px;
  cursor: pointer;
}

.AwGallery__Prev {
  position: fixed;
  z-index: 1000;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 75px;
  cursor: pointer;
}

.AwGallery__Next {
  position: fixed;
  z-index: 1000;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 75px;
  cursor: pointer;
}
</style>
