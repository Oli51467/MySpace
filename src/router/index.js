import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import LoginView from '../views/LoginView'
import UserList from '../views/UserList'
import FriendsList from '../views/FriendsList'
import UserProfile from '../views/UserProfile'
import RegisterView from '../views/RegisterView'
import NotFoundView from '../views/NotFoundView'

// 对每个页面设置路由
const routes = [
  { 
    path: '/myspace/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/myspace/userlist/',
    name: 'userlist',
    component: UserList
  },
  {
    path: '/myspace/friends/',
    name: 'friendslist',
    component: FriendsList
  },
  {
    path: '/myspace/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfile
  },
  {
    path: '/myspace/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/myspace/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/myspace/404/',
    name: '404',
    component: NotFoundView
  },
  {
    path: '/myspace/:catchAll(,*)',
    redirect: '/404/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
