import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateCategory, IUpdateCategory } from "./types";

const getCategories = (params: any) => {
  return instance.get(`/category`, {
    params,
  });
};

export const useGetCategories = (params: any) => {
  return useQuery(["get-all-category", params], () => getCategories(params), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};

const getCategoriesById = (id: any) => {
  return instance.get(`/category/${id}`, {
    // params: {},
  });
};

export const useGetCategoriesById = (id: any) => {
  return useQuery(["get-category-by-id", id], () => getCategoriesById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const updateCategory = ({
  id,
  data,
}: {
  id: string | undefined;
  data: IUpdateCategory;
}) => {
  return instance.patch(`/category/${id}`, data);
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-category"]);
      queryClient.invalidateQueries(["get-category-by-id"]);
    },
  });
};

const createCategory = (data: ICreateCategory) => {
  return instance.post("/category", data);
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(createCategory, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-category"]),
  });
};
