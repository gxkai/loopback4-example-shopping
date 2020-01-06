<template>
  <el-header>
    <el-row type="flex">
      <el-row style="width:200px"> </el-row>
      <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        style="flex: 1"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">心得</el-menu-item>
        <el-menu-item index="/dailynews">日历</el-menu-item>
        <el-menu-item index="/admin">管理中心</el-menu-item>
      </el-menu>
      <el-button-group>
        <el-button v-if="$store.state.auth" @click="logout" type="primary"
          >Logout</el-button
        >
        <el-button v-else type="primary"
          ><NuxtLink to="/login">Login</NuxtLink></el-button
        >
      </el-button-group>
    </el-row>
  </el-header>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'Header',
  data() {
    return {
      activeIndex: this.$route.path
    }
  },
  methods: {
    logout() {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.$router.replace('/login')
    },
    handleSelect(key, keyPath) {}
  }
}
</script>

<style scoped></style>
