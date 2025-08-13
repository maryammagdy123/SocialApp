import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Pages/Home/Home.jsx'
import Layout from './Components/Layout.jsx'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import Post from './Components/Post/Post.jsx'
import { Toaster } from 'react-hot-toast'
import PostDetails from './Pages/PostDetails/PostDetails.jsx'
import { UserDataContextProvider } from './Context/UserDataContext.jsx'
import { RoutingGuard } from './RoutingGuard/RoutingGuard.jsx'




function App() {

  let Routes = createBrowserRouter([
    // default
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <RoutingGuard> <Home /></RoutingGuard>
        },
        {
          path: "/profile",
          element: <RoutingGuard> <Profile /></RoutingGuard>
        },
        {
          path: "/post",
          element: <RoutingGuard> <Post /></RoutingGuard>
        },
        {
          path: "/postDetails/:id",
          element: <RoutingGuard>  <PostDetails /> </RoutingGuard>
        },
        {
          path: "*",
          element: <Notfound />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />

    },
    {
      path: "/register",
      element: <Register />

    },
  ])
  return (
    <>
      <UserDataContextProvider>
        <RouterProvider router={Routes} />
        <Toaster />
      </UserDataContextProvider>
    </>
  )
}

export default App
