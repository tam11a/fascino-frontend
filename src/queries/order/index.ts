import instance from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
