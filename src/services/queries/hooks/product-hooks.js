import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ALL_PRODUCT_LIST } from "../constants/product-constants";
import { GET_PRODUCT_LIST } from "../../endpoint/product-endpoints";
import axiosInstance from "../../helper/axiosInstance";
import productList from "../../dummy-data/product-list.json";

const staleTime = 30000;
const cacheTime = 60000;

export const useGetProductList = () => {
  console.log("useGetProductList", productList);
  return useQuery({
    queryKey: [ALL_PRODUCT_LIST],
    queryFn: () => {
      const data = axiosInstance.get(GET_PRODUCT_LIST);
      return productList;
    },
    // enabled: !!enabled,
    refetchOnWindowFocus: false,
    cacheTime,
    staleTime,
  });
};
