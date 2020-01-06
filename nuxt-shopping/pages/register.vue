<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form :model="form" class="login-content">
        <el-form-item label="email">
          <el-input v-model="form.email" type="email" clearable />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.password" type="password" clearable />
        </el-form-item>
        <el-form-item label="firstName">
          <el-input v-model="form.firstName" />
        </el-form-item>
        <el-form-item label="lastName">
          <el-input v-model="form.lastName" />
        </el-form-item>
      </el-form>
      <el-form>
        <el-button @click="postRegister">Register</el-button>
        <el-button><NuxtLink to="/login">Login</NuxtLink></el-button>
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
        username: '',
        password: '',
        firstName: '',
        lastName: ''
      }
    }
  },
  methods: {
    async postRegister() {
      await this.$axios.post('/users', this.form)
      this.$message.success('OK')
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
