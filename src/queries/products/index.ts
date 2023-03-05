import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getProducts = (params: any) => {
  return instance.get(`/product`, {
    params,
  });
};

export const useGetProducts = (params: any) => {
  return useQuery(["get-all-products", params], () => getProducts(params));
};
