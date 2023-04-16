import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IBranch, IUpdatejunction } from "./types";

const getBranch = (params: any) => {
  return instance.get(`/branch`, {
    params,
  });
};

export const useGetBranch = (params: any) => {
  return useQuery(["get-all-branch", params], () => getBranch(params), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};

const getBranchById = (id: any) => {
  return instance.get(`/branch/${id}`, {
    // params: {},
  });
};

export const useGetBranchById = (id: any) => {
  return useQuery(["get-branch-by-id", id], () => getBranchById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const createBranch = (data: IBranch) => {
  return instance.post("/branch", data);
};

export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation(createBranch, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-branch"]),
  });
};

const updateBranch = ({
  id,
  data,
}: {
  id: string | undefined;
  data: IBranch;
}) => {
  return instance.patch(`/branch/${id}`, data);
};

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBranch, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-branch"]);
      queryClient.invalidateQueries(["get-branch-by-id"]);
    },
  });
};

const toggleBranch = (id: any) => {
  return instance.put(`branch/${id}`);
};

export const useToggleBranch = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleBranch, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-branch"]),
  });
};

const getBranchJunction = (params: any) => {
  return instance.get(`/branchjunction`, {
    params,
  });
};

export const useGetBranchJuntion = (params: any) => {
  return useQuery(
    [
      "get-branch-by-id",
      params,
      {
        params,
      },
    ],
    () => getBranchJunction(params)
  );
};

const updateJunction = ({
  id,
  params,
}: {
  id: any;
  params: IUpdatejunction;
}) => {
  return instance.post(`branch/${id}`, {}, { params });
};

export const useUpdateJunction = () => {
  const queryClient = useQueryClient();
  return useMutation(updateJunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-branch"]);
      queryClient.invalidateQueries(["get-branch-by-id"]);
    },
  });
};

const deleteJunction = (id: any) => {
  return instance.delete(`/branchjunction/${id}`);
};

export const usedeleteJunction = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteJunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-branch"]);
      queryClient.invalidateQueries(["get-branch-by-id"]);
    },
  });
};
