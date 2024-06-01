import { Box, Grid, Modal } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useState } from "react";

const AddVolunteerEventsModal = ({ openModal, handleCloseModal }) => {
  const [mohCount, setMohCount] = useState(1);
  const [personCount, setPersonCount] = useState(1);
  const [sponsorCount, setSponsorCount] = useState(1);

  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

  const handleClickAddMoh = () => {
    setMohCount((prevCount) => prevCount + 1);
  };

  const handleClickAddPerson = () => {
    setPersonCount((prevCount) => prevCount + 1);
  };

  const handleClickAddSponsor = () => {
    setSponsorCount((prevCount) => prevCount + 1);
  };

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-titel"
      aria-describedby="model-model-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 600,
          bgcolor: "#fff",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <h2 id="modal-modal-titel">Add Volunteer Events</h2>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Event Name"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Event Category"
            variant="outlined"
            fullWidth
          />
        
        
        
        </Box>
        <Box sx={{ mt: 4

        }}>
    <label style={labelStyle} htmlFor="Event Date">
    Date of Birth
    </label>
    <Grid container spacing={2} sx={{ mt: 0 }}>
    <Grid item xs={2.5}>
        <CustomTextField
        select
        label="Month"
        variant="outlined"
        fullWidth
        >
        {/* Month options */}
        </CustomTextField>
    </Grid>
    <Grid item xs={2.5}>
        <CustomTextField
        select
        label="Day"
        variant="outlined"
        fullWidth
        >
        {/* Day options */}
        </CustomTextField>
    </Grid>
    <Grid item xs={2.5}>
        <CustomTextField
        select
        label="Year"
        variant="outlined"
        fullWidth
        >
        {/* Year options */}
        </CustomTextField>
    </Grid>
    </Grid>
    </Box>


        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Venue"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 4

         }}>
          <label style={labelStyle} htmlFor="Add Location">
            Location
          </label>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Province"
                variant="outlined"
                fullWidth
              >
                {/* Province options */}
              </CustomTextField>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="District"
                variant="outlined"
                fullWidth
              >
                {/* District options */}
              </CustomTextField>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Town"
                variant="outlined"
                fullWidth
              >
                {/* Town options */}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>
       
          <CustomTextField
            label="Related Occupations"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Description"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
            <Buttons onClick={handleClick} label="Add" /> {/* Positioned to the left */}
            <Buttons onClick={handleClick} label="Cancel" /> {/* Positioned to the right */}
        </Box>

    </Modal>
  );
};

export default AddVolunteerEventsModal;
