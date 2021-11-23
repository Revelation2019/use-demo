/* eslint-disable react/display-name */

import { RouteConfig } from 'react-router-config';
import Loadable from 'react-loadable';
import React from 'react';
import LoadComp from '../components/Loading';
import Layout from '../layout/NoFrame';

interface CustomRouteConfig extends RouteConfig {}

const routes: CustomRouteConfig[] = [
  {
    path: '/',
    // exact: true,
    // component: LoadComp(React.lazy(() => import('../layout'))),
    component: Layout,
    // component: Loadable({
    //   loader: () => import('../layout'),
    //   loading: () => React.createElement('span', {}, 'loading'),
    //   // delay: 1000
    // }),
    routes: [
      {
        path: '/keyof',
        component: Loadable({
          loader: () => import('../pages/Keyof'),
          loading: () => React.createElement('span', {}, 'loading')
        })
      },
      {
        path: '/match',
        component: Loadable({
          loader: () => import('../pages/Match'),
          loading: () => React.createElement('span', {}, 'loading')
        })
      },
      {
        path: '/match/:id',
        component: Loadable({
          loader: () => import('../pages/Match'),
          loading: () => React.createElement('span', {}, 'loading')
        })
      },
      {
        path: '/abort',
        component: LoadComp(React.lazy(() => import('../pages/AbortController')))
        // Loadable({
        //   loader: () => import('../pages/AbortController'),
        //   loading: () => React.createElement('span', {}, 'loading')
        // })
      },
      {
        path: '/observable',
        component: LoadComp(React.lazy(() => import('../pages/Observable')))
      },
      {
        path: '/table',
        component: LoadComp(React.lazy(() => import('../pages/Table')))
      },
      {
        path: '/computed',
        component: LoadComp(React.lazy(() => import('../pages/computed')))
      },
      {
        path: '/webworker',
        component: LoadComp(React.lazy(() => import('../pages/WebWorker')))
      },
      {
        path: '/popupPriority',
        component: LoadComp(React.lazy(() => import('../pages/PopupPriority')))
      },
      {
        path: '/zoomAndDarg',
        component: LoadComp(React.lazy(() => import('../pages/ZoomAndDarg')))
      },
      {
        path: '/contentType',
        component: LoadComp(React.lazy(() => import('../pages/ContentType')))
      },
      {
        path: '/exportExcel',
        component: LoadComp(React.lazy(() => import('../pages/ExcelExport')))
      },
      {
        path: '/websocket',
        component: LoadComp(React.lazy(() => import('../pages/Websocket')))
      },
      {
        path: '/pony',
        component: LoadComp(React.lazy(() => import('../pages/Pony')))
      },
      {
        path: '/nestedStore',
        component: LoadComp(React.lazy(() => import('../pages/NestedStore')))
      },
      {
        path: '/rbac',
        component: LoadComp(React.lazy(() => import('../pages/Rbac')))
      },
      {
        path: '/H5',
        component: LoadComp(React.lazy(() => import('../pages/H5')))
      }
    ]
  }
];

export default routes;
