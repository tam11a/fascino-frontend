import React from "react";
import useUser from "@/hooks/useUser";
import { Avatar, Container, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
	const user = useUser();
	return (
		<Container className="pt-12">
			<div className="h-[70vh] max-h-full flex flex-col items-center justify-center gap-2">
				<Avatar
					src={"/dashboard.svg"}
					sx={{
						width: "90%",
						maxWidth: "780px",
						height: "auto",
					}}
					variant={"square"}
				/>
			</div>
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
		</Container>
	);
};

export default Dashboard;
