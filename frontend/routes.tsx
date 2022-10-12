import HelloWorldView from 'Frontend/views/helloworld/HelloWorldView.js';
import React, { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from './views/MainLayout.js';

const AboutView = React.lazy(async () => import('./views/about/AboutView'));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HelloWorldView />,
      },
      {
        path: '/hello',
        element: <HelloWorldView />,
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutView />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
