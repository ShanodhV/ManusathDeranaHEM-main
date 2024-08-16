import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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

  const [getFilteredSchools, { data: filteredSchools, isLoading: schoolsLoading, error: filterError }] =
    useLazyGetFilteredSchoolsQuery();

  useEffect(() => {
    if (province || district || town) {
      getFilteredSchools({ province, district, town });
    }
  }, [province, district, town, getFilteredSchools]);

  const handleProvinceChange = (event) => {
    const newProvince = event.target.value;
    setProvince(newProvince);
    setDistrict(""); // Reset district and town when province changes
    setTown("");
  };

  const handleDistrictChange = (event) => {
    const newDistrict = event.target.value;
    setDistrict(newDistrict);
    setTown(""); // Reset town when district changes
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

  if (filterError) {
    return (
      <Alert severity="error">Error loading filtered schools: {filterError.message}</Alert>
    );
  }
   // Debugging: Log filteredSchools to ensure it has the expected structure
   console.log("Filtered Schools:", filteredSchools);

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" fontWeight="bold" mb={4}>
        School Data Viewer
      </Typography>

      <Box mb={3} display="flex" gap={2}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Province</InputLabel>
          <Select value={province} onChange={handleProvinceChange} label="Province">
            {Array.from(new Set(schools?.map((school) => school.location.province))).map(
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
                  ?.filter((school) => school.location.province === province)
                  .map((school) => school.location.district)
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
                  ?.filter((school) => school.location.district === district)
                  .map((school) => school.location.town)
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
    { field: "schoolId", headerName: "School ID", width: 150 },
    { field: "schoolName", headerName: "School Name", width: 200 },
    {
      field: "location.province",
      headerName: "Province",
      width: 150,
      valueGetter: (params) => params.row.location?.province || "N/A",
    },
    {
      field: "location.district",
      headerName: "District",
      width: 150,
      valueGetter: (params) => params.row.location?.district || "N/A",
    },
    {
      field: "location.town",
      headerName: "Town",
      width: 150,
      valueGetter: (params) => params.row.location?.town || "N/A",
    },
    { field: "schoolAddress", headerName: "Address", width: 250 },
    {
      field: 'principalContact',
      headerName: 'Principal Contact',
      flex: 1,
      renderCell: (params) => {
        const { value } = params;
        if (!value || !Array.isArray(value)) return null;
        
        return (
          <div>
            {value.map((contact, index) => (
              <div key={index}>
                <strong>{contact.pname}</strong> - {contact.pnumber}
              </div>
            ))}
          </div>
        );
      },
    },
  ]}
  pageSize={5}
  rowsPerPageOptions={[5, 10, 20]}
  checkboxSelection
  onSelectionModelChange={(newSelection) => setSelectedSchoolIds(newSelection)}
  getRowId={(row) => row._id}
/>


          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SchoolDataViewerTab;
