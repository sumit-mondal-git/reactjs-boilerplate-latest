import React, { memo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Navigate,
  Route,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthRouter } from "../views/auth/router/auth-router";
import { DashboardRouter } from "../views/dashboard/router/dashboard-router";
import { ProductRouter } from "../views/product/router/product-router";

function IndexRouter() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <>default</>,
        errorElement: <>Error Happen</>,
      },
      ...AuthRouter,
      ...DashboardRouter,
      ...ProductRouter,
    ],
    { basename: process.env.PUBLIC_URL }
  );
  return <RouterProvider router={router} />;
}

export default memo(IndexRouter);
