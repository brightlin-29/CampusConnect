import React from "react";

function Contact() {
  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">
              <h2>Contact Us</h2>
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

              <textarea
                className="form-control mb-3"
                rows="5"
                placeholder="Your Message"
              ></textarea>

              <button className="btn btn-primary w-100">
                Send Message
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;