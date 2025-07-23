import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/Components/Layouts/MainLayout/MainLayout';
import { Landing } from '@/Components/Pages/Landing/Landing';
import { Login } from '@/Components/Pages/Login/Login';
import { NotFound } from '@/Components/Pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;