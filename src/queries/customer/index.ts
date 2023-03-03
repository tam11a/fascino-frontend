import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateEmployee, IUpdateEmployee } from "./types";

const getCustomers = () => {
  return instance.get(`/customer`, {
    // params: {},
  });
};

export const useGetCustomers = () => {
  return useQuery(["get-all-customer"], () => getCustomers(), {
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
  data: IUpdateEmployee;
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

const createCustomer = (data: ICreateEmployee) => {
  return instance.post("/customer", data);
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation(createCustomer, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-customer"]),
  });
};