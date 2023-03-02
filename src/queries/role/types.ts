import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getRoles = () => {
  return instance.get(`/role`, {
    // params: {
    //   vendorId,
    // },
  });
};

export const useGetRoles = () => {
  return useQuery(["get-roles"], () => getRoles(), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};
