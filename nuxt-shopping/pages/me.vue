<template>
  <div>
    <h1>{{ meInfo }}</h1>
    <NuxtLink to="/">
      Back home
    </NuxtLink>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData(context) {
    const meInfo = await context.$axios.get('/users/me')
    return { meInfo }
  },
  methods: {}
}
</script>
