import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CompanyDashboard.css";
import CompanyNavbar from "./CompanyNavbar";

function CompanyDashboard() {

  const [stats, setStats] = useState({});
  const [company, setCompany] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const loggedCompany =
      JSON.parse(
        localStorage.getItem("company")
      );

    if (!loggedCompany) {
      navigate("/company-login");
      return;
    }

    setCompany(loggedCompany);

    axios
      .get(
        `https://test-campus-server.ramchintech.com/company-dashboard/${loggedCompany.id}`
      )
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.log(err));

  }, [navigate]);

  return (
    <>
      <CompanyNavbar />

      <div className="dashboard-container">

        <div className="dashboard-banner">

          <h1>
            Welcome,
            {" "}
            {company?.name}
          </h1>

          <p>
            Manage your jobs and applicants
          </p>

        </div>

        <div className="row mt-4">

          <div className="col-md-3 mb-4">
            <div className="dashboard-card jobs-card">

              <h5>Total Jobs</h5>

              <h2>
                {stats.jobs || 0}
              </h2>

            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="dashboard-card vacancy-card">

              <h5>Applications</h5>

              <h2>
                {stats.applications || 0}
              </h2>

            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="dashboard-card selected-card">

              <h5>Selected</h5>

              <h2>
                {stats.selected || 0}
              </h2>

            </div>
          </div>

        </div>

        <div className="row mt-4">

          <div className="col-md-12">

            <div className="info-box">

              <h4>Quick Actions</h4>

              <button
                className="btn btn-primary me-2"
                onClick={() => navigate("/post-job")}
              >
                Post Job
              </button>

              <button
                className="btn btn-success me-2"
                onClick={() => navigate("/manage-jobs")}
              >
                Manage Jobs
              </button>

              <button
                className="btn btn-warning"
                onClick={() => navigate("/applicants")}
              >
                Applicants
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default CompanyDashboard;