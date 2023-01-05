import { lazy, Suspense } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import { App } from 'components/App/App';
import { Homepage } from './components/Homepage/Homepage';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { Loader } from 'components/Loader/Loader';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import authReducer from 'store/Auth/reducer';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './store/reducer';

const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'));

const RegistrationForm = lazy(() =>
  import('./components/RegistrationForm/RegistrationForm'),
);
const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
  },
});
export default store;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router baseline='/'>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path='/'
              element={<ProtectedRoute isOnlyForNotAuthenticated={true} />}
            >
              <Route path="registration" element={<RegistrationForm />} />
              <Route path="login" element={<LoginForm />} />
            </Route>

            <Route element={<ProtectedRoute isOnlyForNotAuthenticated={false} />}>
              <Route path="/" element={<UserMenu />}>
                <Route index element={<Homepage />} />
                <Route path='contacts' element={<App />} />
                <Route path='logout' element={<Loader/>} />
              </Route>
            <Route path="*" element={<div>Page not found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
);