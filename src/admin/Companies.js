import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar"; // ✅ Added

function Companies() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/admin-companies"
      );

      setCompanies(res.data);

    } catch (error) {

      console.log(error);

      alert("Cannot load companies");

    }
  };

  const deleteCompany = async (id) => {

    const ok = window.confirm(
      "Delete this company?"
    );

    if (!ok) return;

    try {

      await axios.delete(
        `http://localhost:5000/delete-company/${id}`
      );

      alert("Company Deleted");

      fetchCompanies();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }
  };

  return (

    <>

      <AdminNavbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          All Companies
        </h2>

        <div className="card shadow">

          <div className="card-body">

            {companies.length === 0 ? (

              <h4>No Companies Found</h4>

            ) : (

              <table className="table table-bordered">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {companies.map((c) => (

                    <tr key={c.id}>

                      <td>{c.id}</td>

                      <td>{c.name}</td>

                      <td>{c.email}</td>

                      <td>

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            deleteCompany(c.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </>

  );
}

export default Companies;