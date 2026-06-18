import React from "react";
import { Link } from "react-router-dom";

function CompanyNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/company-dashboard">
          
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#companyNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="companyNavbar"
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/company-dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/post-job"
              >
                Post Job
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/manage-jobs"
              >
                Manage Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/applicants"
              >
                Applicants
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default CompanyNavbar;