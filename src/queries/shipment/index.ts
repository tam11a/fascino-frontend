import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IShipment } from "./types";

const getShipment = (params: any) => {
  return instance.get(`/shipment`, {
    params,
  });
};

export const useGetShipment = (params: any) => {
  return useQuery(["get-all-Shipment", params], () => getShipment(params));
};

const getShipmentById = (id: any) => {
  return instance.get(`/shipment/${id}`, {
    // params: {},
  });
};

export const useGetShipmentById = (id: any) => {
  return useQuery(["get-Shipment-by-id", id], () => getShipmentById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

// const updateshipment = ({
//   id,
//   data,
// }: {
//   id: string | undefined;
//   data: any;
// }) => {
//   return instance.patch(`/shipment/${id}`, data);
// };

// export const useUpdateshipment = () => {
//   const queryClient = useQueryClient();
//   return useMutation(updateshipment, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["get-all-Shipment"]);
//       queryClient.invalidateQueries(["get-Shipment-by-id"]);
//     },
//   });
// };

const createshipment = (data: IShipment) => {
  return instance.post("/shipment", data);
};

export const useCreateshipment = () => {
  const queryClient = useQueryClient();
  return useMutation(createshipment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-Shipment"]);
      queryClient.invalidateQueries(["get-all-item"]);
    },
  });
};
