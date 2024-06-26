import React, { memo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Navigate,
  Route,
  createHashRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { AuthRouter } from '../pages/auth/router/auth-router';
import { DashboardRouter } from '../pages/dashboard/router/dashboard-router';

function IndexRouter() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <>default</>,
        errorElement: <>Error Happen</>
      },
      ...AuthRouter,
      ...DashboardRouter
    ],
    { basename: process.env.PUBLIC_URL }
  );
  return <RouterProvider router={router} />;
}

export default memo(IndexRouter);
