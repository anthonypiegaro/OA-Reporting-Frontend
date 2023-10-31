import React from "react";
import { Link } from 'react-router-dom';

const SideBarButton = ({name, to, onClick=null}) => {
    return (
        <Link to={to} >
            <button className="sidebar-button" onClick={onClick}>{name}</button>
        </Link>
    );
};

export default SideBarButton;