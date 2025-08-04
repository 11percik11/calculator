import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/Components/Layouts/MainLayout/MainLayout';
import { Landing } from '@/Components/Pages/Landing/Landing';
import { NotFound } from '@/Components/Pages/NotFound/NotFound';
import { News } from '@/Components/Pages/News/News';
import { Catalog } from '@/Components/Pages/Catalog/Catalog';
import { About } from '@/Components/Pages/About/About';
import { Business } from '@/Components/Pages/Business/Business';

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
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'catalog',
        element: <Catalog />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'business',
        element: <Business />
      }
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;