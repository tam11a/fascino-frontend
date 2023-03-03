import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateEmployee, IUpdateEmployee } from "./types";

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
  return useQuery(["get-employees-by-id", id], () => getEmployeesById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const updateEmployee = ({
  id,
  data,
}: {
  id: string | undefined;
  data: IUpdateEmployee;
}) => {
  return instance.patch(`/employee/${id}`, data);
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-employees"]);
      queryClient.invalidateQueries(["get-employees-by-id"]);
    },
  });
};

const createEmployee = (data: ICreateEmployee) => {
  return instance.post("/employee/register", data);
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(createEmployee, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-employees"]),
  });
};
