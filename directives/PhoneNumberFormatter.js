export default {
  install(Vue) {
    Vue.directive('phone-number-formatter', {
      mounted(el) {
        el.oninput = function() {
          this.value = this.value.replace(/\D/g, '')
          var size = this.value.length
          if (size > 0) {
            //this.value = this.value
          }
          if (size > 3) {
            this.value = this.value.slice(0, 3) + ' ' + this.value.slice(3, 10)
          }
          if (size > 6) {
            this.value = this.value.slice(0, 7) + ' ' + this.value.slice(7, 10)
          }
        }
      },

      updated() {}
    })
  }
}
