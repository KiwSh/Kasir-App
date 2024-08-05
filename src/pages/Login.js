import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

function Login() {
  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="row form_container p-5 rounded bg-white">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <Image
            src="assets/images/login.png"
            alt="Login"
            width="100%"
            height="auto"
          />
        </div>
        <div className="col-md-6">
          <form>
            <h3 className="text-center">Sign In</h3>
            <hr />
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                className="custom-control custom-checkbox"
                id="check"
              />
              <label htmlFor="check" className="custom-input-label ms-2">
                Remember me
              </label>
            </div>
            <div className="d-grid">
              <button className="btn btn-primary">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
