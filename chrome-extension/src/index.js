import Vue from 'vue'
import App from './App'

Vue.config.devtools = true

const vue = new Vue({
  ...App
})

vue.$mount('#app')
