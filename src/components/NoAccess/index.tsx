import {
  Avatar,
  // Button,
  Typography,
} from "@mui/material";
import React from "react";
// import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

const NoAccess: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 w-full min-h-[700px] items-center justify-center text-center">
      <Avatar
        variant="square"
        src={"/assets/no_access.svg"}
        className="w-full max-w-sm h-fit"
      />
      <Typography variant={"h5"} className={"font-bold text-primary-700"}>
        Access Denied
      </Typography>
      <Typography>
        You do not have permission to access requested page.
      </Typography>
      {/* <Button
				startIcon={<IoIosArrowBack />}
				onClick={() => navigate(-1)}
			>
				Go Back
			</Button> */}
    </div>
  );
};

export default NoAccess;
