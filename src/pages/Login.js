import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("Student");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const api =
        role === "Student"
          ? "http://localhost:5000/login"
          : "http://localhost:5000/company-login";

      const res = await axios.post(api, {
        email,
        password,
      });

      console.log(res.data);

      if (res.data.status === "success") {
        
        if (role === "Student") {

          localStorage.removeItem("company");

          localStorage.setItem(
            "student",
            JSON.stringify(res.data.student)
          );

          alert("Student Login Success");

          navigate("/student-dashboard");

        } else {

          localStorage.removeItem("student");

          // ✅ STORE FULL COMPANY OBJECT
          localStorage.setItem(
            "company",
            JSON.stringify(res.data.company)
          );

          console.log(
            "Logged Company:",
            res.data.company
          );

          alert(
            `${res.data.company.name} Login Success`
          );

          navigate("/company-dashboard");
        }

      } else {
        alert("Invalid Credentials");
      }

    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords not matching");
      return;
    }

    try {

      const api =
        role === "Student"
          ? "http://localhost:5000/register"
          : "http://localhost:5000/company-register";

      const payload =
        role === "Student"
          ? {
              name,
              email,
              course,
              password,
            }
          : {
              name,
              email,
              password,
            };

      const res = await axios.post(
        api,
        payload
      );

      if (res.data.status === "success") {

        alert("Signup Success");

        setName("");
        setEmail("");
        setCourse("");
        setPassword("");
        setConfirmPassword("");

        setIsLogin(true);

      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h2 className="text-center">
              CampusConnect
            </h2>

            <select
              className="form-select mb-3"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option>Student</option>
              <option>Company</option>
            </select>

            {isLogin ? (

              <form onSubmit={handleLogin}>

                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button className="btn btn-success w-100">
                  Login
                </button>

              </form>

            ) : (

              <form onSubmit={handleSignup}>

                <input
                  className="form-control mb-3"
                  placeholder={
                    role === "Student"
                      ? "Student Name"
                      : "Company Name"
                  }
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

                {role === "Student" && (
                  <input
                    className="form-control mb-3"
                    placeholder="Course"
                    value={course}
                    onChange={(e) =>
                      setCourse(e.target.value)
                    }
                  />
                )}

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                <button className="btn btn-primary w-100">
                  Sign Up
                </button>

              </form>

            )}

            <p
              className="text-center mt-3"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setIsLogin(!isLogin)
              }
            >
              {isLogin
                ? "Create Account"
                : "Already have account?"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;