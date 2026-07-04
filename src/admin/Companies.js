
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "https://test-campus-server.ramchintech.com/admin-companies"
      );

      setCompanies(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Cannot load companies");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="fw-bold">
            Company Overview
          </h2>

          <button
            className="btn btn-success"
            onClick={() => navigate("/create-company")}
          >
            Create Company
          </button>

        </div>

        <div className="row">

          {companies.length === 0 ? (

            <div className="text-center">
              <h5>No Companies Registered</h5>
            </div>

          ) : (

            companies.map((c) => (
              <div
                className="col-md-4 mb-4"
                key={c.id}
              >

                <div
                  className="card shadow-lg h-100"
                  style={{
                    borderRadius: "20px",
                    padding: "20px"
                  }}
                >

                  <h3 className="text-primary mb-3">
                    {c.name}
                  </h3>

                  <hr />

                  <p>
                    Applicants:
                    <b> {c.total_applications || 0}</b>
                  </p>

                  <p>
                    Available Location:
                    <br />

                    <b className="text-secondary">
                      {c.locations?.trim()
                        ? c.locations
                        : "No jobs posted"}
                    </b>

                  </p>

                  <p>
                    Available Jobs:
                    <b className="text-success">
                      {" "}
                      {c.available_jobs || 0}
                    </b>
                  </p>

                </div>

              </div>
            ))

          )}

        </div>

      </div>
    </>
  );
}

export default Companies;

