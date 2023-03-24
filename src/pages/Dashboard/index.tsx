import React from "react";
import useUser from "@/hooks/useUser";
import { Avatar, Container, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
	const user = useUser();
	return (
		<Container>
			<div className="min-h-[85vh] flex flex-col items-center justify-center gap-2">
				<Avatar
					src={"/dashboard.svg"}
					sx={{
						width: "90%",
						maxWidth: "520px",
						height: "auto",
						flex: 1,
					}}
					variant={"square"}
				/>
				<div className="mx-auto w-fit">
					<Typography variant="h6">
						Welcome{" "}
						<b>
							{user.firstName} {user.lastName}.
						</b>
					</Typography>
					<Typography variant="body2">
						You are currently designated as <b>{user.role.name}</b> of Fascino.
						You have {user.permissions?.length} access permissions.
					</Typography>
				</div>
			</div>
		</Container>
	);
};

export default Dashboard;
