import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useToggle } from "@tam11a/react-use-hooks";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeColumn from "./components/EmployeeColumn";
// import { AccessMargin } from "@tam11a/react-use-access";
// import defaultPermissions from "@/utilities/defaultPermissions";
import { useGetEmployees } from "@/queries/employees";
// import { t } from "i18next";

const DataTable = React.lazy(() => import("@/components/Datatable"));

const Employees: React.FC = () => {
	const { data, isLoading } = useGetEmployees();
	const { state: open, toggleState: onClose } = useToggle(false);


	return (
		<>
			<Container
				maxWidth={"lg"}
				sx={{
					maxWidth: "1500px !important",
				}}
			>
				<Grid
					container
					rowGap={2}
					direction="column"
					marginTop={4}
				>
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography
							variant="subtitle1"
							fontWeight={700}
						>
							{/* {t("employee:EmployeeList")} */}
							Employee List
						</Typography>
						{/* <AccessMargin to={defaultPermissions.EMPLOYEES.FULL}> */}
						<Button
							variant="contained"
							onClick={() => onClose()}
						>
							{/* {t("employee:CreateEmployee")} */}
							Create Employee
						</Button>
						{/* </AccessMargin> */}
					</Grid>
					<Grid item>
						<DataTable
							columns={EmployeeColumn()}
							rows={data?.data?.data || []}
							isLoading={isLoading}
							getRowId={(r: any) => r?._id || r.id}
						/>
					</Grid>
				</Grid>

				{/* Dialog Box */}
				<CreateEmployee
					open={open}
					onClose={onClose}
				/>
			</Container>
		</>
	);
};

export default Employees;
