import React, { useEffect } from 'react';
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Details from './Details';

const Body = () => {
    const appRouter =  createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
        {
            path: "/details",
            element: <Details />
        }
    ])

  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body;