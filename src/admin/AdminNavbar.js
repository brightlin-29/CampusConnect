import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

      <div className="container">

        {/* Logo */}
        <Link
          to="/admin-dashboard"
          className="navbar-brand fw-bold fs-4"
        >
          CampusConnect Admin Panel
        </Link>

        {/* Menu */}
        <div className="d-flex align-items-center">

          <Link
            to="/admin-students"
            className="btn btn-outline-light me-2"
          >
            Students
          </Link>

          <Link
            to="/admin-companies"
            className="btn btn-outline-success me-2"
          >
            Companies
          </Link>

         
          {/* Logout */}
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("admin");
              window.location = "/admin-login";
            }}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default AdminNavbar;