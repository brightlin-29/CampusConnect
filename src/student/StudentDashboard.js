import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Install react-icons: npm install react-icons
import { FaBell } from "react-icons/fa";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [message, setMessage] = useState(""); // Notification message

  // Load student data & notification message on component mount
  useEffect(() => {
    const savedStudent = JSON.parse(localStorage.getItem("student"));
    if (savedStudent) {
      setStudent(savedStudent);

      // Fetch notification for the student
      axios
        .get(`https://test-campus-server.ramchintech.com/student/${savedStudent.email}`)
        .then((res) => {
          setMessage(res.data.notification);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Fetch messages for the student
    if (savedStudent && savedStudent.email) {
      axios
        .get(`https://test-campus-server.ramchintech.com/student-messages/${savedStudent.email}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile
  const saveProfile = async () => {
    try {
      const response = await axios.post(
        "https://test-campus-server.ramchintech.com/update-student",
        student
      );
      if (response.data.status === "success") {
        localStorage.setItem("student", JSON.stringify(student));
        alert("Profile Updated Successfully");
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (!student) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">No Student Data Found</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header with notification message and bell icon */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Student Dashboard</h2>
        {/* Notification message */}
        {message && (
          <div
            className="
              alert
              alert-success
              d-flex
              justify-content-between
              align-items-center
            "
          >
            <div>🔔 {message}</div>
          </div>
        )}
        {/* Bell icon button */}
        <button
          className="btn btn-dark"
          onClick={() => setShowMessages(!showMessages)}
        >
          <FaBell /> {messages.length > 0 && ` ${messages.length}`}
        </button>
      </div>

      {/* Show messages */}
      {showMessages && (
        <div className="mt-3">
          <h4>Messages</h4>
          {messages.length === 0 ? (
            <div className="alert alert-info">No new messages</div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="alert alert-info">
                {m.message}
              </div>
            ))
          )}
        </div>
      )}

      {/* Navigation Links - updated as per your request */}
      <div className="mb-3 d-flex flex-wrap justify-content-start">
        {/* Updated navigation buttons */}
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

      {/* Profile Card */}
      <div className="row">
        {/* Profile Image & Info */}
        <div className="col-md-4">
          <div className="card shadow p-4 text-center">
            <img
              src={
                student.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Student"
              className="rounded-circle mx-auto"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
            {editing && (
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Paste Image URL"
                name="profilePic"
                value={student.profilePic || ""}
                onChange={handleChange}
              />
            )}
            <h3 className="mt-3">{student.name}</h3>
            <p className="text-muted">{student.email}</p>
          </div>
        </div>

        {/* Profile & Details */}
        <div className="col-md-8">
          <div className="card shadow p-4">
            {/* Edit / Save Buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              {!editing ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <button className="btn btn-success" onClick={saveProfile}>
                  Save Profile
                </button>
              )}
            </div>

            <hr />

            {/* Personal Details */}
            <h4>Personal Details</h4>
            <div className="row">
              {/* Name */}
              <div className="col-md-6 mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={student.name || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              {/* Email */}
              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={student.email || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              {/* Phone */}
              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={student.phone || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              {/* Course */}
              <div className="col-md-6 mb-3">
                <label>Course</label>
                <input
                  type="text"
                  name="course"
                  className="form-control"
                  value={student.course || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              {/* Address */}
              <div className="col-md-12 mb-3">
                <label>Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  value={student.address || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>

            <hr />

            {/* Professional Details */}
            <h4>Professional Details</h4>
            <div className="row">
              {/* Skills */}
              <div className="col-md-6 mb-3">
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  className="form-control"
                  value={student.skills || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              {/* CGPA */}
              <div className="col-md-6 mb-3">
                <label>CGPA</label>
                <input
                  type="text"
                  name="cgpa"
                  className="form-control"
                  value={student.cgpa || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              {/* LinkedIn */}
              <div className="col-md-6 mb-3">
                <label>LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  className="form-control"
                  value={student.linkedin || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              {/* GitHub */}
              <div className="col-md-6 mb-3">
                <label>GitHub</label>
                <input
                  type="text"
                  name="github"
                  className="form-control"
                  value={student.github || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              {/* Resume Link */}
              <div className="col-md-12 mb-3">
                <label>Resume Link</label>
                <input
                  type="text"
                  name="resume"
                  className="form-control"
                  value={student.resume || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;