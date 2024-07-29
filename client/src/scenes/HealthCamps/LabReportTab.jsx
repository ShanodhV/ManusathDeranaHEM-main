// components/LabReportTab.js
import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, InputAdornment, Tooltip, Card, CardContent, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetCampsQuery, useGetHighKidneySerumByDistrictQuery, useGetHighKidneySerumByTownQuery } from "state/api";
import LabReportModal from "./LabReportModal";
import LabReportListModal from "./LabReportListModal";
import GraphModal from "components/GraphModal";
import Graphs from "components/Graphs";

const LabReportTab = () => {
  const { data: camps, isLoading: isLoadingCamps, error: campError } = useGetCampsQuery();
  const { data: districtData, isLoading: isLoadingDistrict, error: errorDistrict } = useGetHighKidneySerumByDistrictQuery();
  const { data: townData, isLoading: isLoadingTown, error: errorTown } = useGetHighKidneySerumByTownQuery();

  const [openModal, setOpenModal] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [graphType, setGraphType] = useState("");

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

  const handleOpenResultsModal = (camp) => {
    setSelectedCamp(camp);
    setResultsModalOpen(true);
  };

  const handleCloseResultsModal = () => {
    setResultsModalOpen(false);
  };

  const handleOpenGraphModal = (type) => {
    setGraphType(type);
    setGraphModalOpen(true);
  };

  const handleCloseGraphModal = () => {
    setGraphModalOpen(false);
    setGraphType("");
  };

  useEffect(() => {
    if (campError) {
      console.error("Error fetching camps:", campError);
    }
  }, [campError]);

  const filteredCamps = camps
    ?.filter(
      (camp) =>
        camp.CampId.toLowerCase().includes(searchTerm) ||
        camp.Town.toLowerCase().includes(searchTerm) ||
        camp.District.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => new Date(b.Date) - new Date(a.Date));

  return (
    <Box m="1.5rem 2.5rem">
      {/* Graph card  */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
        <Card sx={{ width: 550, padding: "10px" }}>
          <CardContent>
            <Typography variant="h5">District-wise Data</Typography>
            <Box sx={{ height: 200, width: '100%' }}>
              <Graphs
                graphType="district"
                districtData={districtData}
                townData={townData}
                isLoadingDistrict={isLoadingDistrict}
                isLoadingTown={isLoadingTown}
                errorDistrict={errorDistrict}
                errorTown={errorTown}
              />
            </Box>
          </CardContent>
          <Button size="small" color="secondary" onClick={() => handleOpenGraphModal("district")}>
            View Full Graph
          </Button>
        </Card>
      </Box>
      <Box sx={{padding:'10px'}}/>
      {/* Camp cards */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" fontWeight="bold">Manage Lab Reports</Typography>
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
            <Button size="small" color="secondary" variant ="contained" onClick={() => handleOpenModal(camp)} sx={{marginRight:'10px', marginBottom:'10px'}}>
              Add Lab Report
            </Button>
            <Button size="small" color="secondary" variant ="outlined" onClick={() => handleOpenResultsModal(camp)}>
              View Patients & Results
            </Button>
          </Card>
        ))}
      </Box>

      <GraphModal
        open={graphModalOpen}
        onClose={handleCloseGraphModal}
        districtData={districtData}
        townData={townData}
        isLoadingDistrict={isLoadingDistrict}
        isLoadingTown={isLoadingTown}
        errorDistrict={errorDistrict}
        errorTown={errorTown}
        graphType={graphType}
      />

      {selectedCamp && (
        <LabReportModal open={openModal} onClose={handleCloseModal} camp={selectedCamp} />
      )}

      {selectedCamp && (
        <LabReportListModal open={resultsModalOpen} onClose={handleCloseResultsModal} camp={selectedCamp} />
      )}
    </Box>
  );
};

export default LabReportTab;
