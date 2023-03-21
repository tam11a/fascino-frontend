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
    <Container maxWidth={"xs"} className="flex flex-col gap-2 py-4">
      <Typography variant="h6" className="font-semibold">
        Deletation
      </Typography>
      <List disablePadding>
        <ListItem className="p-.5">
          <ListItemText
            primary={"Deactivate tailor"}
            secondary={"Deactivated tailor can be activated at any time"}
          />
          <Button color={"error"} variant="outlined" disabled>
            Deactivate
          </Button>
        </ListItem>
        <ListItem className="px-.5">
          <ListItemText
            primary={"Delete tailor"}
            secondary={
              "After deletation the tailor and product items will be permanently removed from all branch and can't be restored"
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
