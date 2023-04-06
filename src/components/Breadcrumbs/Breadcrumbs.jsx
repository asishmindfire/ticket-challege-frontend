import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = "";

  // console.log({ location });
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });
    // crumbs.shift('Home');
  return <div className="breadcrumbs">{crumbs}</div>;
};

export default Breadcrumbs;
