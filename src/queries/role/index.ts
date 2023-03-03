import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getRole = () => {
  return instance.get(`/role`, {
    // params: {},
  });
};

export const useGetRole = () => {
  return useQuery(["get-all-role"], () => getRole(), {});
};

const getRoleById = (id: any) => {
  return instance.get(`/role${id}`, {
    // params: {},
  });
};

export const usegGetRoleById = (id: any) => {
  return useQuery(["get-all-role-by-id"], () => getRoleById(id), {
    enabled: !!id,
  });
};
