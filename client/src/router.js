/*
 * @Author: Axiuxiu
 * @Date: 2022-02-26 20:40:31
 * @LastEditTime: 2022-03-26 12:43:37
 * @Description: 定义路由
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入路由页面
import NotFound from './views/NotFound.vue';
import Login from './views/user/Login.vue';
import Register from './views/user/Register.vue';
import Manage from './views/Manage.vue';
import Home from './views/Home.vue';
import HotEvents from './views/events/HotEvents.vue';
import EventAnalysis from './views/events/EventAnalysis.vue';
import UserInfo from './views/user/UserInfo.vue';
import UserList from './views/user/UserList.vue';
import TaskManage from './views/system/TaskManage.vue';
import SpiderManage from './views/system/SpiderManage.vue';
import AnalysisManage from './views/system/AnalysisManage.vue';
import UserReco from './views/single/UserReco.vue';
import ResultList from './views/single/ResultList.vue';
import UserImage from './views/single/UserImage.vue';

// import store from './store';

import { Message } from 'element-ui';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/manage',
        },
        // 登录路由
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        // 注册路由
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        // 管理页面路由
        {
            path: '/manage',
            component: Manage,
            children: [
                {
                    path: '',
                    name: 'home',
                    meata: [],
                    component: Home,
                },
                {
                    path: '/events/hotEvents',
                    name: 'HotEvents',
                    component: HotEvents,
                    meta: ['热点事件预警', '热点事件展示'],
                },
                {
                    path:'/events/eventAnalysis',
                    name:'eventImage',
                    component: EventAnalysis,
                    meta:['热点事件预警','热点事件分析'],
                },
                {
                    path: '/user/userInfo',
                    name: 'userInfo',
                    component: UserInfo,
                    meta: ['用户管理', '个人信息']
                },
                {
                    path: '/user/userList',
                    name: 'userList',
                    component: UserList,
                    meta: ['用户管理', '用户列表'],
                },
                {
                    path:'/system/taskManage',
                    name:'taskManage',
                    component:TaskManage,
                    meta:['系统管理','任务配置'],
                },
                {
                    path:'/system/spiderManage',
                    name:'spiderManage',
                    component: SpiderManage,
                    meta:['系统管理','爬虫程序监测'],
                },
                {
                    path:'/system/analysisManage',
                    name:'analysisManage',
                    component: AnalysisManage,
                    meta:['系统管理','分析程序监测'],
                },
                {
                    path:'/single/userReco',
                    name:'userReco',
                    component: UserReco,
                    meta:['单体水军检测', '特定用户识别'],
                },
                {
                    path:'/single/resultList',
                    name:'resultList',
                    component: ResultList,
                    meta:['单体水军检测','检测结果展示'],
                },
                {
                    path:'/single/userImage',
                    name:'userImage',
                    component: UserImage,
                    meta:['单体水军检测','水军用户画像'],
                }
            ]
        },
        // 404，要放在最后
        {
            path: '*',
            name: '404',
            component: NotFound,
        }
    ]
})

const unAuthRoutes = ['login', 'register'];

const adminRoutes = ['userList'];

router.beforeEach((to, from, next) => {
    const index = unAuthRoutes.indexOf(to.name);
    if (index == -1) {
        // 判断是否登录
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            // 登录则权限管理
            if (-1 === adminRoutes.indexOf(to.name)) {
                // 不需要管理员权限直接放行
                next();
            } else {
                // 判断是否管理员
                const isAdmin=localStorage.getItem('isAdmin');
                if(isAdmin) next();
                else {
                    Message.error({
                        message:'非管理员禁止访问该页面',
                        showClose: true,
                    })
                    next({ name:from.name });
                }
            }
        } else {
            Message.error({
                message: '您尚未登陆，请先登录',
                showClose: true,
            })
            next({ path:'/login' });
        }
    } else {
        // 直接放行
        next();
    }
})

export default router;