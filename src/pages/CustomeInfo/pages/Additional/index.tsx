import {
	Button,
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import React from "react";

const Additional: React.FC = () => {
	return (
		<Container
			maxWidth={"xs"}
			className="flex flex-col gap-2 py-4"
		>
			<Typography
				variant="h6"
				className="font-semibold"
			>
				Deletation
			</Typography>
			<List disablePadding>
				<ListItem className="p-0">
					<ListItemText
						primary={"Deactivate the employee account"}
						secondary={"Deactivated account can be activated at any time"}
					/>
					<Button
						color={"error"}
						variant="outlined"
						disabled
					>
						Deactivate
					</Button>
				</ListItem>
				<ListItem className="px-0">
					<ListItemText
						primary={"Delete account"}
						secondary={
							"After deletation the account is permanently removed and can't be restored"
						}
					/>
					<Button
						color={"error"}
						variant="contained"
						disabled
					>
						Delete
					</Button>
				</ListItem>
			</List>
		</Container>
	);
};

export default Additional;
