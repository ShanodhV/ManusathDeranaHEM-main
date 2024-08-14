// DataViewerTab.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetCampsQuery,
  useLazyGetFilteredCampsQuery,
  useLazyGetPatientsByCampdvQuery,
} from "state/api";

const DataViewerTab = () => {
  const { data: camps, isLoading, error } = useGetCampsQuery();
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [infectedFilter, setInfectedFilter] = useState("");
  const [selectedCampIds, setSelectedCampIds] = useState([]);

  const [getFilteredCamps, { data: filteredCamps, isLoading: campsLoading }] =
    useLazyGetFilteredCampsQuery();
  const [
    getPatientsByCamp,
    { data: patients, isLoading: patientsLoading, error: patientsError },
  ] = useLazyGetPatientsByCampdvQuery();

  useEffect(() => { 
    if (province || district || town) {
      getFilteredCamps({ province, district, town });
    }
  }, [province, district, town, getFilteredCamps]);

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistrict("");
    setTown("");
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
    setTown("");
  };

  const handleTownChange = (event) => {
    setTown(event.target.value);
  };

  const handleInfectedFilterChange = (event) => {
    setInfectedFilter(event.target.value);
  };



const handleFetchPatients = () => {
  if (selectedCampIds.length === 0) {
    console.error("No campIds selected.");
    return;
  }

  const validInfectedFilter = infectedFilter === "" ? undefined : infectedFilter;
  const campIds = selectedCampIds.join(",");  // Ensure this is a string

  console.log("Fetching patients with parameters:", {
    campIds,
    infected: validInfectedFilter,
  });

  // Call the query with the correct parameter structure
  getPatientsByCamp({
    campIds,   // Pass campIds as a comma-separated string
    infected: validInfectedFilter,
  });
};


  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography ml={2}>Loading camps...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">Error loading camps: {error.message}</Alert>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Data Viewer
      </Typography>

      <Box mb={3} display="flex" gap={2}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Province</InputLabel>
          <Select value={province} onChange={handleProvinceChange} label="Province">
            {Array.from(new Set(camps?.map((camp) => camp.Province))).map(
              (province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 200 }} disabled={!province}>
          <InputLabel>District</InputLabel>
          <Select value={district} onChange={handleDistrictChange} label="District">
            {Array.from(
              new Set(
                camps
                  ?.filter((camp) => camp.Province === province)
                  .map((camp) => camp.District)
              )
            ).map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 200 }} disabled={!district}>
          <InputLabel>Town</InputLabel>
          <Select value={town} onChange={handleTownChange} label="Town">
            {Array.from(
              new Set(
                camps
                  ?.filter((camp) => camp.District === district)
                  .map((camp) => camp.Town)
              )
            ).map((town) => (
              <MenuItem key={town} value={town}>
                {town}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mb={4}>
        <Typography variant="h5">Filtered Camps</Typography>
        {campsLoading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
            <Typography ml={2}>Loading filtered camps...</Typography>
          </Box>
        ) : (
          <Box sx={{ height: 400, width: "100%", mt: 2 }}>
            <DataGrid
              rows={filteredCamps || []}
              columns={[
                { field: "CampId", headerName: "Camp ID", width: 150 },
                { field: "Province", headerName: "Province", width: 150 },
                { field: "District", headerName: "District", width: 150 },
                { field: "Town", headerName: "Town", width: 150 },
                { field: "Date", headerName: "Date", width: 150 },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              onSelectionModelChange={(newSelection) =>
                setSelectedCampIds(newSelection)
              }
              getRowId={(row) => row._id}
            />
          </Box>
        )}
      </Box>

      <Box mb={3} display="flex" gap={2}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Infection Status</InputLabel>
          <Select
            value={infectedFilter}
            onChange={handleInfectedFilterChange}
            label="Infection Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Infected</MenuItem>
            <MenuItem value="false">Non-Infected</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchPatients}
          disabled={!selectedCampIds.length}
        >
          Fetch Patients
        </Button>
      </Box>

      {patientsLoading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
          <Typography ml={2}>Loading patients...</Typography>
        </Box>
      ) : patientsError ? (
        <Alert severity="error">Error loading patients: {patientsError.message}</Alert>
      ) : (
        <Box mb={4}>
          <Typography variant="h5">Patients in Selected Camps</Typography>
          <Box sx={{ height: 400, width: "100%", mt: 2 }}>
            <DataGrid
              rows={patients || []}
              columns={[
                { field: "patientId", headerName: "Patient ID", width: 150 },
                { field: "name", headerName: "Name", width: 150 },
                { field: "NIC", headerName: "NIC", width: 150 },
                { field: "phone", headerName: "Phone", width: 150 },
                { field: "address", headerName: "Address", width: 150 },
                {
                  field: "emergencyPhone",
                  headerName: "Emergency Phone",
                  width: 150,
                },
                {
                  field: "infected",
                  headerName: "Infected",
                  width: 150,
                  renderCell: (params) => (params.value ? "Yes" : "No"),
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row._id}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DataViewerTab;
