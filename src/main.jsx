import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ErrorPages from './pages/ErrorPages.jsx';
import Home from './pages/Home.jsx';
import Plants from './pages/Plants.jsx';
import PlantsDetails from './pages/PlantsDetails.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AuthProvider from './context/AuthContext.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPages></ErrorPages>,
     children: [
      { path: "/", element: <Home></Home> },
      { path: "/plants", element: <Plants></Plants> },
      {
        path: "/plants/:id",
        element: (
          <PrivateRoute>
             <PlantsDetails></PlantsDetails>
          </PrivateRoute>
           ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/signup", element: <Signup></Signup> },
    ],
  },

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> <RouterProvider router={router} hydrateFallbackElement={<h2>Loading....</h2>} />
    </AuthProvider>
   
  </StrictMode>,
)
