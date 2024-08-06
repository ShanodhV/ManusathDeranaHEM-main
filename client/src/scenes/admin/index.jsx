import React, { useState } from "react";
import {
  Box,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import Signup from "scenes/auth/Singup/index";

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();
  const [open, setOpen] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    setAlertState({
      open: true,
      message: "User registered successfully!",
      severity: "success",
    });
    setTimeout(() => {
      setAlertState({ ...alertState, open: false });
    }, 3000);
  };

  const handleResetPasswordOpen = (user) => {
    setSelectedUser(user);
    setResetPasswordOpen(true);
  };

  const handleResetPasswordClose = () => {
    setResetPasswordOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "resetPassword",
      headerName: "Reset Password",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          sx={{
            backgroundColor: theme.palette.primary[700],
            ":hover": { backgroundColor: theme.palette.secondary[400] },
            color: theme.palette.background.alt,
          }}
          variant="contained"
          color="primary"
          onClick={() => handleResetPasswordOpen(params.row)}
        >
          Reset Password
        </Button>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ADMINS" subtitle="Managing admins and list of admins" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary[400],
              ":hover": { backgroundColor: theme.palette.secondary[200] },
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleClickOpen}
          >
            Register
          </Button>
        </Box>
      </FlexBetween>
      {alertState.open && (
        <Alert
          severity={alertState.severity}
          onClose={() => setAlertState({ ...alertState, open: false })}
        >
          {alertState.message}
        </Alert>
      )}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
        <DialogContent>
          <Signup setOpen={setOpen} handleSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
      <ResetPasswordDialog
        open={resetPasswordOpen}
        onClose={handleResetPasswordClose}
        user={selectedUser}
        setAlertState={setAlertState}
      />
    </Box>
  );
};

const ResetPasswordDialog = ({
  open,
  onClose,
  user,
  alertState,
  setAlertState,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordReset = async () => {
    try {
      const url = `http://localhost:5001/api/users/${user._id}/resetPassword`;
      await axios.post(url, { password });
      setPassword("");
      setError("");
      setAlertState({
        open: true,
        message: "Password reset successfully!",
        severity: "success",
      });
      setTimeout(() => {
        setAlertState({ ...alertState, open: false });
      }, 3000);
      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  const handleDialogClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Reset Password
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
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
      <DialogContent>
        <TextField
          margin="dense"
          label="New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{
            "& button": {
              backgroundColor: theme.palette.primary[700],
              ":hover": { backgroundColor: theme.palette.primary[400] },
              color: "white",
            },
          }}
        >
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          mr={2}
          sx={{
            "& button": {
              backgroundColor: theme.palette.secondary[400],
              ":hover": { backgroundColor: theme.palette.secondary[200] },
              color: "white",
            },
          }}
        >
          <Button onClick={handlePasswordReset} color="primary">
            Reset Password
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Admin;