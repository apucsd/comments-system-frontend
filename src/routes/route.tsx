import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../components/ErrorPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PrivateRoute from '../private-route/PrivateRoute';

const router = createBrowserRouter([
      {
            path: '/',
            element: (
                  <PrivateRoute>
                        <App />
                  </PrivateRoute>
            ),
            errorElement: <ErrorPage />,
      },
      {
            path: '/login',
            element: <LoginPage />,
      },
      {
            path: '/register',
            element: <RegisterPage />,
      },
]);

export default router;
