import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import CV from '@/views/CVView.vue'
import Publications from '@/views/PublicationsView.vue'
import Presentations from '@/views/PresentationsView.vue'
import Resources from '@/views/ResourcesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cv',
    name: 'cv',
    component: CV
  },
  {
    path: '/publications',
    name: 'publications',
    component: Publications
  },
  {
    path: '/presentations',
    name: 'presentations',
    component: Presentations
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