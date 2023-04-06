import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import TicketTables from "../../components/TicketTables/TicketTables";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Breadcrumbs />
      <TicketTables />
    </div>
  );
}

export default Dashboard;
