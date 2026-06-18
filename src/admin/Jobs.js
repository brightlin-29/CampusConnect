import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/admin-jobs"
      );

      setJobs(res.data);

    } catch (err) {

      console.log(err);

      alert("Cannot load jobs");

    }
  };

  const deleteJob = async (id) => {

    const ok = window.confirm(
      "Delete this job?"
    );

    if (!ok) return;

    try {

      await axios.delete(
        `http://localhost:5000/delete-job/${id}`
      );

      alert("Job Deleted");

      fetchJobs();

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
          All Jobs
        </h2>

        <div className="card shadow">

          <div className="card-body">

            {jobs.length === 0 ? (

              <h4>No Jobs Found</h4>

            ) : (

              <table className="table table-bordered">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Package</th>
                    <th>Remaining</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {jobs.map((job) => (

                    <tr key={job.id}>

                      <td>{job.id}</td>

                      <td>{job.company_name}</td>

                      <td>{job.job_role}</td>

                      <td>{job.location}</td>

                      <td>{job.package}</td>

                      <td>
                        {job.remaining_positions}
                      </td>

                      <td>

                        <span
                          className={
                            job.status === "Active"
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
                          {job.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            deleteJob(job.id)
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

export default Jobs;