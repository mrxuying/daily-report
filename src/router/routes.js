import { lazy } from "react";
import { withKeepAlive } from "keepalive-react-component";
import Home from "../views/Home";

const routes = [{
    path: '/',
    name: 'home',
    component: withKeepAlive(Home, {cacheId: 'home', scroll: true}),
    meta: {
      title: 'Daily-Report',
    }
  },{
    path: '/detail/:id',
    name: 'detail',
    component: lazy(() => import('../views/Detail')),
    meta: {
      title: 'Detail',
    },
  },{
    path: '/personal',
    name: 'personal',
    component: lazy(() => import('../views/Personal')),
    meta: {
      title: 'Pesonal',
    },
  },{
    path: '/collection',
    name: 'collection',
    component: lazy(() => import('../views/Collection')),
    meta: {
      title: 'Collection',
    },
  },{
    path: '/modifier',
    name: 'modifier',
    component: lazy(() => import('../views/Modifier')),
    meta: {
      title: 'Modifier',
    },
  },{
    path: '/login',
    name: 'login',
    component: lazy(() => import('../views/Login')),
    meta: {
      title: 'Login',
    },
  },
  {
    path: '*',
    name: '404',
    component: lazy(() => import('../views/Page404')),
    meta: {
      title: 'Page404',
    },
  },
];

export default routes;