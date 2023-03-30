import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateCategory } from "./types";

const getCategories = (params: any) => {
  return instance.get(`/Category`, {
    params,
  });
};

export const useGetCategories = (params: any) => {
  return useQuery(["get-all-Category", params], () => getCategories(params), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};

// const getCategoriesById = (id: any) => {
//   return instance.get(`/Category/${id}`, {
//     // params: {},
//   });
// };

// export const useGetCategoriesById = (id: any) => {
//   return useQuery(["get-Category-by-id", id], () => getCategoriesById(id), {
//     enabled: !!id,
//     // select: (data: string) => data?.data || [],
//   });
// };

// const updateCategory = ({
//   id,
//   data,
// }: {
//   id: string | undefined;
//   data: IUpdateCategory;
// }) => {
//   return instance.patch(`/Category/${id}`, data);
// };

// export const useUpdateCategory = () => {
//   const queryClient = useQueryClient();
//   return useMutation(updateCategory, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["get-all-Category"]);
//       queryClient.invalidateQueries(["get-Category-by-id"]);
//     },
//   });
// };

const createCategory = (data: ICreateCategory) => {
  return instance.post("/Category", data);
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(createCategory, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-Category"]),
  });
};
