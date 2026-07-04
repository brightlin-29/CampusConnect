import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin =async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter Email and Password");
      return;
    }




  const response = await axios.post(
    "http://127.0.0.1https://test-campus-server.ramchintech.com/login",
    {
      email: email,
      password: password
    }
  );

  console.log(response.data);

    // Later you can connect this to MySQL backend
    if(response.data.status === "success"){
    navigate("/student-dashboard");}
    else{
      alert('Invalid')
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">
              <h2>Student Login</h2>
            </div>

            <div className="card-body p-4">

              <form onSubmit={handleLogin}>

                <div className="mb-3">
                  <label className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

              <p className="text-center mt-3">
                Welcome to CampusConnect
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentLogin;