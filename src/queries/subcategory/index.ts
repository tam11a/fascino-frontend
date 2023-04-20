import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateSubcategory, IUpdateSubcategory } from "./types";

const getSubcategories = (params: any) => {
  return instance.get(`/subcategory`, {
    params,
  });
};

export const useGetSubcategories = (params: any) => {
  return useQuery(["get-all-subcategories", params], () =>
    getSubcategories(params)
  );
};

const getSubcategoriesById = (id: any) => {
  return instance.get(`/subcategory/${id}`, {
    // params: {},
  });
};

export const useGetSubcategoriesById = (id: any) => {
  return useQuery(
    ["get-subategories-by-id", id],
    () => getSubcategoriesById(id),
    {
      enabled: !!id,
      // select: (data: string) => data?.data || [],
    }
  );
};

const updateSubcategory = ({
  id,
  data,
}: {
  id: string | undefined;
  data: IUpdateSubcategory;
}) => {
  return instance.patch(`/subcategory/${id}`, data);
};

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSubcategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-subcategories"]);
      queryClient.invalidateQueries(["get-subcategory-by-id"]);
    },
  });
};

const createSubcategory = (data: ICreateSubcategory) => {
  return instance.post("/subcategory", data);
};

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation(createSubcategory, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-subcategories"]),
  });
};

const toggleSubcategory = (id: any) => {
  return instance.put(`subcategory/${id}`);
};

export const useToggleSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleSubcategory, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-subcategories"]),
  });
};
