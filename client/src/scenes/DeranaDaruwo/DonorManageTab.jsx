import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { useGetDeranaDaruwoProgramsQuery } from "state/api";
import Buttons from "components/Buttons";
import DonorRegistrationModal from "./DonorRegistrationModal";
import AssignStudentsToDonors from "./AssignStudentsToDonors";
import DonorList from "./DonorList";

const DonorManageTab = () => {
  const theme = useTheme();
  const {
    data: DeranaDaruwo,
    isLoading: isLoadingDeranaDaruwo,
    error: DeranaDaruwoError,
  } = useGetDeranaDaruwoProgramsQuery();

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [openDonorModal, setOpenDonorModal] = useState(false);
  const [openAssignStudentsModal, setOpenAssignStudentsModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDonorModal = () => setOpenDonorModal(true);
  const handleDonorCloseModal = () => setOpenDonorModal(false);

  const handleOpenAssignStudentsModal = (program) => {
    setSelectedProgram(program);
    setOpenAssignStudentsModal(true);
  };

  const handleCloseAssignStudentsModal = () => {
    setOpenAssignStudentsModal(false);
  };

  useEffect(() => {
    if (DeranaDaruwoError) {
      console.error("Error fetching camps:", DeranaDaruwoError);
      setSnackbar({
        open: true,
        message: "Error fetching health camps",
        severity: "error",
      });
    }
  }, [DeranaDaruwoError]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateStr));
  };

  // Filter and sort programs
  const filteredPrograms = DeranaDaruwo?.filter(
    (program) =>
      program.programId.toLowerCase().includes(searchTerm) ||
      program.town.toLowerCase().includes(searchTerm) ||
      program.district.toLowerCase().includes(searchTerm)
  ).sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Sort by latest date

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Manage Donors
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <Tooltip title="Search by Camp ID, Town, or District" arrow>
            <TextField
              label="Search Camps"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: "300px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip> */}
          <Box>
            <Buttons label={"Add Donor"} onClick={handleOpenDonorModal} />
            {/* <DonorRegistrationModal
              openModal={openDonorModal}
              closeModal={handleDonorCloseModal}
            /> */}
              <DonorList
          open={openDonorModal}
          onClose={handleDonorCloseModal}
          program={selectedProgram}
        />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {isLoadingDeranaDaruwo && <Typography>Loading programs...</Typography>}
        {filteredPrograms?.map((program) => (
          <Card key={program._id} sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h5">{program.programId}</Typography>
              <Typography variant="body2">
                {program.town}, {program.district}
              </Typography>
              <Typography variant="body2">{formatDate(program.Date)}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                variant="outlined"
                onClick={() => handleOpenAssignStudentsModal(program)}
              >
                ASSIGN DONOR
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {selectedProgram && (
        <AssignStudentsToDonors
          open={openAssignStudentsModal}
          onClose={handleCloseAssignStudentsModal}
          program={selectedProgram}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DonorManageTab;