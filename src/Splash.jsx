import React from "react";
import { useNavigate } from "react-router-dom";
export default function Splash() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home/dashboard/tickets");
    } else {
      navigate("/signin");
    }
  }, [navigate]);
  return <div>SPlash</div>;
}
