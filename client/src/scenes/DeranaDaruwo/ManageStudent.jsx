import React,{useState,useEffect} from "react";
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
//   import PatientListModal from "./PatientListModal";
import StudentList from "./StudentList";
const ManageStudent = () => {
    const theme = useTheme();
    const { data: DeranaDaruwo, isLoading: isLoadingDeranaDaruwo, error: DeranaDaruwoError } = useGetDeranaDaruwoProgramsQuery();
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (DeranaDaruwoError) {
          console.error("Error fetching camps:",DeranaDaruwoError);
          setSnackbar({ open: true, message: "Error fetching health camps", severity: "error" });
        }
      }, [DeranaDaruwoError]);

    const handleOpenModal = (program) => {
      setSelectedProgram(program);
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
  const filteredPrograms = DeranaDaruwo
  ?.filter(
    (program) =>
      program.programId.toLowerCase().includes(searchTerm) ||
      program.town.toLowerCase().includes(searchTerm) ||
      program.district.toLowerCase().includes(searchTerm)
  )
  .sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Sort by latest date
  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" fontWeight="bold">Manage Students</Typography>
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
              <Button size="small" color="secondary" variant="outlined" onClick={() => handleOpenModal(program)}>
                View Student
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>


      {selectedProgram && (
        <StudentList open={openModal} onClose={handleCloseModal} program={selectedProgram} />
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
  )
}

export default ManageStudent