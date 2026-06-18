import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AppliedJobs() {
  const student = JSON.parse(localStorage.getItem("student"));

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (student) {
      const fetchApplications = () => {
        axios
          .get(`http://localhost:5000/student-applications/${student.id}`)
          .then((res) => {
            setJobs(res.data);
          })
          .catch((err) => {
            console.log(err);
            alert("Failed to fetch applications");
          });
      };

      fetchApplications();
    }
  }, [student]);

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/delete-application/${id}`
      );

      alert("Application Withdrawn Successfully");

      // Re-fetch applications after deletion
      axios
        .get(`http://localhost:5000/student-applications/${student.id}`)
        .then((res) => {
          setJobs(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to refresh applications");
        });
    } catch (error) {
      console.log(error);
      alert("Failed to withdraw application");
    }
  };

  return (
    <div className="container mt-4">
      {/* Navigation */}
      <div className="mb-3 d-flex flex-wrap justify-content-start">
        <Link to="/student-dashboard" className="btn btn-dark m-2">
          Student Dashboard
        </Link>
        <Link to="/student-profile" className="btn btn-dark m-2">
          Profile
        </Link>
        <Link to="/job-listings" className="btn btn-dark m-2">
          Job Listings
        </Link>
        <Link to="/applied-jobs" className="btn btn-primary m-2">
          Applied Jobs
        </Link>
        <Link to="/resume-upload" className="btn btn-dark m-2">
          Resume Upload
        </Link>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>My Applied Jobs</h3>
        </div>

        <div className="card-body">
          {jobs.length === 0 ? (
            <div className="alert alert-warning text-center">
              No Applications Yet
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.application_id}
                className="card mb-3 border shadow-sm"
              >
                <div className="card-body">
                  <h4 className="text-primary">{job.company_name}</h4>
                  <p>
                    <strong>Job Role:</strong> {job.job_role}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        job.status === "Selected"
                          ? "badge bg-success"
                          : job.status === "Rejected"
                          ? "badge bg-danger"
                          : job.status === "Shortlisted"
                          ? "badge bg-warning text-dark"
                          : "badge bg-secondary"
                      }
                    >
                      {job.status}
                    </span>
                  </p>
                  <p>
                    <strong>Resume Status:</strong>{" "}
                    {job.resume_viewed === "Yes" ? (
                      <span className="badge bg-info">👀 Resume Viewed</span>
                    ) : (
                      <span className="badge bg-secondary">
                        Not Viewed Yet
                      </span>
                    )}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteApplication(job.application_id)}
                  >
                    Withdraw Application
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;