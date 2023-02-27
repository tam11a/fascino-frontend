const defaultPermissions = {
	DASHBOARD: {
		READ: "DashboardReadOnly",
		FULL: "DashboardRead&Write",
	},
	INFORMATION: {
		OVERVIEW: {
			READ: "InformationOverviewReadOnly",
			FULL: "InformationOverviewRead&Write",
		},
		CONTACT: {
			READ: "InfomationContactReadOnly",
			FULL: "InfomationContactRead&Write",
		},
		MENU: {
			READ: "InformationMenuReadOnly",
			FULL: "InformationMenuRead&Write",
		},
		GALLERY: {
			READ: "InformationGalleryReadOnly",
			FULL: "InformationGalleryRead&Write",
		},
		OPENING_HOURS: {
			READ: "InformationOpeningHoursReadOnly",
			FULL: "InformationOpeningHoursRead&Write",
		},
	},
	RESERVATION: {
		READ: "ReservationReadOnly",
		FULL: "ReservationRead&Write",
	},
	ROLES: {
		READ: "RolesReadOnly",
		FULL: "RolesRead&Write",
	},
	EMPLOYEES: {
		READ: "EmployeesReadOnly",
		FULL: "EmployeesRead&Write",
	},
};
export default defaultPermissions;
