import Login from '../views/Login';
import Page404 from '../views/Page404';
import Home from '../views/Home'
import Allfoodlist from '../views/Allfoodlist'
import detail from '../views/Detail'
import User from '../views/User'
import Register from '../views/register'
import Forget from '../views/Forget'
import partfood from '../views/Partfood'

export const mainRouter = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/404',
        component:Page404
    },
    {
        path:'/register',
        component: Register
    },
    {
        path:'/forget',
        component: Forget
    }
]
export const appRouter = [
    {
        path:'/app/home',
        component:Home,
        title:'首页'
    },
    {
        path:'/app/allfood',
        component:Allfoodlist,
        title:'菜谱大全'
    },
    // {
    //     path:'/app/about',
    //     component:About,
    //     title:'分类'
    // },
    {
        path:'/app/user',
        component:User,
        title:'用户'
    }
]
export const subRouter = [
    {
        path:'/app/detail',
        component:detail
    },
    {
        path:'/app/partfood',
        component:partfood
    },
]
