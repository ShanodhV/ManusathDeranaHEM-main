import React, { useState, useEffect } from "react";
import { Modal, Box, MenuItem } from "@mui/material";
import Buttons from "components/Buttons"; 
import CustomTextField from "components/CustomTextField";
import { useAddPatientMutation } from "state/api";

const sriLankanData = {
  "Western": {
    "Colombo": ["Colombo 1", "Colombo 2", "Colombo 3", "Colombo 4", "Colombo 5", "Colombo 6", "Colombo 7", "Colombo 8", "Colombo 9", "Colombo 10", "Colombo 11", "Colombo 12", "Colombo 13", "Colombo 14", "Colombo 15"],
    "Gampaha": ["Negombo", "Gampaha", "Veyangoda", "Wattala", "Minuwangoda", "Ja-Ela", "Kadawatha", "Ragama", "Divulapitiya", "Nittambuwa", "Kiribathgoda"],
    "Kalutara": ["Kalutara", "Panadura", "Horana", "Beruwala", "Aluthgama", "Matugama", "Wadduwa", "Bandaragama", "Ingiriya"]
  },
  "Central": {
    "Kandy": ["Kandy", "Gampola", "Nawalapitiya", "Peradeniya", "Akurana", "Kadugannawa", "Katugastota"],
    "Matale": ["Matale", "Dambulla", "Sigiriya", "Nalanda", "Ukuwela", "Rattota"],
    "Nuwara Eliya": ["Nuwara Eliya", "Hatton", "Nanu Oya", "Talawakele", "Bandarawela", "Welimada"]
  },
  "Southern": {
    "Galle": ["Galle", "Hikkaduwa", "Ambalangoda", "Elpitiya", "Bentota", "Baddegama"],
    "Matara": ["Matara", "Weligama", "Mirissa", "Akurugoda", "Hakmana", "Devinuwara"],
    "Hambantota": ["Hambantota", "Tangalle", "Tissamaharama", "Ambalantota", "Beliatta", "Weeraketiya"]
  },
  "Northern": {
    "Jaffna": ["Jaffna", "Nallur", "Chavakachcheri", "Point Pedro", "Karainagar", "Velanai"],
    "Kilinochchi": ["Kilinochchi", "Pallai", "Paranthan", "Poonakary"],
    "Mannar": ["Mannar", "Nanattan", "Madhu", "Pesalai"],
    "Vavuniya": ["Vavuniya", "Nedunkeni", "Settikulam", "Vavuniya South"],
    "Mullaitivu": ["Mullaitivu", "Oddusuddan", "Puthukudiyiruppu", "Weli Oya"]
  },
  "Eastern": {
    "Trincomalee": ["Trincomalee", "Kinniya", "Mutur", "Kuchchaveli"],
    "Batticaloa": ["Batticaloa", "Kaluwanchikudy", "Valachchenai", "Eravur"],
    "Ampara": ["Ampara", "Akkaraipattu", "Kalmunai", "Sainthamaruthu", "Pottuvil"]
  },
  "North Western": {
    "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Narammala", "Wariyapola", "Pannala", "Melsiripura"],
    "Puttalam": ["Puttalam", "Chilaw", "Wennappuwa", "Anamaduwa", "Nattandiya", "Dankotuwa"]
  },
  "North Central": {
    "Anuradhapura": ["Anuradhapura", "Kekirawa", "Thambuttegama", "Eppawala", "Medawachchiya"],
    "Polonnaruwa": ["Polonnaruwa", "Kaduruwela", "Medirigiriya", "Hingurakgoda"]
  },
  "Uva": {
    "Badulla": ["Badulla", "Bandarawela", "Haputale", "Welimada", "Mahiyanganaya", "Passara"],
    "Monaragala": ["Monaragala", "Bibile", "Wellawaya", "Medagama", "Buttala"]
  },
  "Sabaragamuwa": {
    "Ratnapura": ["Ratnapura", "Embilipitiya", "Balangoda", "Pelmadulla", "Eheliyagoda", "Kuruwita"],
    "Kegalle": ["Kegalle", "Mawanella", "Warakapola", "Rambukkana", "Galigamuwa"]
  }
};


const PatientRegistrationModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [errors, setErrors] = useState({});

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [addPatient] = useAddPatientMutation();

  useEffect(() => {
    if (province) {
      setDistricts(Object.keys(sriLankanData[province]));
    } else {
      setDistricts([]);
    }
    setDistrict("");
    setCity("");
  }, [province]);

  useEffect(() => {
    if (district) {
      setCities(sriLankanData[province][district]);
    } else {
      setCities([]);
    }
    setCity("");
  }, [district]);

  const validatePhoneNumber = (number) => /^\d+$/.test(number);

  const handleAddPatient = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!NIC) newErrors.NIC = "NIC is required";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!validatePhoneNumber(phone)) newErrors.phone = "Phone number must contain only numbers";
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";
    if (!province) newErrors.province = "Province is required";
    if (!district) newErrors.district = "District is required";
    if (!emergencyPhone) newErrors.emergencyPhone = "Emergency phone number is required";
    else if (!validatePhoneNumber(emergencyPhone)) newErrors.emergencyPhone = "Emergency phone number must contain only numbers";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addPatient({ name, NIC, phone, address, city, province, district, emergencyPhone })
        .then((response) => {
          console.log("Patient added successfully from frontend:", response);
          setName("");
          setNIC("");
          setPhone("");
          setAddress("");
          setCity("");
          setProvince("");
          setDistrict("");
          setEmergencyPhone("");
          setErrors({});
        })
        .catch((error) => {
          console.error("Error adding patient:", error);
        });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
        <h2 id="modal-modal-title">Register New Patient</h2>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="NIC"
            variant="outlined"
            fullWidth
            value={NIC}
            onChange={(e) => setNIC(e.target.value)}
            error={!!errors.NIC}
            helperText={errors.NIC}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            inputType="numeric"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Box>

        {/* <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Province"
            variant="outlined"
            fullWidth
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            select
            error={!!errors.province}
            helperText={errors.province}
          >
            {Object.keys(sriLankanData).map((prov) => (
              <MenuItem key={prov} value={prov}>
                {prov}
              </MenuItem>
            ))}
          </CustomTextField>
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="District"
            variant="outlined"
            fullWidth
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            select
            error={!!errors.district}
            helperText={errors.district}
            disabled={!province}
          >
            {districts.map((dist) => (
              <MenuItem key={dist} value={dist}>
                {dist}
              </MenuItem>
            ))}
          </CustomTextField>
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            select
            error={!!errors.city}
            helperText={errors.city}
            disabled={!district}
          >
            {cities.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </CustomTextField>
        </Box> */}

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Emergency Phone"
            variant="outlined"
            fullWidth
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value)}
            error={!!errors.emergencyPhone}
            helperText={errors.emergencyPhone}
            inputType="numeric"
          />
        </Box>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Buttons label="Register Patient" onClick={handleAddPatient} />
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientRegistrationModal;