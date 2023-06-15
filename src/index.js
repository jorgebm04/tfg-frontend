import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import WelcomePage from './pages/Welcome/WelcomePage'
import NotFoundPage from './pages/NotFound/NotFoundPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage'
import MainPage from './pages/Main/MainPage';
import TestPage from './pages/Test/TestPage';
import GraphicsPage from './pages/Graphics/GraphicsPage';
import './styles/Index/Index.css'
import 'bootstrap/dist/css/bootstrap.css';

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
      path: "register",
      element: <RegisterPage />,
      errorElement: <NotFoundPage />
    },
    {
      path: "main",
      element: <MainPage />,
      errorElement: <NotFoundPage />
    },
    {
      path: "graphics",
      element: <GraphicsPage />,
      errorElement: <NotFoundPage />
    },
    {
      path:"pruebas",
      element: <TestPage />,
      errorElement:<NotFoundPage />
    }
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
