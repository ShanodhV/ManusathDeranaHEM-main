// import React, { useState } from "react";
// import { Modal, Box, Grid } from "@mui/material";
// import Buttons from "components/Buttons";
// import CustomTextField from "components/CustomTextField"; // Import your custom TextField component

// const ViewSchoolDetailsModal = ({ openModal, handleCloseModal }) => {
 

//   const labelStyle = {
//     fontWeight: "bold",
//     color: "black",
//     fontSize: "16px",
//     marginTop: "16px",
//   };

  


//   const handleClick = () => {
//     console.log("Button clicked!");
//   };

//   return (
//     <Modal
//       open={openModal}
//       onClose={handleCloseModal}
//       aria-labelledby="modal-modal-titel"
//       aria-describedby="model-model-description"
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 700,
//           height: 600,
//           bgcolor: "#fff",
//           borderRadius: "20px",
//           boxShadow: 24,
//           p: 4,
//           overflowY: "auto",
//         }}
//       >
//         <h2 id="modal-modal-titel">View School Details</h2>

//         <Box sx={{ mt: 6 }}>
//           <CustomTextField
//             label="School ID"
//             variant="outlined"
//             fullWidth
//           />
//         </Box>
//         <Box sx={{ mt: 6 }}>
//           <CustomTextField
//             label="School Name"
//             variant="outlined"
//             fullWidth
//           />
//         </Box>

//         <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
//           <Buttons onClick={handleClick} label="Search" />
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default ViewSchoolDetailsModal;
