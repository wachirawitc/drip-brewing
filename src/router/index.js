import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

import Home from '../views/Home'
import Brewing from '../views/Brewing'

const isServer = typeof window === 'undefined'

const history = isServer ? createMemoryHistory() : createWebHistory()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Brewing/:id?',
    name: 'Brewing',
    component: Brewing
  }
]

const router = createRouter({
  history,
  routes
})

export default router
