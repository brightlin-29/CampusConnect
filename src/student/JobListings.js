import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/jobs"
      );

      setJobs(res.data);

    } catch (error) {
      console.log(error);
      alert("Failed to load jobs");
    }
  };

  const applyJob = (job) => {
    navigate("/application-form", {
      state: {
        job: job
      }
    });
  };

  return (
    <div className="container mt-4">

      <div className="mb-3 d-flex flex-wrap">

        <Link
          to="/student-dashboard"
          className="btn btn-dark m-2"
        >
          Dashboard
        </Link>

        <Link
          to="/student-profile"
          className="btn btn-dark m-2"
        >
          Profile
        </Link>

        <Link
          to="/job-listings"
          className="btn btn-primary m-2"
        >
          Jobs
        </Link>

        <Link
          to="/applied-jobs"
          className="btn btn-dark m-2"
        >
          Applied Jobs
        </Link>

      </div>

      <h2 className="mb-4">
        Available Jobs
      </h2>

      <div className="row">

        {jobs.length > 0 ? (

          jobs.map((job) => (

            <div
              key={job.id}
              className="col-md-4 mb-4"
            >

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4>
                    {job.company_name}
                  </h4>

                  <p>
                    <strong>Role:</strong>
                    {" "}
                    {job.job_role}
                  </p>

                  <p>
                    <strong>Location:</strong>
                    {" "}
                    {job.location}
                  </p>

                  <p>
                    <strong>Package:</strong>
                    {" "}
                    {job.package}
                  </p>

                  <button
                    className="btn btn-success w-100"
                    onClick={() =>
                      applyJob(job)
                    }
                  >
                    Apply Now
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <h4>No jobs available</h4>

        )}

      </div>

    </div>
  );
}

export default JobListings;