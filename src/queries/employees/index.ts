import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getEmployees = () => {
  return instance.get(`/employee`, {
    // params: {},
  });
};

export const useGetEmployees = () => {
  return useQuery(["get-all-employees"], () => getEmployees(), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};

const getEmployeesById = (id: any) => {
  return instance.get(`/employee/${id}`, {
    // params: {},
  });
};

export const useGetEmployeesById = (id: any) => {
  return useQuery(["get-employees-by-id"], () => getEmployeesById(id), {
    // enabled: !!vendorId,
    // select: (data: string) => data?.data || [],
  });
};
