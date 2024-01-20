import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SidebarTitle from './SidebarTitle';
import SideBarButton from './SidebarButton';


const Sidebar = ({isStaff}) =>  {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
      const response = await fetch("/api/users/logout/", { method: "POST" });
      if (response.ok) {
          localStorage.clear();
          navigate("/login");
      } else {
          // Handle error here, e.g., show an alert or a snackbar
          alert('Logout failed');
      }
  }

  const handleAdminClick = () => {
    const url = "https://powerful-river-55956-f7734fa52aa2.herokuapp.com/admin";

    window.open(url, "_blank");
  }

  return (
    <>
      <div className="hamburger material-symbols-outlined" onClick={() => setExpanded(!expanded)}>
        menu
      </div>
      <div className={`sidebar ${expanded ? "expanded" : ""}`} >
          <SidebarTitle title="Optimum Athletes" />
          <SideBarButton name="Reports" to="/report" />
          {isStaff && <SideBarButton name="Data" to="/data" />}
          <SideBarButton name="Pitch Report" to="/pitch-report" />
          {isStaff && <SideBarButton name="Admin" onClick={handleAdminClick} />}
          <SideBarButton name="Logout" onClick={handleLogout} />
      </div>
    </>
  );
}

export default Sidebar;