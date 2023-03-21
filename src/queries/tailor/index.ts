import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITailor } from "./types";

const getTailor = (params: any) => {
  return instance.get(`/tailor`, {
    params,
  });
};

export const useGetTailor = (params: any) => {
  return useQuery(["get-all-tailor", params], () => getTailor(params), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};

const getTailorById = (id: any) => {
  return instance.get(`/tailor/${id}`, {
    // params: {},
  });
};

export const useGetTailorById = (id: any) => {
  return useQuery(["get-tailor-by-id", id], () => getTailorById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const updateTailor = ({
  id,
  data,
}: {
  id: string | undefined;
  data: ITailor;
}) => {
  return instance.patch(`/tailor/${id}`, data);
};

export const useUpdateTailor = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTailor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-tailor"]);
      queryClient.invalidateQueries(["get-tailor-by-id"]);
    },
  });
};

const createTailor = (data: ITailor) => {
  return instance.post("/tailor", data);
};

export const useCreateTailor = () => {
  const queryClient = useQueryClient();
  return useMutation(createTailor, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-tailor"]),
  });
};
