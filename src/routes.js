import List from './components/List'
// import Logon from './components/auth/Logon'
import App from './App'
import Logout from './components/auth/Logout'


const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/list',
        name: 'list',
        component: List,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
]

export default routes