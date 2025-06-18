import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import CustomerLayout from './layouts/CustomerLayout.jsx';
import GuestLayout from './layouts/GuestLayout.jsx';
import Technicals from './views/Technicals.jsx';
import TechnicalForm from './views/TechnicalForm.jsx';
import Orders from './views/orders.jsx';
import OrderForm from './views/OrderForm.jsx'
import FeedbackForm from './views/FeedbackForm.jsx'
import LandingPage from './views/LandingPage.jsx'
import Feedbacks from './views/Feedbacks.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminDashboard from './views/AdminDashboard.jsx';


const router = createBrowserRouter([
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      {
        path: '/customer/home',
        element: <LandingPage />
      },
      {
        path: '/customer/orders',
        element: <Orders />,
      },
      {
        path: '/customer/orders/:id',
        element: <OrderForm key="orderUpdate" />
      },
      {
        path: '/customer/orders/new',
        element: <OrderForm key="orderCreate" />
      },
      {
        path: '/customer/feedbacks',
        element: <Feedbacks />
      },
      {
        path: '/customer/feedbacks/new/:orderId',
        element: <FeedbackForm key="feedbackCreate" />
      },
      {
        path: '/customer/feedbacks/:orderId/:id',
        element: <FeedbackForm key="feedbackUpdate" />
      },
    ]
  },


  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />
      },
      {
        path: '/admin/technicals',
        element: <Technicals/>,
      },
      {
        path: '/admin/technicals/new',
        element: <TechnicalForm key="technicalCreate" />
      },
      {
        path: '/admin/technicals/:id',
        element: <TechnicalForm key="technicalUpdate" />
      },
    ]
  },

  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      }
    ]
  },
]);

export default router;
