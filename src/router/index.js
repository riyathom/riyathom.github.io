import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Publications from '@/views/PublicationsView.vue'
import Presentations from '@/views/PresentationsView.vue'
import CV from '@/views/CVView.vue'
import Resources from '@/views/ResourcesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/publications',
    name: 'publications',
    component: Publications
  },

  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/presentations',
    name: 'presentations',
    component: Presentations
  },
  {
    path: '/cv',
    name: 'cv',
    component: CV
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router