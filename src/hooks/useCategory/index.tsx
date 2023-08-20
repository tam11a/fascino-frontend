import { useGetSubcategories } from "@/queries/subcategory";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { IOption } from "./type";

const useCategory = () => {
	const { setSearch, getQueryParams } = usePaginate({
		defaultParams: {
			limit: 200,
		},
	});

	const [catNSubcat, setCatNSubcat] = React.useState<IOption[]>([]);
	const { data: subcatData, isLoading: subcatLoading } = useGetSubcategories(
		getQueryParams()
	);

	React.useEffect(() => {
		if (!subcatData) return;
		var d: { [key: string]: IOption } = {};
		subcatData?.data?.data?.map?.(
			(s: {
				_id: string;
				name: string;
				category: {
					name: string;
					_id: string;
				};
			}) => {
				if (!d?.[s?.category?._id])
					d[s?.category?._id] = {
						label: s?.category?.name,
						value: s?.category?._id,
						children: [],
					};

				d[s?.category?._id].children?.push({
					label: s.name,
					value: s._id,
				});
			}
		);
		setCatNSubcat(Object.values(d));
	}, [subcatData]);

	return {
		isCatNSubcatLoading: subcatLoading,
		catNSubcat,
		searchCatNSubcat: (value: string) => {
			setSearch(value);
		},
	};
};

export default useCategory;
