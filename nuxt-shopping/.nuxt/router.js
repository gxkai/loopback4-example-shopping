import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6863cc4a = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _10d24a9e = () => interopDefault(import('../pages/daliynews/index.vue' /* webpackChunkName: "pages/daliynews/index" */))
const _ef3d771c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _057e82df = () => interopDefault(import('../pages/me.vue' /* webpackChunkName: "pages/me" */))
const _6d6d272a = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _cfe2ef12 = () => interopDefault(import('../pages/secret.vue' /* webpackChunkName: "pages/secret" */))
const _389827f5 = () => interopDefault(import('../pages/admin/dailynews.vue' /* webpackChunkName: "pages/admin/dailynews" */))
const _828cbd4a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _6863cc4a,
    name: "admin"
  }, {
    path: "/daliynews",
    component: _10d24a9e,
    name: "daliynews"
  }, {
    path: "/login",
    component: _ef3d771c,
    name: "login"
  }, {
    path: "/me",
    component: _057e82df,
    name: "me"
  }, {
    path: "/register",
    component: _6d6d272a,
    name: "register"
  }, {
    path: "/secret",
    component: _cfe2ef12,
    name: "secret"
  }, {
    path: "/admin/dailynews",
    component: _389827f5,
    name: "admin-dailynews"
  }, {
    path: "/",
    component: _828cbd4a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
