import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import('@/views/home/Home')
const Cart = () => import('@/views/cart/Cart')
const Category = () => import('@/views/category/Category')
const Profile = () => import('@/views/profile/Profile')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
