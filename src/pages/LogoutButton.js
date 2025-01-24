import React from "react";

const LogoutButton = () => {
  const logout = () => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    sessionStorage.clear(); // Clear tokens from session storage

    window.location.href = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${window.location.origin}`;
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
