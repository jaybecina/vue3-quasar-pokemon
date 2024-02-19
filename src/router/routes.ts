import { RouteRecordRaw } from 'vue-router'
import MainLayout from 'layouts/MainLayout.vue'
import HomePage from 'src/pages/HomePage.vue'
import PokemonDetailsPage from 'pages/PokemonDetailsPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: MainLayout,
    children: [{ path: '', name: 'HomePage', component: HomePage }]
  },
  {
    path: '/pokemon-details/:name',
    name: 'PokemonDetailsPage',
    component: MainLayout,
    children: [{ path: '', name: 'PokemonDetailsPage', component: PokemonDetailsPage }]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
