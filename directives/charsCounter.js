const count = (limit, el) => {
  let width = (el.value.length / limit) * 100 + '%'
  el.previousElementSibling.textContent = `${el.value.length} / ${limit}`
  el.nextElementSibling.style.width = width
  el.value.substring(0, limit)
}

export default {
  install(Vue) {
    Vue.directive('chars-counter', {
      mounted: function (el, binding) {
        el._counterCallback = () => count(binding.value, el)
        el.addEventListener('input', el._counterCallback)

        el._counterCallback()
      },
      unmounted: function (el) {
        el.removeEventListener('input', el._counterCallback)
      }
    })
  }
}
