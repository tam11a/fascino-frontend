import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getEmployees = () => {
  return instance.get(`/employee`, {
    // params: {},
  });
};

export const useGetEmployees = () => {
  return useQuery(["get-employees"], () => getEmployees(), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};
