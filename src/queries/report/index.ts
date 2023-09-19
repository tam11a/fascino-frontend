import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getGlobalReport = (params?: any) => {
	return instance.get(`/report/global`, {
		params,
	});
};

export const useGetGlobalReport = (params?: any) => {
	return useQuery(
		[
			"get-global-report",
			params,
			{
				params,
			},
		],
		() => getGlobalReport(params),
		{
			// enabled: !!vendorId,
			select: (data: any) => data?.data || {},
		}
	);
};
