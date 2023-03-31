import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getOrders = (params: any) => {
  return instance.get(`/order`, {
    params,
  });
};

export const useGetOrders = (params: any) => {
  return useQuery(["get-all-order", params], () => getOrders(params), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};

const getOrderById = (id: any) => {
  return instance.get(`/order/${id}`, {
    // params: {},
  });
};

export const useGetOrderById = (id: any) => {
  return useQuery(["get-order-by-id", id], () => getOrderById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const postOrder = (data: any) => {
  return instance.post(`/order`, data);
};

export const usePostOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(postOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-orders"]);
    },
  });
};

const addTransaction = ({ data, id }: { data: any; id: any }) => {
  return instance.patch(`/order/${id}/transaction`, data);
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-order-by-id"]);
    },
  });
};
