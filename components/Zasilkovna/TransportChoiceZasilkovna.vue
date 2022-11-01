<template>
  <slot v-bind="{ showWidget }"></slot>
</template>

<script>
import fillPickupPoint from './helpers/fillPickupPoint'
import { loadScript, removeScript } from './helpers/loadScript'
const url = 'https://widget.packeta.com/www/js/library.js'

export default {
  name: 'TransportChoiceZasilkovna',
  props: {
    apiKey: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    transportId: {
      type: Number,
      required: true
    }
  },
  emits: ['close-transport-choice'],
  methods: {
    getZasilkovnaPoint(point) {
      // zavrit
      if (point === null) {
        //fillPickupPoint(point)
        this.$emit('close-transport-choice')
      }
      // vyplnit
      else {
        // vyplnit hidden inputy

        const lat = point?.gps?.lat
        const lng = point?.gps?.lon
        const latLng = lat && lng ? JSON.stringify({ lat, lng }) : null

        fillPickupPoint({
          transport_type_choice_name: point.place,
          transport_type_choice_street: point.street,
          transport_type_choice_city: point.city,
          transport_type_choice_zip: point.zip,
          transport_type_choice_ext_code: point.id,
          transport_type_choice_url: point.url,
          transport_type_choice_gps: latLng
        })

        // vybrat dopravu
        document
          .querySelector('#frm-form-transport_type_id-' + this.transportId)
          .click()

        this.$emit('close-transport-choice')
      }
    },
    showWidget() {
      loadScript(url, this.$options.name)
        .then(() => {
          window.Packeta.Widget.pick(this.apiKey, this.getZasilkovnaPoint, {
            country: this.country,
            language: this.language
          })
        })
        .catch(alert)
    },
    closeOnEscape(e) {
      if (e.key === 'Escape') {
        this.openModal = false
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.closeOnEscape)
  },
  unmounted() {
    removeScript(this.$options.name)
    document.removeEventListener('keydown', this.closeOnEscape)
  }
}
// https://widget.packeta.com/v6/doc/standard-example-simple.html, neustaly reinit pri dalsim otevirani, DPD to ma lepe vyreseno
</script>
