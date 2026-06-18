import React from "react";

function Register() {
  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">
              <h2>Student Registration</h2>
            </div>

            <div className="card-body p-4">

              <input
                className="form-control mb-3"
                placeholder="Full Name"
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email Address"
              />

              <input
                className="form-control mb-3"
                placeholder="Department"
              />

              <input
                className="form-control mb-3"
                placeholder="Phone Number"
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
              />

              <button className="btn btn-primary w-100">
                Create Account
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;