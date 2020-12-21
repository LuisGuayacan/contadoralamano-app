import vueRouter from 'vue-router'
import User from './components/User'
import MiBalance from './components/Balance'
import RegistroTipo from './components/RegistroPorTipo'
import AgregarRegistro from './components/Registro'
import Pto from './components/Presupuesto'
import App from'./App'

const router = new vueRouter({
    mode:'history',
    base: __dirname,
    routes:[
        {
        path: '/',
        name: "root",
        component: App
        },

        {
        path: '/user/:username', // "/user/{username}"
        name: "user",
        component: User
        },

        {
        path:'/registro/:username',
        name: "registro",
        component: AgregarRegistro
        },

        {
        path:'/registro/balance/:username',
        name: "balance",
        component: MiBalance
        },

        {
        path:'/registro/tipo/:username',
        name: "reporte_tipo",
        component: RegistroTipo
        },

        {
        path:'/registro/Pto/:username',
        name: "Presupuesto",
        component: Pto
        },
    ]
})
export default router
