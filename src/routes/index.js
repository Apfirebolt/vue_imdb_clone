import { createRouter, createWebHistory } from 'vue-router'
import Home from '../screens/Home.vue'
import NotFound from '../screens/404.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../screens/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../screens/Register.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../screens/About.vue')
    },
    {
        path: '/movies',
        name: 'Movies',
        component: () => import('../screens/Movies.vue')
    },
    {
        path: '/shows',
        name: 'Shows',
        component: () => import('../screens/Shows.vue')
    },
    {
        path: '/indian-movies',
        name: 'IndianMovies',
        component: () => import('../screens/IndianMovies.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router