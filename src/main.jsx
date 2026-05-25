import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './assets/Home/Home.jsx';
import About from './assets/About.jsx';
import Login from './assets/Login.jsx';
import Signup from './assets/Signup.jsx';
import Bookride from './assets/Bookride.jsx';
import Riderdashboard from './assets/Riderdashboard.jsx';
import PassengerLocation from './assets/PassengerLocation.jsx'
import PassengerDestination from './assets/PassengerDestination.jsx'
import ReleaseRide from './assets/ReleaseRide.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
      path: '',
      element: <Home />
      },
      {
        path: 'about', 
        element: <About />
      },
      {
        path: 'login', 
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'bookride',
        element: <Bookride />
      },
      {
        path: 'app/riderdashboard',
        element: <Riderdashboard />
      },
      {
        path: 'loactiondashboard',
        element: <PassengerLocation />
      },
      {
        path: 'passengerdestination',
        element: <PassengerDestination/>
      },
      {
        path: 'info',
        element: <ReleaseRide/>
      }
      ]
  
  },

]);



createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>

  
)
