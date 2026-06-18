import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CompanyLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter Company Email and Password");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/company-login",
        {
          email: email,
          password: password
        }
      );

      console.log(response.data);

      if (response.data === "success") {
        alert("Company Login Successful ✅");
        navigate("/company-dashboard");
      } else {
        alert("Invalid Company Credentials");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-success text-white text-center">
              <h2>Company Login</h2>
            </div>

            <div className="card-body p-4">

              <form onSubmit={handleLogin}>

                <div className="mb-3">
                  <label className="form-label">
                    Company Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Company Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>

              </form>

              <div className="text-center mt-3">
                <p>
                  Welcome to CampusConnect Recruiter Portal
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CompanyLogin;