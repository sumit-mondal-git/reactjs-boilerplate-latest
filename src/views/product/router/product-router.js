import Default from "../../../layout/Default";
import ProductDetails from "../ProductDetails";
import Products from "../Products";

export const ProductRouter = [
  {
    path: "/product",
    element: <Default />,
    children: [
      {
        path: "list",
        element: <Products />,
      },
      {
        path: "details",
        element: <ProductDetails />,
      },
    ],
  },
];
