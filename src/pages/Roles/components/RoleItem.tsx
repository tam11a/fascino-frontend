import { useGetRoleById } from "@/queries/role";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItemText,
  ListSubheader,
  Skeleton,
  Typography,
} from "@mui/material";
import NotFound from "@pages/NotFound";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import {
  MdClose,
  // MdDeleteOutline
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateDialog from "./UpdateDialog";
import { useToggle } from "@tam11a/react-use-hooks";

const RoleItem: React.FC = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const [role_id, setRoleId] = React.useState(
    location.pathname?.split?.("/")[3]
  );

  React.useEffect(() => {
    setRoleId(location.pathname?.split?.("/")[3]);
  }, [location]);

  const { data, isLoading, isError } = useGetRoleById(role_id);
  const { state: openDialog, toggleState: onClose } = useToggle(false);

  return !role_id ? (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <Avatar
        src={"/select-role.svg"}
        sx={{
          width: "90%",
          maxWidth: "460px",
          height: "auto",
        }}
        className="mx-auto"
        variant={"square"}
      />
      <Typography variant="h6" className="font-semibold text-center">
        Select a Role
      </Typography>
      <Typography variant="body2" className="text-center">
        A role determines which permissions the system grants to the user.
      </Typography>
    </div>
  ) : isError ? (
    <div className="relative h-full">
      <NotFound />
    </div>
  ) : (
    <>
      <List
        disablePadding
        sx={{
          // height: inDialog
          //     ? "100vh"
          //     : { xs: "calc(100vh - 174px)", md: "calc(100vh - 110px)" },
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <UpdateDialog
          open={openDialog}
          onClose={onClose}
          selected={data?.data?.data || {}}
        />
        <ListSubheader
          sx={{
            // bgcolor: "#F4F5F7",
            m: 1,
            p: 0.5,
            px: 1.7,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ListItemText
            primary={
              isLoading ? <Skeleton className="w-11" /> : data?.data?.data?.name
            }
            secondary={`${data?.data?.data?.permissions?.length || 0} ${
              (data?.data?.data?.permissions?.length || 0) > 1
                ? "Permissions"
                : "Permission"
            } • ${
              data?.data?.data?.isEditable === false
                ? "Not Editable"
                : "Editable"
            }`}
            primaryTypographyProps={{
              fontWeight: "700",
              color: "#000",
            }}
          />
          <div>
            <IconButton
              color={"primary"}
              onClick={onClose}
              // size={inDialog ? "small" : "medium"}
            >
              <FiEdit2 />
            </IconButton>
            {/* <IconButton
							color={"error"}
							disabled={true}
						>
							<MdDeleteOutline />
						</IconButton> */}
            <IconButton
              onClick={() => navigate("/app/roles", { replace: true })}
            >
              <MdClose />
            </IconButton>
          </div>
        </ListSubheader>
        <Divider flexItem sx={{ borderStyle: "dashed" }} />
        {data?.data?.data?.permissions?.map?.((d: any) => (
          <ListItemText
            primary={d?.description || "Untitled"}
            secondary={`${d?.keyword}`}
            sx={{
              borderRadius: 1,
              bgcolor: d?.keyword?.includes("FullAccess")
                ? "#FCF4F4"
                : "#F4F7FC",
              m: 1,
              p: 1.5,
            }}
            secondaryTypographyProps={{
              fontSize: "0.7em",
            }}
            key={d._id}
          />
        ))}
      </List>
    </>
  );
};

export default RoleItem;
