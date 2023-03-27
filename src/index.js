import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import NotFoundPage from './pages/404/NotFoundPage'
import SuscriptionPage from './pages/suscription/SuscriptionPage'
import WelcomePage from './pages/welcome/WelcomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />
  },
  {
    path : "register",
    element: <RegisterPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "suscription",
    element: <SuscriptionPage />,
    errorElement: <NotFoundPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();