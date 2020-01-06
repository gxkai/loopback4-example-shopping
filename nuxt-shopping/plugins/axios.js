export default (ctx) => {
  const { $axios, app, store } = ctx
  $axios.onRequest((config) => {
    config.baseURL = process.env.BASE_URL
    config.headers.Authorization = `Bearer ${store.state.auth}`
    return config
  })
  $axios.onResponse((response) => {
    return response.data
  })
  $axios.onError((error) => {
    app.$message.error(error.message)
  })
}
