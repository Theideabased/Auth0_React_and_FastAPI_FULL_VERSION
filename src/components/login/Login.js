import React from 'react';
import { Box, Button } from '@mui/material';

const Login = () => {
  return(
    <Box sx={{ textAlign: 'center' }}>
      <Button
        sx={{
          backgroundColor: "#313131",
          '&:hover': {
           backgroundColor: '#1f1f1f',
          }
        }}
        variant="contained"
         onClick={() => window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?response_type=token&scope=openid%20profile%20email&audience=${process.env.REACT_APP_AUTH0_API_DEFAULT_AUDIENCE}&client_id=${process.env.REACT_APP_AUTH0_APPLICATION_CLIENT_ID}&redirect_uri=${window.location.origin}/login/callback`}
        >
      Continue With Auth0
     </Button>
    </Box>
  );
};

export default Login;
