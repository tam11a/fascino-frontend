import { useGetProducts } from "@/queries/products";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { IOption } from "../useCategory/type";

const useProduct = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [product, setproduct] = React.useState<IOption[]>([]);
  const { data: prodData, isLoading: prodLoading } = useGetProducts(
    getQueryParams()
  );

  React.useEffect(() => {
    if (!prodData) return;
    var d: IOption[] = [];
    prodData?.data?.data?.map?.(
      (s: {
        _id: string;
        name: string;
        category: {
          name: string;
          _id: string;
        };
        subcategory: {
          name: string;
          _id: string;
        };
      }) => {
        d.push({
          value: s._id,
          label: s.name,
          data: s,
        });
      }
    );
    setproduct(d);
  }, [prodData]);

  return {
    isproductLoading: prodLoading,
    product,
    searchProduct: (value: string) => {
      setSearch(value);
    },
  };
};

export default useProduct;
