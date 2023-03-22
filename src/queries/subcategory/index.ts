import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getSubcategories = (params: any) => {
	return instance.get(`/subcategory`, {
		params,
	});
};

export const useGetSubcategories = (params: any) => {
	return useQuery(["get-all-subcategories", params], () =>
		getSubcategories(params)
	);
};
