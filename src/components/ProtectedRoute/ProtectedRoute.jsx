import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsUserAuthenticated, selectUserRequestStatus } from 'store/Auth/selectors';
import { checkIfStillAuthenticated } from 'store/Auth/actions';
import { JWT_TOKEN_STORAGE_KEY } from 'api/constants';
import { Loader } from '../Loader/Loader';

const ProtectedRoute = ({ isOnlyForNotAuthenticated }) => {
  const dispatch = useDispatch();
  const userRequestStatus = useSelector(selectUserRequestStatus);
  const isUserAuthenticated = useSelector(getIsUserAuthenticated);

  useEffect(() => {
    const authToken = localStorage.getItem(JWT_TOKEN_STORAGE_KEY);
    if (authToken) {
      dispatch(checkIfStillAuthenticated());
    }
  }, [dispatch]);

  if (userRequestStatus === 'fetching') {
    return <Loader />;
  } else {
    if (isOnlyForNotAuthenticated) {
      if (!isUserAuthenticated) {
        return <Outlet />;
      } else {
        return <Navigate to="/" replace={true} />;
      }
    }

    if (!isUserAuthenticated) {
      return <Navigate to="/login" replace={true} />;
    }

    return <Outlet />;
  }
};

export default ProtectedRoute;
