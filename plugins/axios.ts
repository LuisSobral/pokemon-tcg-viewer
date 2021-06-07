import { Plugin } from '@nuxt/types'

const axiosPlugin: Plugin = ({ $axios, $config }) => {
  $axios.onRequest(config => {
    if ($config.apiKey) {
      $axios.setHeader('X-Api-Key', $config.apiKey)
    }
  })
}

export default axiosPlugin
