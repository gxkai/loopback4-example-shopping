import { Message } from 'element-ui'
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.$message = Message
}
