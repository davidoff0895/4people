import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

const PRODUCTS = () => import(/* webpackChunkName: "Products" */ '@/ui/products/products-container.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    component: PRODUCTS,
    name: 'products',
    path: '/products'
  }
]

export default new Router({ routes })
