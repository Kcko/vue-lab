const redirect = target => {
  document.querySelector(target).click()
}

export default {
  install(Vue) {
    Vue.directive('click-to', {
      mounted: function (el, binding) {
        el._clickRedirectCallback = () => redirect(binding.value)
        el.addEventListener('click', el._clickRedirectCallback)
      },
      unmounted: function (el) {
        el.removeEventListener('click', el._clickRedirectCallback)
      }
    })
  }
}
