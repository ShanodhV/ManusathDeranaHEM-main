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
  useGetSchoolsQuery,
  useLazyGetFilteredSchoolsQuery,
} from "state/api"; // Adjust these hooks according to your API

const SchoolDataViewerTab = () => {
  const { data: schools, isLoading, error } = useGetSchoolsQuery();
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [selectedSchoolIds, setSelectedSchoolIds] = useState([]);

  const [getFilteredSchools, { data: filteredSchools, isLoading: schoolsLoading }] =
    useLazyGetFilteredSchoolsQuery();

  useEffect(() => {
    if (province || district || town) {
      getFilteredSchools({ province, district, town });
    }
  }, [province, district, town, getFilteredSchools]);

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

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography ml={2}>Loading schools...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">Error loading schools: {error.message}</Alert>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" fontWeight="bold" mb={4}>
        School Data Viewer
      </Typography>

      <Box mb={3} display="flex" gap={2}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Province</InputLabel>
          <Select value={province} onChange={handleProvinceChange} label="Province">
            {Array.from(new Set(schools?.map((school) => school.Province))).map(
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
                schools
                  ?.filter((school) => school.Province === province)
                  .map((school) => school.District)
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
                schools
                  ?.filter((school) => school.District === district)
                  .map((school) => school.Town)
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
        <Typography variant="h5">Filtered Schools</Typography>
        {schoolsLoading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
            <Typography ml={2}>Loading filtered schools...</Typography>
          </Box>
        ) : (
          <Box sx={{ height: 400, width: "100%", mt: 2 }}>
            <DataGrid
              rows={filteredSchools || []}
              columns={[
                { field: "SchoolId", headerName: "School ID", width: 150 },
                { field: "SchoolName", headerName: "School Name", width: 200 },
                { field: "Province", headerName: "Province", width: 150 },
                { field: "District", headerName: "District", width: 150 },
                { field: "Town", headerName: "Town", width: 150 },
                { field: "Address", headerName: "Address", width: 250 },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              onSelectionModelChange={(newSelection) =>
                setSelectedSchoolIds(newSelection)
              }
              getRowId={(row) => row._id}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SchoolDataViewerTab;
