import { Plugin } from '@nuxt/types'
import api from '~/assets/ts/api'

declare module '@nuxt/types' {
  interface Context {
    $api: {
      [key: string]: any
    }
  }
}

const apiPlugin: Plugin = (context) => {
  const apiWithAxios = api(context.$axios)

  const apiEndpoints = {
    cards: apiWithAxios('cards')
  }

  context.$api = apiEndpoints;
}

export default apiPlugin
