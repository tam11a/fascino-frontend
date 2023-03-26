import instance from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const getItemById = (id: string) => {
  return instance.get(`/item/${id}`);
};

export const useGetItemById = () => {
  const queryClient = useQueryClient();
  return useMutation(getItemById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-item-by-id"]);
    },
  });
};

const getScanById = (id: string) => {
  return instance.get(`/scan/${id}`);
};

export const useGetScanById = () => {
  const queryClient = useQueryClient();
  return useMutation(getScanById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-scan-by-id"]);
    },
  });
};
