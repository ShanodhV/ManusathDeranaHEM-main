import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoginForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 300,
  margin: 'auto',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.text();
      alert(result);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </LoginForm>
  );
};

export default Login;
