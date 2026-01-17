import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import type { RootState } from '../redux/store';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
      const { user } = useAppSelector((state: RootState) => state.auth);
      return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
