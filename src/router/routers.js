import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [
    {
        path: '/login',
        meta: {title: '登录', noCache: true},
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/features/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/features/401'),
        hidden: true
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/features/redirect')
            }
        ]
    },
    // {
    //     path: '/',
    //     // component: () => import('@/views/system/user/index'),
    //     redirect: '/role',
    // },
    {
        path: '/',
        component: Layout,
        hidden: true,
        redirect: 'user',
        children: [
            {
                path: 'center',
                component: () => import('@/views/system/user/center'),
                name: '个人中心',
                meta: {title: '个人中心', icon: 'user'}
            }
        ]
    },
    // { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
    mode: 'hash',
    base: process.env.VUE_APP_BASE_PATH,
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})