import { createBrowserRouter } from 'react-router-dom';
import GroceryView from './views/grocery/GroceryView.js';
import MainLayout from './views/MainLayout.js';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <GroceryView />,
      },
      {
        path: '/groceries',
        element: <GroceryView />,
      },
    ],
  },
]);

export default router;
