import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login'); // Navigate to the login page or any other page after logout
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
