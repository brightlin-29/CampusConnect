import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyNavbar from "./CompanyNavbar";

function Applicants() {
  const [applicants, setApplicants] = useState([]);

  // ✅ FIX: correct companyId from localStorage
  const company = JSON.parse(localStorage.getItem("company"));
  const companyId = company?.id;

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `https://test-campus-server.ramchintech.com/company-applicants/${companyId}`
        );

        console.log("Applicants:", res.data);
        setApplicants(res.data);

      } catch (error) {
        console.log("Fetch Error:", error);
        alert("Cannot fetch applicants (Check backend route)");
      }
    };

    if (companyId !== undefined && companyId !== null) {
      fetchApplicants();
    } else {
      alert("Company not logged in");
    }

  }, [companyId]);

  // ✅ Update status function
  const updateStatus = async (applicationId, status) => {
    try {
      await axios.post("https://test-campus-server.ramchintech.com/update-status", {
        application_id: applicationId,
        status: status,
      });

      alert(`Applicant ${status}`);

      // refresh applicants after update
      const res = await axios.get(
        `https://test-campus-server.ramchintech.com/company-applicants/${companyId}`
      );

      setApplicants(res.data);

    } catch (error) {
      console.log("Update Error:", error);
      alert("Failed to update status");
    }
  };

  return (
    <>
      <CompanyNavbar />

      <div className="container mt-4">
        <div className="card shadow">
          
          <div className="card-header bg-primary text-white">
            <h3>Company Applicants</h3>
          </div>

          <div className="card-body">

            {applicants.length === 0 ? (
              <h4 className="text-center">No Applicants Found</h4>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">

                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>CGPA</th>
                      <th>Job Role</th>
                      <th>Status</th>
                      <th>Resume</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applicants.map((app) => (
                      <tr key={app.application_id}>

                        <td>{app.name}</td>
                        <td>{app.email}</td>
                        <td>{app.course}</td>
                        <td>{app.cgpa}</td>
                        <td>{app.job_role}</td>

                        <td>
                          <span
                            className={
                              app.status === "Selected"
                                ? "badge bg-success"
                                : app.status === "Rejected"
                                ? "badge bg-danger"
                                : app.status === "Shortlisted"
                                ? "badge bg-warning text-dark"
                                : "badge bg-secondary"
                            }
                          >
                            {app.status}
                          </span>
                        </td>

                        <td>
                          {app.resume ? (
                            <a
                              href={`https://test-campus-server.ramchintech.com/resume/${app.resume}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-primary btn-sm"
                            >
                              View Resume
                            </a>
                          ) : (
                            "No Resume"
                          )}
                        </td>

                        <td>
                          <button
                            className="btn btn-warning btn-sm me-1"
                            onClick={() =>
                              updateStatus(app.application_id, "Shortlisted")
                            }
                          >
                            Shortlist
                          </button>

                          <button
                            className="btn btn-success btn-sm me-1"
                            onClick={() =>
                              updateStatus(app.application_id, "Selected")
                            }
                          >
                            Select
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              updateStatus(app.application_id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Applicants;