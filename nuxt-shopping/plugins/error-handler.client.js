import Vue from 'vue'

export default () => {
  const _oldOnError = Vue.config.errorHandler
  Vue.config.errorHandler = (error, vm) => {
    if (typeof _oldOnError === 'function') {
      console.log(error, vm)
    }
    // custom operation
  }
}
