import React, { useState } from "react";
import { Modal, Box, Grid } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField";
import { useAddCampMutation } from "state/api"; // Adjust the import according to your file structure

const HealthCampModal = ({ openModal, handleCloseModal }) => {
  const [campId, setCampId] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [mohFields, setMohFields] = useState([""]);
  const [contactPersons, setContactPersons] = useState([{ name: "", mobileNumber: "" }]);
  const [sponsors, setSponsors] = useState([""]);
  const [addCamp] = useAddCampMutation();

  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

  const handleClickAddMoh = () => {
    setMohFields([...mohFields, ""]);
  };

  const handleClickAddPerson = () => {
    setContactPersons([...contactPersons, { name: "", mobileNumber: "" }]);
  };

  const handleClickAddSponsor = () => {
    setSponsors([...sponsors, ""]);
  };

  const handleChangeContactPerson = (index, field, value) => {
    const updatedContactPersons = [...contactPersons];
    updatedContactPersons[index][field] = value;
    setContactPersons(updatedContactPersons);
  };

  const handleChangeMohField = (index, value) => {
    const updatedMohFields = [...mohFields];
    updatedMohFields[index] = value;
    setMohFields(updatedMohFields);
  };

  const handleChangeSponsorField = (index, value) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors[index] = value;
    setSponsors(updatedSponsors);
  };

  const handleClick = () => {
    const newCamp = {
      CampId: campId,
      Province: province,
      District: district,
      Town: town,
      MOH: mohFields,
      ContactPersons: contactPersons,
      Sponsor: sponsors
    };

    addCamp(newCamp)
      .then(response => {
        console.log("Camp added successfully:", response);
        // Reset fields
        setCampId("");
        setProvince("");
        setDistrict("");
        setTown("");
        setMohFields([""]);
        setContactPersons([{ name: "", mobileNumber: "" }]);
        setSponsors([""]);
        handleCloseModal();
      })
      .catch(error => {
        console.error("Error adding camp:", error);
      });
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <h2 id="modal-modal-title">Create Health Camp</h2>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Camp ID"
            variant="outlined"
            value={campId}
            onChange={(e) => setCampId(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <label style={labelStyle} htmlFor="Add Location name">
            Add Location Name
          </label>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={4}>
              <CustomTextField
                label="Province"
                variant="outlined"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label="District"
                variant="outlined"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label="Town"
                variant="outlined"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {mohFields.map((moh, index) => (
              <Grid item xs={4} key={index}>
                <CustomTextField
                  label={`MOH ${index + 1}`}
                  variant="outlined"
                  value={moh}
                  onChange={(e) => handleChangeMohField(index, e.target.value)}
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Buttons onClick={handleClickAddMoh} label="Add another MOH" />
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <label style={labelStyle} htmlFor="Add Location name">
            Camp Contact Persons
          </label>
        </Box>
        {contactPersons.map((person, index) => (
          <Box key={index} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomTextField
                  label="Name"
                  variant="outlined"
                  value={person.name}
                  onChange={(e) => handleChangeContactPerson(index, "name", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  label="Mobile Number"
                  variant="outlined"
                  value={person.mobileNumber}
                  onChange={(e) => handleChangeContactPerson(index, "mobileNumber", e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <Buttons onClick={handleClickAddPerson} label="Add another Person" />
        </Box>

        <Box sx={{ mt: 3 }}>
          <label style={labelStyle} htmlFor="Add Location name">
            Add Camp Activities
          </label>
        </Box>
        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Add Camp Activities"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <label style={labelStyle} htmlFor="Add Location name">
            Add Sponsor
          </label>
        </Box>
        {sponsors.map((sponsor, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <CustomTextField
              label={`Sponsor ${index + 1}`}
              variant="outlined"
              value={sponsor}
              onChange={(e) => handleChangeSponsorField(index, e.target.value)}
              fullWidth
            />
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <Buttons onClick={handleClickAddSponsor} label="Add Another Sponsor" />
        </Box>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Buttons onClick={handleClick} label="Create Health Camp" />
        </Box>
      </Box>
    </Modal>
  );
};

export default HealthCampModal;
