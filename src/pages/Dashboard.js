import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/");
      return;
    }

    const fetchProtectedData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/protected", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setMessage(response.data.message);
        setUserProfile(response.data.user); // Set the user profile data
      } catch (error) {
        console.error("Error fetching protected data:", error);
        navigate("/error");
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! You are logged in.</p>
      <p>{message}</p>
      {userProfile && (
        <div>
          <h2>User Profile</h2>
          <p><strong>Sub:</strong> {userProfile.sub}</p>
          <p><strong>Given Name:</strong> {userProfile.given_name}</p>
          <p><strong>Family Name:</strong> {userProfile.family_name}</p>
          <p><strong>Nickname:</strong> {userProfile.nickname}</p>
          <p><strong>Name:</strong> {userProfile.name}</p>
          <p><strong>Picture:</strong> <img src={userProfile.picture} alt="Profile" /></p>
          <p><strong>Updated At:</strong> {userProfile.updated_at}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Email Verified:</strong> {userProfile.email_verified ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;