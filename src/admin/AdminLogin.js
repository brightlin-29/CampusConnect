import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/admin-login",
        {
          email,
          password,
        }
      );

      if (res.data.status === "success") {
        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.admin)
        );

        alert("Admin Login Success");

        navigate("/admin-dashboard");
      } else {
        alert("Invalid Admin Credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Admin Login
            </h2>

            <form onSubmit={login}>

              <input
                className="form-control mb-3"
                placeholder="Email"
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
              />

              <input
                className="form-control mb-3"
                placeholder="Password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
              />

              <button
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;