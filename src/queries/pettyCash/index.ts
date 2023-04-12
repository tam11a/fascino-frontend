import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICash } from "@/queries/pettyCash/types";

//get pettycash by branch
const getPettyCash = (params: any) => {
  return instance.get(`/petty-cash`, {
    params,
  });
};

export const useGetPettyCash = (params: any) => {
  return useQuery(["get-all-petty-cash", params], () => getPettyCash(params), {
    // enabled: !!vendorId,
    // branch: (data: string) => data?.data || [],
  });
};

//create pettycash
const createPettyCash = (data: ICash) => {
  return instance.post("/branch", data);
};

export const useCreatePettyCash = () => {
  const queryClient = useQueryClient();
  return useMutation(createPettyCash, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-petty-cash"]),
  });
};
