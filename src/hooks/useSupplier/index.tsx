import { useGetSuppliers } from "@/queries/suppliers";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { IOption } from "../useCategory/type";

const useSupplier = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [Supplier, setSupplier] = React.useState<IOption[]>([]);
  const { data: supplierData, isLoading: supplierLoading } = useGetSuppliers(
    getQueryParams()
  );

  React.useEffect(() => {
    if (!supplierData) return;
    var d: IOption[] = [];
    supplierData?.data?.data?.map?.((s: { _id: string; name: string }) => {
      d.push({
        value: s._id,
        label: s.name,
        data: s,
      });
    });
    setSupplier(d);
  }, [supplierData]);

  return {
    isSupplierLoading: supplierLoading,
    Supplier,
    searchSupplier: (value: string) => {
      setSearch(value);
    },
  };
};

export default useSupplier;
