import { createBrowserRouter } from 'react-router';
import { MainLayout } from '@/Components/Layouts/MainLayout/MainLayout';
import { Landing } from '@/Components/Pages/Landing/Landing';
import { NotFound } from '@/Components/Pages/NotFound/NotFound';
import { News } from '@/Components/Pages/News/News';
import { Catalog } from '@/Components/Pages/Catalog/Catalog';
import { About } from '@/Components/Pages/About/About';
import { Business } from '@/Components/Pages/Business/Business';
import { Promo } from '@/Components/Pages/Promo/Promo';
import { Product } from '@/Components/Pages/Product/Product';
import { Offer } from '@/Components/Pages/Offer/Offer';
import { Policy } from '@/Components/Pages/Policy/Policy';
import { Cart } from '@/Components/Pages/Cart/Cart';
import { CalculatorPage } from '@/Components/Pages/Calculator/Calculator';
import { AgreementPage } from '@/Components/Pages/AgreementPage/AgreementPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'catalog',
        element: <Catalog />,
      },
      {
        path: 'catalog/:categorySlug',
        element: <Catalog/>
      },
      {
        path: 'catalog/:categorySlug/:subcategorySlug',
        element: <Catalog/>
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
      },
      {
        path: 'promotions',
        element: <Promo/>
      },
      {
        path: 'product/:productId',
        element: <Product/>
      },
      {
        path: 'user',
        element: <Offer/>
      },
      {
        path: 'privacy',
        element: <Policy/>
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'calculator',
        element: <CalculatorPage/>
      },
      {
        path: '/agreement',
        element: <AgreementPage/>
      }
    ],
  },
]);

