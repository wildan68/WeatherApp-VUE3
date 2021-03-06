import { createRouter, createWebHistory } from 'vue-router'

import Weather from '../components/weather.vue'
import Test from '../components/test.vue'
import NotFound from '../components/404.vue'



const routes = [{
        path: '',
        component: Weather
    },

    {
        path: '/test',
        component: Test
    },

    {
        path: '/:catchAll(.*)',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router