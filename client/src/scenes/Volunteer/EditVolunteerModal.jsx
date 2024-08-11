import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Snackbar } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Ensure you have @mui/x-date-pickers installed
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField";
import { useEffect, useState } from "react";
import { useUpdateVolunteerMutation } from "state/api"; // Adjust the import according to your file structure

const EditVolunteerModal = ({ openModal, handleCloseModal, volunteerData, onVolunteerUpdated }) => {
    const [volunteerNIC, setVolunteerNIC] = useState("");
    const [volunteerName, setVolunteerName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null); // Use Date object
    const [contactNumber, setContactNumber] = useState("");
    const [volunteerAddress, setVolunteerAddress] = useState("");
    const [location, setLocation] = useState({ province: "", district: "", town: "" });
    const [occupation, setOccupation] = useState("");
    const [status, setStatus] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // State for handling errors
    const [errors, setErrors] = useState({
        nic: "",
        mobile: "",
        dateOfBirth: "",
    });

    const [updateVolunteer] = useUpdateVolunteerMutation();

    useEffect(() => {
        if (volunteerData) {
            setVolunteerNIC(volunteerData.volunteerNIC);
            setVolunteerName(volunteerData.volunteerName);
            setDateOfBirth(new Date(volunteerData.dateOfBirth)); // Convert string to Date object
            setContactNumber(volunteerData.contactNumber);
            setVolunteerAddress(volunteerData.volunteerAddress);
            setLocation(volunteerData.location);
            setOccupation(volunteerData.occupation);
            setStatus(volunteerData.status);
        }
    }, [volunteerData]);

    const verifyNIC = (nic) => {
        const nicPattern = /^(\d{9}[Vv]|\d{12})$/;
        return nicPattern.test(nic);
    };

    const verifyMobileNumber = (number) => {
        const mobilePattern = /^\d{10}$/;
        return mobilePattern.test(number);
    };

    const handleUpdateVolunteer = () => {
        const newErrors = {
            nic: "",
            mobile: "",
            dateOfBirth: "",
        };

        // Validate NIC
        if (!verifyNIC(volunteerNIC)) {
            newErrors.nic = "Invalid NIC format. Use 9 digits followed by 'V' or 12 digits without 'V'.";
        }

        // Validate Mobile Number
        if (!verifyMobileNumber(contactNumber)) {
            newErrors.mobile = "Invalid mobile number format. Use exactly 10 digits.";
        }

        // Validate Date of Birth
        if (!dateOfBirth || isNaN(dateOfBirth.getTime())) {
            newErrors.dateOfBirth = "Invalid date format. Use DD/MM/YYYY.";
        }

        setErrors(newErrors);

        if (newErrors.nic || newErrors.mobile || newErrors.dateOfBirth) {
            return; // Exit early if there are validation errors
        }

        // Convert the date to ISO format
        const isoDate = dateOfBirth.toISOString().split('T')[0];

        // Call API to update volunteer
        updateVolunteer({
            volunteerNIC,
            volunteerName,
            dateOfBirth: isoDate,
            contactNumber,
            volunteerAddress,
            location,
            occupation,
            status,
        })
        .then((response) => {
            console.log("Volunteer updated successfully from frontend:", response);
            setOpenSnackbar(true);

            if (onVolunteerUpdated) {
                onVolunteerUpdated();
            }
        })
        .catch((error) => {
            console.error("Error updating Volunteer:", error);
        });
    };

    const handleDateChange = (date) => {
        setDateOfBirth(date);
        if (date && isNaN(date.getTime())) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateOfBirth: "Invalid date format. Use DD/MM/YYYY.",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateOfBirth: "",
            }));
        }
    };

    const handleProvinceChange = (event) => {
        setLocation({ ...location, province: event.target.value, district: "", town: "" });
    };

    const handleDistrictChange = (event) => {
        setLocation({ ...location, district: event.target.value, town: "" });
    };

    const handleTownChange = (event) => {
        setLocation({ ...location, town: event.target.value });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const labelStyle = {
        fontWeight: "bold",
        color: "black",
        fontSize: "16px",
        marginTop: "16px",
    };

    const sriLankanData = {
        // (same data as before)
    };

    const provinces = Object.keys(sriLankanData);
    const districts = location.province ? Object.keys(sriLankanData[location.province]) : [];
    const towns = location.province && location.district ? sriLankanData[location.province][location.district] : [];

    const occupationOptions = [
        "Technology and Information",
        "Healthcare and Medicine",
        "Engineering and Manufacturing",
        "Finance and Banking",
        "Education and Academia",
        "Law and Legal Services",
        "Business and Management",
        "Media and Communications",
        "Arts and Design",
        "Science and Research",
        "Construction and Real Estate",
        "Transportation and Logistics",
        "Agriculture and Food",
        "Energy and Environment",
        "Hospitality and Tourism"
    ];

    const statusOptions = ["Active", "Inactive"];

    return (
        <Dialog
            open={openModal}
            onClose={handleCloseModal}
            PaperProps={{
                sx: {
                    width: "60%",
                    maxHeight: "80%",
                },
            }}
        >
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <label style={labelStyle}>NIC Number</label>
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                value={volunteerNIC}
                                onChange={(e) => setVolunteerNIC(e.target.value)}
                                error={!!errors.nic}
                                helperText={errors.nic}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <label style={labelStyle}>Full Name</label>
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                value={volunteerName}
                                onChange={(e) => setVolunteerName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <label style={labelStyle}>Date of Birth</label>
                            <DatePicker
                                value={dateOfBirth}
                                onChange={handleDateChange}
                                renderInput={(params) => <CustomTextField {...params} fullWidth variant="outlined" />}
                            />
                            {errors.dateOfBirth && (
                                <Box color="error.main" fontSize="0.875rem" marginTop="0.25rem">
                                    {errors.dateOfBirth}
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <label style={labelStyle}>Contact Number</label>
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                error={!!errors.mobile}
                                helperText={errors.mobile}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label style={labelStyle}>Address</label>
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                value={volunteerAddress}
                                onChange={(e) => setVolunteerAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <label style={labelStyle}>Province</label>
                            <CustomTextField
                                fullWidth
                                select
                                variant="outlined"
                                value={location.province}
                                onChange={handleProvinceChange}
                            >
                                {provinces.map((province) => (
                                    <MenuItem key={province} value={province}>
                                        {province}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={4}>
                            <label style={labelStyle}>District</label>
                            <CustomTextField
                                fullWidth
                                select
                                variant="outlined"
                                value={location.district}
                                onChange={handleDistrictChange}
                                disabled={!location.province}
                            >
                                {districts.map((district) => (
                                    <MenuItem key={district} value={district}>
                                        {district}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={4}>
                            <label style={labelStyle}>Town</label>
                            <CustomTextField
                                fullWidth
                                select
                                variant="outlined"
                                value={location.town}
                                onChange={handleTownChange}
                                disabled={!location.district}
                            >
                                {towns.map((town) => (
                                    <MenuItem key={town} value={town}>
                                        {town}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={6}>
                            <label style={labelStyle}>Occupation</label>
                            <CustomTextField
                                fullWidth
                                select
                                variant="outlined"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                            >
                                {occupationOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={6}>
                            <label style={labelStyle}>Status</label>
                            <CustomTextField
                                fullWidth
                                select
                                variant="outlined"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Buttons onClick={handleUpdateVolunteer} color="primary">
                    Update
                </Buttons>
                <Buttons onClick={handleCloseModal} color="secondary" sx={{ ml: 2 }}>
                    Cancel
                </Buttons>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Volunteer updated successfully!
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default EditVolunteerModal;
