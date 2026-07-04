import React, { useState } from "react";
import axios from "axios";
import CompanyNavbar from "./CompanyNavbar";

function PostJob() {
  const emptyPosition = {
    job_role: "",
    location: "",
    package: "",
    skills_required: "",
    description: "",
    deadline: "",
  };

  const [companyName, setCompanyName] = useState("");
  const [positions, setPositions] = useState([
    { ...emptyPosition },
  ]);

  const handleChange = (index, e) => {
    const updated = [...positions];

    updated[index][e.target.name] =
      e.target.value;

    setPositions(updated);
  };

  const addPosition = () => {
    setPositions([
      ...positions,
      { ...emptyPosition },
    ]);
  };

  const removePosition = (index) => {
    setPositions(
      positions.filter(
        (_, i) => i !== index
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        company_name: companyName,
        positions: positions,
      };

      const res = await axios.post(
        "https://test-campus-server.ramchintech.com/post-job",
        payload
      );

      alert(res.data.message);

      setCompanyName("");

      setPositions([
        { ...emptyPosition },
      ]);

    } catch (error) {
      console.log(error);
      alert("Error posting jobs");
    }
  };

  return (
    <>
      <CompanyNavbar />

      <div className="container mt-5">

        <div className="card shadow-lg p-4">

          <h2 className="text-center mb-4">
            Post Company Positions
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">

              <label className="form-label">
                Company Name
              </label>

              <input
                type="text"
                className="form-control"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {positions.map(
              (item, index) => (

                <div
                  key={index}
                  className="border rounded p-4 mb-4"
                >

                  <h5>
                    Position {index + 1}
                  </h5>

                  <input
                    type="text"
                    name="job_role"
                    className="form-control mb-3"
                    placeholder="Job Role"
                    value={item.job_role}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    required
                  />

                  <input
                    type="text"
                    name="location"
                    className="form-control mb-3"
                    placeholder="Location"
                    value={item.location}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    required
                  />

                  <input
                    type="text"
                    name="package"
                    className="form-control mb-3"
                    placeholder="Package (Eg: 6 LPA)"
                    value={item.package}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    required
                  />

                  <textarea
                    name="skills_required"
                    className="form-control mb-3"
                    placeholder="Skills Required"
                    value={item.skills_required}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    required
                  />

                  <textarea
                    name="description"
                    className="form-control mb-3"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    required
                  />

                  <input
                    type="date"
                    name="deadline"
                    className="form-control"
                    value={item.deadline}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    required
                  />

                  {positions.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger mt-3"
                      onClick={() =>
                        removePosition(index)
                      }
                    >
                      Remove Position
                    </button>
                  )}

                </div>
              )
            )}

            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={addPosition}
            >
              + Add Position
            </button>

            <button
              type="submit"
              className="btn btn-success"
            >
              Post Jobs
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default PostJob;