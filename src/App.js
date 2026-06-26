```jsx
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Student
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./student/StudentDashboard";
import StudentProfile from "./student/StudentProfile";
import JobListings from "./student/JobListings";
import AppliedJobs from "./student/AppliedJobs";
import ResumeUpload from "./student/ResumeUpload";
import ApplicationForm from "./student/ApplicationForm";

// Company
import CompanyLogin from "./pages/CompanyLogin";
import CompanyDashboard from "./company/CompanyDashboard";
import PostJob from "./company/PostJob";
import ManageJobs from "./company/ManageJobs";
import Applicants from "./company/Applicants";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Students from "./admin/Students";
import Companies from "./admin/Companies";
import Jobs from "./admin/Jobs";
import Applications from "./admin/Applications";
import CreateCompany from "./admin/CreateCompany";

function App() {
  return (
    <BrowserRouter>

      {/* TEMP disable to test */}
      {/* <Navbar /> */}

      <Routes>

        {/* TEST PAGE */}
        <Route
          path="/"
          element={
            <div className="container mt-5">
              <h1>React Working ✅</h1>
            </div>
          }
        />

        {/* Student */}
        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/student-profile"
          element={<StudentProfile />}
        />

        <Route
          path="/job-listings"
          element={<JobListings />}
        />

        <Route
          path="/application-form"
          element={<ApplicationForm />}
        />

        <Route
          path="/applied-jobs"
          element={<AppliedJobs />}
        />

        <Route
          path="/resume-upload"
          element={<ResumeUpload />}
        />

        {/* Company */}
        <Route
          path="/company-login"
          element={<CompanyLogin />}
        />

        <Route
          path="/company-dashboard"
          element={<CompanyDashboard />}
        />

        <Route
          path="/post-job"
          element={<PostJob />}
        />

        <Route
          path="/manage-jobs"
          element={<ManageJobs />}
        />

        <Route
          path="/applicants"
          element={<Applicants />}
        />

        {/* Admin */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin-students"
          element={<Students />}
        />

        <Route
          path="/admin-companies"
          element={<Companies />}
        />

        <Route
          path="/admin-jobs"
          element={<Jobs />}
        />

        <Route
          path="/admin-applications"
          element={<Applications />}
        />

        <Route
          path="/create-company"
          element={<CreateCompany />}
        />

        {/* Other */}
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

      {/* TEMP disable to test */}
      {/* <Footer /> */}

    </BrowserRouter>
  );
}

export default App;
```
