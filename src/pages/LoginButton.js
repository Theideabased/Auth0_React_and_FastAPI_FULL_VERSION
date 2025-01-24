import React from "react";

const LoginButton = () => {
  const loginWithRedirect = () => {
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const redirectUri = `${window.location.origin}/callback`;
    const audience = process.env.REACT_APP_AUTH0_API_DEFAULT_AUDIENCE;

    window.location.href = `https://${domain}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid profile email&audience=${audience}`;
  };

  return <button onClick={loginWithRedirect}>Login</button>;
};

export default LoginButton;