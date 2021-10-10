import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GraphDetails from '../views/GraphDetails.vue'
import EditGraph from '../views/EditGraph.vue'
import GraphStatistics from '../views/GraphStatistics.vue'
import NotFound from '../views/NotFound.vue'
import GraphView from '../components/GraphView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/graphs/:id', component: GraphView, props: true, children: [
      {
        path: '',
        name: 'GraphDetails',
        component: GraphDetails,
        props: true
      },
      {
        path: 'edit',
        name: 'EditGraph',
        component: EditGraph,
        props: true
      },
      {
        path: 'statistics',
        name: 'GraphStatistics',
        component: GraphStatistics,
        props: true
      },
    ]
  },
  { 
    path: '/:notFound(.*)', 
    component: NotFound,
    name: 'NotFound'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
