// import Iconify from "@components/iconify";
import {
  Button,
  Container,
  //   IconButton,
  List,
  ListItem,
  ListItemText,
  //   Tooltip,
  Typography,
} from "@mui/material";
import { Empty } from "antd";
import React from "react";

const Additional: React.FC = () => {
  return (
    <Container maxWidth={"xs"} className="flex flex-col gap-2 py-4">
      {/* <div className="flex flex-row items-center justify-between">
				<Typography
					variant="h6"
					className="font-semibold"
				>
					Supplier
				</Typography>
				<Tooltip title={"Assign Branch"}>
					<IconButton disabled>
						<Iconify icon={"material-symbols:add"} />
					</IconButton>
				</Tooltip>
			</div> */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed p-3 py-12 mb-6">
        <Empty />
      </div>

      <Typography variant="h6" className="font-semibold">
        Deletation
      </Typography>
      <List disablePadding>
        <ListItem className="p-0">
          <ListItemText
            primary={"Deactivate supplier"}
            secondary={"Deactivated supplier can be activated at any time"}
          />
          <Button color={"error"} variant="outlined" disabled>
            Deactivate
          </Button>
        </ListItem>
        <ListItem className="px-0">
          <ListItemText
            primary={"Delete supplier"}
            secondary={
              "After deletation, the supplier is permanently removed and can't be restored. All the history will be mentioned as 'Deleted Supplier'."
            }
          />
          <Button color={"error"} variant="contained" disabled>
            Delete
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

export default Additional;
