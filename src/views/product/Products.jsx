import React from "react";
import { useGetProductList } from "../../services/queries/hooks/product-hooks";
import useRedirect from "../../common/hooks/useRedirect";

export default function Products() {
  const { data: products } = useGetProductList();
  const { product_data } = products || { products: [] };
  const { redirectTo } = useRedirect();
  const onProductClick = () => {
    redirectTo("product/details");
  };
  return (
    <>
      {product_data &&
        product_data?.length > 0 &&
        product_data?.map((item, key) => {
          const { description, feature_image, name } = item || {
            description: "",
            feature_image: "",
            name: "",
          };
          return (
            <div key={key} onClick={onProductClick}>
              <img src={feature_image} height={100} width={300} />
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
          );
        })}
    </>
  );
}
