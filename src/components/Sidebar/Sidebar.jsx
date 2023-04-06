import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaTh,
  FaUserAlt,
  FaRegChartBar,
  FaThList,
  // FaCommentAlt,
  FaShoppingBag,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";


function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const menuItem = [
    {
      path: "/home/dashboard/tickets",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/product",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    // {
    //     path: "/comment",
    //     name: "Comment",
    //     icon: <FaCommentAlt />,
    // },
    {
      path: "/about",
      name: "About Us",
      icon: <FaThList />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/",
      name: "SignOut",
      icon: <FaSignOutAlt />,
    },
  ];

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate(`/`);
    window.location.reload();
  }

  return (
    <div className="container1">
      {/* <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar"> */}
      <div className="sidebar sidebar-full" >
      {/* <div className={ isOpen ? "sidebar sidebar-full" : "sidebar sidebar-manual" } > */}

        <div className="top_section">
          {/* <h1 style={{ display: isOpen ? "block" : "none" }} className="logo"> */}
          <h1 className="logo logo-full">
            Logo
          </h1>
          {/* <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars"> */}
          <div className="bars bars-full">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
            style={{ paddingBottom: "14px" }}
            onClick={() => item.name === "SignOut" ? handleSignOut() : ""}
          >
            <div className="icon">{item.icon}</div>
            <div
              // style={{ display: isOpen ? "block" : "none" }}
              className="link_text link_text-full"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
