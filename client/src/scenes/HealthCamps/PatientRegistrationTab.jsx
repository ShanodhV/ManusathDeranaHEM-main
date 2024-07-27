import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardActions, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetCampsQuery, useGetPatientsByCampQuery, useDeletePatientMutation } from "state/api";
import PatientListModal from "./PatientListModal";
import CustomButton from "components/Buttons";

const PatientRegistrationTab = () => {
  const theme = useTheme();
  const { data: camps, isLoading: isLoadingCamps, error: campError } = useGetCampsQuery();
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {camps?.map((camp) => (
          <Card key={camp._id} sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h5">{camp.CampId}</Typography>
              <Typography variant="body2">{camp.Town}, {camp.District}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleOpenModal(camp)}>
                View Patients
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <PatientListModal
        open={openModal}
        onClose={handleCloseModal}
        camp={selectedCamp}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientRegistrationTab;
