import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateCustomer, IUpdateCustomer } from "./types";

const getCustomers = (params: any) => {
  return instance.get(`/customer`, {
    params,
  });
};

export const useGetCustomers = (params: any) => {
  return useQuery(["get-all-customer", params], () => getCustomers(params), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};

const getCustomersById = (id: any) => {
  return instance.get(`/customer/${id}`, {
    // params: {},
  });
};

export const useGetCustomersById = (id: any) => {
  return useQuery(["get-customer-by-id", id], () => getCustomersById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const updateCustomer = ({
  id,
  data,
}: {
  id: string | undefined;
  data: IUpdateCustomer;
}) => {
  return instance.patch(`/customer/${id}`, data);
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-customer"]);
      queryClient.invalidateQueries(["get-customer-by-id"]);
    },
  });
};

const createCustomer = (data: ICreateCustomer) => {
  return instance.post("/customer", data);
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation(createCustomer, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-customer"]),
  });
};
