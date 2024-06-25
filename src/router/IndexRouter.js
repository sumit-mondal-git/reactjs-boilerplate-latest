import React, { memo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Navigate,
  Route,
  createHashRouter,
  createRoutesFromElements
} from 'react-router-dom';

function IndexRouter() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <>Hi hi</>,

      },
      // ...IndexRouters,
    ],
    { basename: process.env.PUBLIC_URL }
  );
  return <RouterProvider router={router} />;
}

export default memo(IndexRouter);
