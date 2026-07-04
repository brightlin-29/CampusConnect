import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar"; // ✅ Added

function Applications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {

      const res = await axios.get(
        "https://test-campus-server.ramchintech.com/admin-applications"
      );

      setApplications(res.data);

    } catch (err) {

      console.log(err);

      alert("Cannot load applications");

    }
  };

  const deleteApplication = async (id) => {

    const ok = window.confirm(
      "Delete this application?"
    );

    if (!ok) return;

    try {

      await axios.delete(
        `https://test-campus-server.ramchintech.com/delete-application/${id}`
      );

      alert("Application Deleted");

      fetchApplications();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }
  };

  return (

    <>

      <AdminNavbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          All Applications
        </h2>

        <div className="card shadow">

          <div className="card-body">

            {applications.length === 0 ? (

              <h4>No Applications Found</h4>

            ) : (

              <table className="table table-bordered">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Resume</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {applications.map((app) => (

                    <tr key={app.application_id}>

                      <td>{app.application_id}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.company_name}</td>
                      <td>{app.job_role}</td>

                      <td>

                        <span
                          className={
                            app.status === "Selected"
                              ? "badge bg-success"
                              : app.status === "Rejected"
                              ? "badge bg-danger"
                              : app.status === "Shortlisted"
                              ? "badge bg-warning"
                              : "badge bg-secondary"
                          }
                        >
                          {app.status}
                        </span>

                      </td>

                      <td>

                        {app.resume_viewed === "Yes"
                          ? "Viewed"
                          : "Not Viewed"}

                      </td>

                      <td>

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            deleteApplication(
                              app.application_id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </>

  );

}

export default Applications;