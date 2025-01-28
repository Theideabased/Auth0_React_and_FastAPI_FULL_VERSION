import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const error = queryParams.get("error");
        const errorDescription = queryParams.get("error_description");
        const code = queryParams.get("code");

        if (error) {
          throw new Error(`Authorization error: ${errorDescription}`);
        }

        if (!code) {
          throw new Error("No authorization code found");
        }

        const redirectUri = `${window.location.origin}/callback`;

        // Send the code to the backend to exchange it for tokens
        const response = await axios.post(`http://localhost:8000/auth/callback?redirect_uri=${encodeURIComponent(redirectUri)}`, { code });

        if (response.status !== 200) {
          throw new Error("Failed to exchange code for tokens");
        }

        const tokens = response.data;

        // Store tokens securely (e.g., in session storage)
        sessionStorage.setItem("accessToken", tokens.access_token);
        sessionStorage.setItem("idToken", tokens.id_token);

        // Navigate to the dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Error handling the callback:", error);
        navigate("/error");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;