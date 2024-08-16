import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
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
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import {
  useGetPatientInfectionStatusQuery,
  useGetTopCampLocationsQuery,
  useGetTotalCampsQuery,
  useGetTotalPatientsQuery,
} from "state/api";

export const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: totalCampsData, isFetching: isFetchingCamps } = useGetTotalCampsQuery();
  const { data: totalPatientsData, isFetching: isFetchingPatients } = useGetTotalPatientsQuery();
  const { data: infectionStatusData, isFetching: isFetchingStatus } = useGetPatientInfectionStatusQuery();
  const { data: topCampLocationsData, isFetching: isFetchingLocations } = useGetTopCampLocationsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
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
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        <StatBox
          title="Total Health Camps"
          value={isFetchingCamps ? 'Loading...' : totalCampsData?.totalCamps || 0}
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Total Patients"
          value={isFetchingPatients ? 'Loading...' : totalPatientsData?.totalPatients || 0}
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Infected Patients"
          value={isFetchingStatus ? 'Loading...' : infectionStatusData?.infectedPatients || 0}
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Non-Infected Patients"
          value={isFetchingStatus ? 'Loading...' : infectionStatusData?.nonInfectedPatients || 0}
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Top Camp Locations
          </Typography>
          <BreakdownChart data={topCampLocationsData} isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};
