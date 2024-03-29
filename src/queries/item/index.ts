import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUpdateItem } from "./types";

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

const updateItem = ({ data }: { data: IUpdateItem }) => {
  return instance.put("/item", data);
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation(updateItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-item"]);
      queryClient.invalidateQueries(["get-item-by-id"]);
    },
  });
};

const getScanById = ({
  id,
  params,
}: {
  id: string;
  params?: { [key: string]: any };
}) => {
  return instance.get(`/scan/${id}`, {
    params,
  });
};

export const useGetScanById = () => {
  const queryClient = useQueryClient();
  return useMutation(getScanById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-scan-by-id"]);
    },
  });
};

const returnItem = (id: string) => {
  return instance.post(`/return/${id}`);
};

export const useReturnItem = () => {
  const queryClient = useQueryClient();
  return useMutation(returnItem, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-item"]),
  });
};

const returnStitchedItem = (id: string | undefined) => {
  return instance.put(`/item/${id}`);
};

export const useReturnStitchedItem = () => {
  const queryClient = useQueryClient();
  return useMutation(returnStitchedItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-item"]);
      queryClient.invalidateQueries(["get-item-by-id"]);
    },
  });
};
