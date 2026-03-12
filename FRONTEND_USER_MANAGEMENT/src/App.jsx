import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import UsersList from './components/UsersList'
import Home from './components/Home'
import AddUser from './components/AddUser'
import RootLayout from './components/RootLayout'
import User from './components/User'


function App() {
  const routeObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"users-list",
          element:<UsersList/>
        },
        {
          path:"add-user",
          element:<AddUser/>
        },
        {
          path:"user",
          element:<User/>
        }
      ]
    }
  ])
  return <RouterProvider router={routeObj}/>
}

export default App