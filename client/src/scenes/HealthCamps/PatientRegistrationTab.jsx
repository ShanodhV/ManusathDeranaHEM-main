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
import { useGetCampsQuery } from "state/api";
import PatientListModal from "./PatientListModal";

const PatientRegistrationTab = () => {
  const theme = useTheme();
  const { data: camps, isLoading: isLoadingCamps, error: campError } = useGetCampsQuery();
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (campError) {
      console.error("Error fetching camps:", campError);
      setSnackbar({ open: true, message: "Error fetching health camps", severity: "error" });
    }
  }, [campError]);

  const handleOpenModal = (camp) => {
    setSelectedCamp(camp);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateStr));
  };

  // Filter and sort camps
  const filteredCamps = camps
    ?.filter(
      (camp) =>
        camp.CampId.toLowerCase().includes(searchTerm) ||
        camp.Town.toLowerCase().includes(searchTerm) ||
        camp.District.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Sort by latest date

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" fontWeight="bold">Manage Ptients</Typography>
        <Tooltip title="Search by Camp ID, Town, or District" arrow>
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
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {isLoadingCamps && <Typography>Loading camps...</Typography>}
        {filteredCamps?.map((camp) => (
          <Card key={camp._id} sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h5">{camp.CampId}</Typography>
              <Typography variant="body2">
                {camp.Town}, {camp.District}
              </Typography>
              <Typography variant="body2">{formatDate(camp.Date)}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" variant="outlined" onClick={() => handleOpenModal(camp)}>
                View Patients
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {selectedCamp && (
        <PatientListModal open={openModal} onClose={handleCloseModal} camp={selectedCamp} />
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

export default PatientRegistrationTab;
