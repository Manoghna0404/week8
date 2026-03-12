import React from 'react'
import {createBrowserRouter, RouterProvider,Navigate} from 'react-router'
import Products from './components/Products'
import ProductsList from './components/ProductsList'
import Home from './components/Home'
import RootLayout from './components/RootLayout'
import ContactUs from './components/ContactUs'

function App() {
  const routerObj=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
         path:"/",
        element:<Home/>
      },
      {
        path:"productsList",
        element:<ProductsList/>,
      },
      {
        path:"contactus",
        element:<ContactUs/>
      },
      {
        path:"products",
        element:<Products/>
      }
    ]
  },
  ])
  return <RouterProvider router={routerObj}/>
}

export default App