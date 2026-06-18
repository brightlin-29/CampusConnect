import React from "react";

function About() {
  return (
    <div>

      <div className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold">About CampusConnect</h1>
        <p className="lead">
          Bridging the Gap Between Students and Recruiters
        </p>
      </div>

      <div className="container mt-5">

        <div className="row">

          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Students"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6">
            <h2>Who We Are</h2>

            <p>
              CampusConnect is a smart placement portal designed to help
              students find career opportunities and companies recruit
              talented candidates efficiently.
            </p>

            <p>
              Our platform simplifies placement activities including
              registrations, job postings, applications, and interview
              scheduling.
            </p>

            <button className="btn btn-primary">
              Learn More
            </button>

          </div>

        </div>

      </div>

      <div className="container mt-5">

        <div className="row text-center">

          <div className="col-md-4">
            <div className="card shadow p-4">
              <h2>500+</h2>
              <p>Students</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4">
              <h2>100+</h2>
              <p>Companies</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4">
              <h2>300+</h2>
              <p>Jobs Posted</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;