import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getGlobalReport = (params?: any) => {
	return instance.get(`/report/global`, {
		params,
	});
};

export const useGetGlobalReport = (params?: any) => {
	return useQuery(
		["get-global-report", params, { params }],
		() => getGlobalReport(params),
		{
			select: (data: any) => data?.data || {},
		}
	);
};

const getRangeReport = (params?: any) => {
	return instance.get(`/report/range`, {
		params,
	});
};

export const useGetRangeReport = (params?: any) => {
	return useQuery(
		["get-range-report", params, { params }],
		() => getRangeReport(params),
		{
			select: (data: any) => data?.data || {},
		}
	);
};
