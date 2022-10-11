import HelloWorldView from 'Frontend/views/helloworld/HelloWorldView.js';
import React, { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from './views/MainLayout.js';

export type ViewRouteObject = Omit<RouteObject, 'path'> & Required<Pick<RouteObject, 'path'>>;

const AboutView = React.lazy(async () => import('./views/about/AboutView'));

const helloWorldViewElement = <HelloWorldView />;

export const views: readonly ViewRouteObject[] = [
  {
    path: '/',
    element: helloWorldViewElement,
  },
  {
    path: '/hello',
    element: helloWorldViewElement,
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AboutView />
      </Suspense>
    ),
  },
];

export type ViewAdditionalInfo = Readonly<{
  title?: string;
  icon?: string;
}>;

export const viewAdditionalInfoMap: Record<string, ViewAdditionalInfo | undefined> = {
  '/hello': { icon: 'la la-globe', title: 'Hello World' },
  '/about': { icon: 'la la-file', title: 'About' },
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: views as RouteObject[],
  },
]);

export default router;
