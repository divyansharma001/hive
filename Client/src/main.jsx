import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import {Provider} from 'react-redux'
import store from './redux/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Homepage/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
   <RouterProvider router={router}/>
   </GoogleOAuthProvider>;
   </Provider>
  </React.StrictMode>
)
