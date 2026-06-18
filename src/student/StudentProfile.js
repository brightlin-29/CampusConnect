import React from "react";
import { Link } from "react-router-dom"; // Import Link

function StudentProfile() {
  const student = JSON.parse(localStorage.getItem("student"));

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        {/* Navigation Links */}
        <div className="mb-3 d-flex flex-wrap justify-content-start">
          {/* Navigation buttons */}
          <Link to="/student-dashboard" className="btn btn-dark m-2">
            Student Dashboard
          </Link>
          <Link to="/student-profile" className="btn btn-dark m-2">
            Profile
          </Link>
          <Link to="/job-listings" className="btn btn-dark m-2">
            Job Listings
          </Link>
          <Link to="/applied-jobs" className="btn btn-dark m-2">
            Applied Jobs
          </Link>
          <Link to="/resume-upload" className="btn btn-dark m-2">
            Resume Upload
          </Link>
        </div>

        <h2>Student Profile</h2>
        <hr />

        {/* Profile details inside styled boxes */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="border p-3 rounded shadow-sm h-100">
              <h5>Name</h5>
              <p>{student?.name}</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="border p-3 rounded shadow-sm h-100">
              <h5>Email</h5>
              <p>{student?.email}</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="border p-3 rounded shadow-sm h-100">
              <h5>Course</h5>
              <p>{student?.course}</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="border p-3 rounded shadow-sm h-100">
              <h5>Phone</h5>
              <p>{student?.phone}</p>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <div className="border p-3 rounded shadow-sm h-100">
              <h5>Address</h5>
              <p>{student?.address}</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="border p-3 rounded shadow-sm h-100">
              <h5>Skills</h5>
              <p>{student?.skills}</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="border p-3 rounded shadow-sm h-100">
              <h5>CGPA</h5>
              <p>{student?.cgpa}</p>
            </div>
          </div>
        </div>
        {/* End of profile boxes */}
      </div>
    </div>
  );
}

export default StudentProfile;