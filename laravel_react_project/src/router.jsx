import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import CustomerLayout from './Components/CustomerLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Technicals from './views/Technicals.jsx';
import TechnicalForm from './views/TechnicalForm.jsx';
import Orders from './views/orders.jsx';
import OrderForm from './views/OrderForm.jsx'
import FeedbackForm from './views/FeedbackForm.jsx'
import LandingPage from './views/LandingPage.jsx'
import Feedbacks from './views/Feedbacks.jsx'
import AdminLayout from './Components/AdminLayout.jsx'
import AdminDashboard from './views/AdminDashboard.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      {
        path: '/home',
        element: <LandingPage />
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/orders/:id',
        element: <OrderForm key="orderUpdate" />
      },
      {
        path: '/orders/new',
        element: <OrderForm key="orderCreate" />
      },
      {
        path: '/feedbacks',
        element: <Feedbacks />
      },
      {
        path: '/feedbacks/new/:orderId',
        element: <FeedbackForm key="feedbackCreate" />
      },
      {
        path: '/feedbacks/:orderId/:id',
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