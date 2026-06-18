import React, { useState } from "react";
import {
  useNavigate,
  useLocation,
  Link
} from "react-router-dom";

import axios from "axios";

function ApplicationForm() {

  const navigate = useNavigate();

  const location = useLocation();

  const job = location.state?.job;

  const student =
    JSON.parse(
      localStorage.getItem("student")
    );

  const [formData, setFormData] =
    useState({

      name:
        student?.name || "",

      email:
        student?.email || "",

      course:
        student?.course || "",

      cgpa:
        student?.cgpa || "",

      phone: "",

      skills: ""

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const submitApplication =
    async (e) => {

      e.preventDefault();

      if (!student) {
        alert("Login required");
        return;
      }

      if (!job) {
        alert("Job missing");
        return;
      }

      try {

        await axios.post(
          "http://localhost:5000/apply-job",
          {

            student_id:
              student.id,

            name:
              formData.name,

            email:
              formData.email,

            course:
              formData.course,

            cgpa:
              formData.cgpa,

            job_role:
              job.job_role,

            company_name:
              job.company_name,

            company_id:
              job.company_id,

            job_id:
              job.id

          }
        );

        alert(
          "Application Submitted"
        );

        navigate(
          "/applied-jobs"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Application failed"
        );

      }

    };

  if (!job) {

    return (

      <div className="container mt-5">

        <div className="alert alert-danger">

          No job selected

        </div>

        <Link
          to="/job-listings"
          className="btn btn-primary"
        >
          Back
        </Link>

      </div>

    );

  }

  return (

    <div className="container mt-4">

      <h2>
        Apply for Job
      </h2>

      <div className="alert alert-info">

        <strong>
          Company:
        </strong>

        {" "}

        {job.company_name}

        <br />

        <strong>
          Role:
        </strong>

        {" "}

        {job.job_role}

      </div>

      <form
        onSubmit={
          submitApplication
        }
      >

        <input
          className="form-control mb-2"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="course"
          value={formData.course}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="cgpa"
          value={formData.cgpa}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          name="skills"
          onChange={handleChange}
          placeholder="Skills"
        />

        <button
          className="btn btn-success w-100"
        >
          Submit
        </button>

      </form>

    </div>

  );

}

export default ApplicationForm;