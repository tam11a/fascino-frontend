import React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import CustomNoRowsOverlay from "@/components/CustomNoOverlay";
import { Paper } from "@mui/material";
import { IDataTable } from "@/types";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: "#F1F1F1",
    "&:hover, &.Mui-hovered": {
      backgroundColor: "#F4F4F4",
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const DataTable: React.FC<IDataTable> = ({
  columns,
  rows,
  isLoading,
  getRowId,
  rowCount,
  paginationMode,
  page,
  onPageChange,
  pageSize,
  onPageSizeChange,
  checkboxSelection,
  onSelectionModelChange,
  selectionModel,
  keepNonExistentRowsSelected,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: isLoading || !rows.length ? "400px" : "fit-content",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#E5E5E5",
          color: "black",
          fontWeight: 900,
          fontSize: 14,
        },
      }}
      className="border-solid border-2 border-gray-100 p-2 pb-0"
    >
      <StripedDataGrid
        disableColumnMenu
        disableColumnFilter
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        autoHeight={!(isLoading || !rows.length)}
        columns={columns}
        rows={rows}
        loading={isLoading}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        getRowId={getRowId}
        sx={{
          border: "none",
          "& *": {
            border: "none !important",
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
            {
              outline: "none !important",
            },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        rowCount={rowCount}
        paginationMode={paginationMode}
        page={page}
        onPageChange={onPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        checkboxSelection={checkboxSelection}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        keepNonExistentRowsSelected={keepNonExistentRowsSelected}
      />
    </Paper>
  );
};

export default DataTable;
