export default ($axios: any) => (endpoint: string) => ({
  async get(params: object = {}, _default?: any) {
    try {
      const response = await $axios.get(`${endpoint}`, { params })
      return response.data
    } catch (failure) {
      return _default
    }
  }
})