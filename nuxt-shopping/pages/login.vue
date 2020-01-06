<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form :model="form" class="login-content">
        <el-form-item label="用户名">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-form>
      <el-form>
        <el-button @click="postLogin">Login</el-button>
        <el-button><NuxtLink to="/register">Register</NuxtLink></el-button>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async postLogin() {
      const { token: auth } = await this.$axios.post('/users/login', this.form)
      this.$store.commit('setAuth', auth) // mutating to store for client rendering
      Cookie.set('auth', auth) // saving token in cookie for server rendering
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  height: 100vh;
  .el-form {
    /*background-color: orangered;*/
  }
}
</style>
