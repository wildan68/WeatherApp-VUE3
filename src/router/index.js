import { createRouter, createWebHistory } from 'vue-router'

import Weather from '../components/weather.vue'
import Test from '../components/test.vue'
import NotFound from '../components/404.vue'


const routes = [{
        path: process.cwd(),
        component: Weather
    },

    {
        path: process.cwd() + '/test',
        component: Test
    },

    {
        path: process.cwd() + '/:catchAll(.*)',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router