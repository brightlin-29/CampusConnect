import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ResumeUpload() {
  // Retrieve student info from local storage
  const student = JSON.parse(localStorage.getItem("student"));

  // State for selected resume file
  const [resume, setResume] = useState(null);

  // State for resume URL to view
  const [resumeUrl, setResumeUrl] = useState(
    localStorage.getItem("resumeUrl")
  );

  // Function to handle resume file selection
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  // Function to upload resume to backend
  const uploadResume = async () => {
    if (!resume) {
      alert("Select a resume file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("student_id", student.id);

    try {
      const res = await axios.post("http://localhost:5000/upload-resume", formData);
      alert(res.data.message);
      const url = `http://localhost:5000/resume/${res.data.resume}`;
      setResumeUrl(url);
      localStorage.setItem("resumeUrl", url);
    } catch {
      alert("Upload Failed");
    }
  };

  return (
    <div className="container mt-4">
      {/* Navigation Links */}
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
        <Link to="/applied-jobs" className="btn btn-dark m-2">
          Applied Jobs
        </Link>
        <Link to="/resume-upload" className="btn btn-dark m-2">
          Resume Upload
        </Link>
      </div>

      <div className="card shadow p-4">
        <h2>Resume Upload</h2>
        <hr />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="form-control"
          onChange={handleFileChange}
        />
        <br />
        <button className="btn btn-success" onClick={uploadResume}>
          Upload Resume
        </button>
        <br />
        {resumeUrl && (
          <div className="alert alert-success mt-3">
            Resume Uploaded
            <br />
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              View Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;