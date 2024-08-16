import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  HealthAndSafety,
  People,
  Person2,
  Person2Outlined,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "components/StatBox";
import {
  useGetPatientInfectionStatusQuery,
  useGetTopCampLocationsQuery,
  useGetTotalCampsQuery,
  useGetTotalPatientsQuery,
  useGetTotalVolunteersQuery
} from "state/api";

export const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: totalCampsData, isFetching: isFetchingCamps } = useGetTotalCampsQuery();
  const { data: totalPatientsData, isFetching: isFetchingPatients } = useGetTotalPatientsQuery();
  const { data: infectionStatusData, isFetching: isFetchingStatus } = useGetPatientInfectionStatusQuery();
  const { data: topCampLocationsData, isFetching: isFetchingLocations } = useGetTopCampLocationsQuery();
  const { data: volunteers, isFetching: isFetchingvol } = useGetTotalVolunteersQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          {/* <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button> */}
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="200px" // Increased the auto rows size
        gap="30px" // Increased the gap between cards
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? "span 4" : "span 12", // Cards will span 4 columns on large screens
            backgroundColor: theme.palette.background.paper, // Enhanced background color
            borderRadius: "10px", // Added border radius
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Added shadow for a modern look
            transition: "transform 0.2s ease-in-out", // Smooth hover effect
            "&:hover": {
              transform: "scale(1.05)", // Slightly scale up the card on hover
            },
          },
        }}
      >
        <StatBox
          title="Total Health Camps"
          value={isFetchingCamps ? 'Loading...' : totalCampsData?.totalCamps || 0}
          icon={<HealthAndSafety sx={{ color: theme.palette.secondary[300], fontSize: "30px" }} />} // Increased icon size
        />

        <StatBox
          title="Total Patients"
          value={isFetchingPatients ? 'Loading...' : totalPatientsData?.totalPatients || 0}
          icon={<Person2 sx={{ color: theme.palette.secondary[300], fontSize: "30px" }} />} // Increased icon size
        />

        <StatBox
          title="Infected Patients"
          value={isFetchingStatus ? 'Loading...' : infectionStatusData?.infectedPatients || 0}
          icon={<Person2Outlined sx={{ color: theme.palette.secondary[300], fontSize: "30px" }} />} // Increased icon size
        />

        <StatBox
          title="Non-Infected Patients"
          value={isFetchingStatus ? 'Loading...' : infectionStatusData?.nonInfectedPatients || 0}
          icon={<People sx={{ color: theme.palette.secondary[300], fontSize: "30px" }} />} // Increased icon size
        />

        <StatBox
          title="Total Volunteers"
          value={isFetchingvol ? 'Loading...' : volunteers?.totalvol || 0}
          icon={<People sx={{ color: theme.palette.secondary[300], fontSize: "30px" }} />} // Increased icon size
        />
      </Box>
    </Box>
  );
};
