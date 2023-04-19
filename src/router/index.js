//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'auth.login',
        component: () => import('../views/auth/login.vue')
    },
    {
        path: '/register',
        name: 'auth.register',
        component: () => import('../views/auth/register.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router