import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ISupplier } from "./types";

const getSuppliers = (params: any) => {
  return instance.get(`/supplier`, {
    params,
  });
};

export const useGetSuppliers = (params: any) => {
  return useQuery(["get-all-Suppliers", params], () => getSuppliers(params));
};

const getSuppliersById = (id: any) => {
  return instance.get(`/supplier/${id}`, {
    // params: {},
  });
};

export const useGetSuppliersById = (id: any) => {
  return useQuery(["get-Suppliers-by-id", id], () => getSuppliersById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const updateSupplier = ({
  id,
  data,
}: {
  id: string | undefined;
  data: ISupplier;
}) => {
  return instance.patch(`/supplier/${id}`, data);
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-Suppliers"]);
      queryClient.invalidateQueries(["get-Suppliers-by-id"]);
    },
  });
};

const createSupplier = (data: ISupplier) => {
  return instance.post("/supplier", data);
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation(createSupplier, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-Suppliers"]),
  });
};
