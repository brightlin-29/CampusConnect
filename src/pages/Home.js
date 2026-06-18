import React from "react";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <div className="bg-primary text-white p-5">

        <div className="text-center">

          <h1 className="display-4 fw-bold">
            CampusConnect Placement Portal
          </h1>

          <p className="lead mt-3">
            Connecting Students with Top Recruiters Across India
          </p>

        </div>

      </div>

      {/* About Section */}
      <div className="container mt-5">

        <h2 className="text-center mb-4">
          Why Choose CampusConnect?
        </h2>

        <div className="row justify-content-center">

          <div className="col-md-6 mb-4">
            <div className="card shadow p-4 text-center h-100">

              <h4>Students</h4>

              <p>
                Create profiles, upload resumes,
                and apply for jobs from top companies.
              </p>

            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow p-4 text-center h-100">

              <h4>Companies</h4>

              <p>
                Post jobs, review applications,
                and hire talented students.
                Manage students, companies,
                job postings, and reports.
              </p>

            </div>
          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="container mt-5">

        <h2 className="text-center mb-4">
          Placement Statistics
        </h2>

        <div className="row text-center">

          <div className="col-md-3 mb-4">
            <div className="card shadow p-4">
              <h1 className="text-primary">500+</h1>
              <p>Students Registered</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow p-4">
              <h1 className="text-success">100+</h1>
              <p>Companies</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow p-4">
              <h1 className="text-warning">300+</h1>
              <p>Jobs Posted</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow p-4">
              <h1 className="text-danger">250+</h1>
              <p>Students Placed</p>
            </div>
          </div>

        </div>

      </div>

      {/* Services */}
      <div className="container mt-5 mb-5">

        <h2 className="text-center mb-4">
          Our Services
        </h2>

        <div className="row">

          <div className="col-md-6 mb-4">

            <div className="card shadow p-4 h-100">

              <h4>Resume Management</h4>

              <p>
                Upload and manage resumes
                for quick job applications.
              </p>

            </div>

          </div>

          <div className="col-md-6 mb-4">

            <div className="card shadow p-4 h-100">

              <h4>Interview Scheduling</h4>

              <p>
                Get notified about interview
                dates, timings, and locations.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;