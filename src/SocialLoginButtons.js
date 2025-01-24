import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function SocialLoginButtons() {
  const { loginWithRedirect } = useAuth0();

  const handleGoogleLogin = async () => {
    try {
      await loginWithRedirect({
        connection: "google-oauth2",
      });
    } catch (err) {
      console.error("Google Login Error: ", err);
    }
    };
    

  const handleGitHubLogin = async () => {
    try {
      await loginWithRedirect({
        connection: "github",
      });
    } catch (err) {
      console.error("Github Login Error: ", err);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>
        Log In with Google
      </button>
      <button onClick={handleGitHubLogin}>
        Log In with GitHub
      </button>
       {/* {error && <p style = {{color: 'red'}}> Error: {error.message}</p>} */}
    </div>
  );
}

export default SocialLoginButtons;
