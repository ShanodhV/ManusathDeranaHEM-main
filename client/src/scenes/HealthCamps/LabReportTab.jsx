import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, InputAdornment, Tooltip, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { PieChart, Pie, Cell, Tooltip as RechartTooltip, Legend } from "recharts";
import { useGetCampsQuery, useGetHighKidneySerumByDistrictQuery, useGetHighKidneySerumByTownQuery, useGetNextCampLocationsByPatientsQuery, useGetNextCampLocationsByCampsQuery } from "state/api";
import LabReportModal from "./LabReportModal";
import LabReportListModal from "./LabReportListModal";
import GraphModal from "components/GraphModal";
import Graphs from "components/Graphs";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const LabReportTab = () => {
  const { data: camps, isLoading: isLoadingCamps, error: campError } = useGetCampsQuery();
  const { data: districtData, isLoading: isLoadingDistrict, error: errorDistrict } = useGetHighKidneySerumByDistrictQuery();
  const { data: townData, isLoading: isLoadingTown, error: errorTown } = useGetHighKidneySerumByTownQuery();
  const { data: nextCampLocationsByPatients, isLoading: isLoadingNextCampByPatients, error: errorNextCampByPatients } = useGetNextCampLocationsByPatientsQuery();
  const { data: nextCampLocationsByCamps, isLoading: isLoadingNextCampByCamps, error: errorNextCampByCamps } = useGetNextCampLocationsByCampsQuery();

  const [openModal, setOpenModal] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [graphType, setGraphType] = useState("");
  const [predictionModalOpen, setPredictionModalOpen] = useState(false);

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

  const handleOpenPredictionModal = () => {
    setPredictionModalOpen(true);
  };

  const handleClosePredictionModal = () => {
    setPredictionModalOpen(false);
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
      {/* Cards container */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
        {/* Graph card */}
        <Card sx={{ width: 550, padding: "10px" }}>
          <CardContent>
            <Typography variant="h5" fontWeight='700' color='#d63333'>District-wise Data</Typography>
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
          <Button size="small" color="secondary" variant="contained"  onClick={() => handleOpenGraphModal("district")}>
            View Full Graph
          </Button>
        </Card>

        {/* Prediction card */}
        <Card sx={{ width: 550, padding: "10px" }}>
          <CardContent>
            <Typography variant="h5" fontWeight='700' color='#d63333'>Next Suitable Camp Locations</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">By Patients Identified</Typography>
              {isLoadingNextCampByPatients ? (
                <Typography>Loading...</Typography>
              ) : errorNextCampByPatients ? (
                <Typography>Error fetching data</Typography>
              ) : (
                <ul>
                  {nextCampLocationsByPatients?.slice(0, 3).map((location, index) => (
                    <li key={index}>
                      {location._id.town}, {location._id.district} - {location.count} patients
                    </li>
                  ))}
                </ul>
              )}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">By Least Health Camps Conducted</Typography>
              {isLoadingNextCampByCamps ? (
                <Typography>Loading...</Typography>
              ) : errorNextCampByCamps ? (
                <Typography>Error fetching data</Typography>
              ) : (
                <ul>
                  {nextCampLocationsByCamps?.slice(0, 3).map((location, index) => (
                    <li key={index}>
                      {location._id.town}, {location._id.district} - {location.count} camps
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          </CardContent>
          <Button size="small" color="secondary" variant="contained" onClick={handleOpenPredictionModal}>
            View Full Predictions
          </Button>
        </Card>
      </Box>

      <Box sx={{ padding: '10px' }} />

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
            <Button size="small" color="secondary" variant="contained" onClick={() => handleOpenModal(camp)} sx={{ marginRight: '10px', marginBottom: '10px' }}>
              Add Lab Report
            </Button>
            <Button size="small" color="secondary" variant="outlined" onClick={() => handleOpenResultsModal(camp)}>
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

      {/* Prediction Modal */}
      <Dialog
        fullScreen
        open={predictionModalOpen}
        onClose={handleClosePredictionModal}
        aria-labelledby="prediction-modal-title"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="prediction-modal-title">
          <div style={{ color: "#d63333", fontWeight: "700", fontSize: "16px" }}>
            Next Camp Predictions
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={handleClosePredictionModal}
            sx={{ position: "absolute", right: 8, top: 8, color: '#555' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <Box sx={{ margin: 2 }}>
            <Typography variant="h6" marginTop='120px' fontWeight='700' color='#d63333' >By Patients Identified :</Typography>
              <PieChart width={400} height={400}>
                <Pie
                  data={nextCampLocationsByPatients}
                  dataKey="count"
                  nameKey="_id.town"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {nextCampLocationsByPatients?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartTooltip />
                <Legend />
              </PieChart>
            </Box>
            
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" marginTop='120px' fontWeight='700' color='#d63333'>By Least Health Camps Conducted :</Typography>
              <PieChart width={400} height={400}>
                <Pie
                  data={nextCampLocationsByCamps}
                  dataKey="count"
                  nameKey="_id.town"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {nextCampLocationsByCamps?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartTooltip />
                <Legend />
              </PieChart>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LabReportTab;
