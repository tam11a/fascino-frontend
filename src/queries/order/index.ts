import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getOrders = (params: any) => {
	return instance.get(`/order`, {
		params,
	});
};

export const useGetOrders = (params: any) => {
	return useQuery(
		[
			"get-all-order",
			params,
			{
				params,
			},
		],
		() => getOrders(params),
		{
			// enabled: !!vendorId,
			// select: (data: string) => data?.data || [],
		}
	);
};

export const downloadOrders = (params: any) => {
	return instance.get(`/order/download`, {
		params,
		headers: {
			responseType: "blob",
		},
	});
};

export const useDownloadOrders = () => {
	return useMutation(downloadOrders, {
		onSuccess: (data: any) => {
			return new Blob(data);
		},
	});
};

const getOrderById = (id: any) => {
	return instance.get(`/order/${id}`, {
		// params: {},
	});
};

export const useGetOrderById = (id: any) => {
	return useQuery(["get-order-by-id", id], () => getOrderById(id), {
		enabled: !!id,
		// select: (data: string) => data?.data || [],
	});
};

const getInvoiceById = (id: any) => {
	return instance.get(`/order/${id}/invoice`, {
		// params: {},
	});
};

export const useGetInvoiceById = (id: any) => {
	return useQuery(["get-invoice-by-id", id], () => getInvoiceById(id), {
		enabled: !!id,
		select: (data: any) => data?.data,
	});
};

const getItemsByOrderId = (id: any) => {
	return instance.get(`/order/orderlines/${id}`, {
		// params: {},
	});
};

export const useGetItemsByOrderId = (id: any) => {
	return useQuery(["get-items-by-order-id", id], () => getItemsByOrderId(id), {
		enabled: !!id,
		// select: (data: string) => data?.data || [],
	});
};

const postOrder = (data: any) => {
	return instance.post(`/order`, data);
};

export const usePostOrder = () => {
	const queryClient = useQueryClient();
	return useMutation(postOrder, {
		onSuccess: () => {
			queryClient.invalidateQueries(["get-orders"]);
		},
	});
};

const addTransaction = ({ data, id }: { data: any; id: any }) => {
	return instance.patch(`/order/${id}/transaction`, data);
};

export const useAddTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation(addTransaction, {
		onSuccess: () => {
			queryClient.invalidateQueries(["get-order-by-id"]);
		},
	});
};
