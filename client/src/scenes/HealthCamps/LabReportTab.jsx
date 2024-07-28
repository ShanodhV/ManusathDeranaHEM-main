import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Button, TextField, InputAdornment, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetCampsQuery } from "state/api";
import LabReportModal from "./LabReportModal";

const LabReportTab = () => {
  const { data: camps, isLoading: isLoadingCamps, error: campError } = useGetCampsQuery();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (camp) => {
    setSelectedCamp(camp);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCamp(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (campError) {
      console.error("Error fetching camps:", campError);
    }
  }, [campError]);

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
        <Typography variant="h4">Select Health Camp To Add Reports</Typography>
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
      {isLoadingCamps && <Typography>Loading camps...</Typography>}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {filteredCamps?.map((camp) => (
          <Card key={camp._id} sx={{ width: 300, padding: "10px" }}>
            <CardContent>
              <Typography variant="h5">{camp.CampId}</Typography>
              <Typography variant="body2">
                {camp.Town}, {camp.District}
              </Typography>
              <Typography variant="body2">
                {new Date(camp.Date).toLocaleDateString()}
              </Typography>
            </CardContent>
            <Button size="small" color="secondary" onClick={() => handleOpenModal(camp)}>
              View Lab Reports
            </Button>
          </Card>
        ))}
      </Box>

      {selectedCamp && (
        <LabReportModal open={openModal} onClose={handleCloseModal} camp={selectedCamp} />
      )}
    </Box>
  );
};

export default LabReportTab;
