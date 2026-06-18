import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    companies: 0,
    jobs: 0,
    applications: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin-dashboard"
      );

      setStats(res.data);

    } catch (err) {
      console.log("Dashboard Error:", err);
      alert("Failed to load dashboard");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4 admin-dashboard">

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            Admin Dashboard
          </h1>

          <p className="text-muted">
            Manage Students, Companies, Jobs & Applications
          </p>
        </div>

        {/* Stats */}
        <div className="row g-4">

          {/* Students */}
          <div className="col-lg-3 col-md-6">
            <div
              className="card shadow-lg border-0 p-4 text-center"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(to right,#4facfe,#00f2fe)"
              }}
            >
              <h1 className="text-white">
                {stats.students}
              </h1>

              <h5 className="text-white">
                Total Students
              </h5>
            </div>
          </div>

          {/* Companies */}
          <div className="col-lg-3 col-md-6">
            <div
              className="card shadow-lg border-0 p-4 text-center"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(to right,#43e97b,#38f9d7)"
              }}
            >
              <h1 className="text-white">
                {stats.companies}
              </h1>

              <h5 className="text-white">
                Total Companies
              </h5>
            </div>
          </div>

          {/* Jobs */}
          <div className="col-lg-3 col-md-6">
            <div
              className="card shadow-lg border-0 p-4 text-center"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(to right,#fa709a,#fee140)"
              }}
            >
              <h1 className="text-white">
                {stats.jobs}
              </h1>

              <h5 className="text-white">
                Total Jobs
              </h5>
            </div>
          </div>

          {/* Applications */}
          <div className="col-lg-3 col-md-6">
            <div
              className="card shadow-lg border-0 p-4 text-center"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(to right,#667eea,#764ba2)"
              }}
            >
              <h1 className="text-white">
                {stats.applications}
              </h1>

              <h5 className="text-white">
                Total Applications
              </h5>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;