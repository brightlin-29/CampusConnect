import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyNavbar from "./CompanyNavbar";

function ManageJobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {

    const company =
      JSON.parse(
        localStorage.getItem("company")
      );

    axios
      .get(
        `http://localhost:5000/manage-jobs/${company.id}`
      )

      .then((res) => {
        setJobs(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const deleteJob = async (id) => {

    if (!window.confirm("Delete this job?"))
      return;

    try {

      await axios.delete(
        `http://localhost:5000/delete-job/${id}`
      );

      alert("Deleted");

      fetchJobs();

    } catch {

      alert("Delete failed");

    }
  };

  return (
    <>
      <CompanyNavbar />

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-dark text-white">

            <h3>
              Manage Company Positions
            </h3>

          </div>

          <div className="card-body">

            {jobs.length === 0 ? (

              <h5>No Vacancies Posted</h5>

            ) : (

              <div className="table-responsive">

                <table className="table table-bordered">

                  <thead className="table-primary">

                    <tr>

                      <th>ID</th>

                      <th>Role</th>

                      <th>Location</th>

                      <th>Package</th>

                      

                      <th>Remaining</th>

                      <th>Status</th>

                      <th>Deadline</th>

                      <th>Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {jobs.map((job) => (

                      <tr key={job.id}>

                        <td>{job.id}</td>

                        <td>{job.job_role}</td>

                        <td>{job.location}</td>

                        <td>{job.package}</td>

                        

                        <td>

                          <strong>

                            {job.remaining_positions}

                          </strong>

                        </td>

                        <td>

                          {job.status}

                        </td>

                        <td>

                          {job.deadline}

                        </td>

                        <td>

                          <button
                            className="btn btn-danger btn-sm"
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

              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default ManageJobs;