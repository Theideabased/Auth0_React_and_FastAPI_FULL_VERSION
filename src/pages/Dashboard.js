import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

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
    </div>
  );
};

export default Dashboard;