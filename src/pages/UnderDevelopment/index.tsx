import { Alert, Avatar, Container } from "@mui/material";
import React from "react";

const UnderDevelopment: React.FC = () => {
	return (
		<Container>
			<div className="h-[70vh] max-h-full flex flex-col items-center justify-center gap-2">
				<Avatar
					src={"/development.svg"}
					sx={{
						width: "90%",
						maxWidth: "560px",
						height: "auto",
					}}
					variant={"square"}
				/>
			</div>
			<Alert
				severity="error"
				className="mx-auto max-w-fit"
			>
				This Section is in Development Phase.
			</Alert>
		</Container>
	);
};

export default UnderDevelopment;
