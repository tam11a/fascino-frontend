import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getItem = (params: any) => {
  return instance.get(`/item`, {
    params,
  });
};

export const useGetItem = (params: any) => {
  return useQuery(
    [
      "get-all-item",
      params,
      {
        params,
      },
    ],
    () => getItem(params)
  );
};

const getItemById = (id: any) => {
  return instance.get(`/item/${id}`);
};

export const useGetItemById = (id: any) => {
  return useQuery(["get-item-by-id", id], () => getItemById(id));
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
