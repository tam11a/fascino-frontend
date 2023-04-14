import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateProduct, IUpdateProduct } from "./types";

const getProducts = (params: any) => {
  return instance.get(`/product`, {
    params,
  });
};

export const useGetProducts = (params: any) => {
  return useQuery(["get-all-products", params], () => getProducts(params));
};

const getProductById = (id: any) => {
  return instance.get(`/Product/${id}`, {
    // params: {},
  });
};

export const useGetProductById = (id: any) => {
  return useQuery(["get-product-by-id", id], () => getProductById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const updateProduct = ({
  id,
  data,
}: {
  id: string | undefined;
  data: IUpdateProduct;
}) => {
  return instance.patch(`/product/${id}`, data);
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-product"]);
      queryClient.invalidateQueries(["get-product-by-id"]);
    },
  });
};

const createProduct = (data: ICreateProduct) => {
  return instance.post("/product", data);
};

export const useCreateProducts = () => {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-products"]),
  });
};

const toggleProducts = (id: any) => {
  return instance.put(`product/${id}`);
};

export const useToggleProducts = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleProducts, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-products"]),
  });
};
