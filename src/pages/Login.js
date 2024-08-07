  import React, { useState, useEffect } from "react";
  import Api from "../Api"; // Impor konfigurasi Axios dari api.js
  import Cookies from "js-cookie";
  import { useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import "../index.css";
  import { Image } from "react-bootstrap";

  function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const token = Cookies.get("token");

    useEffect(() => {
      if (token) {
        navigate("/");
      }
    }, [token, navigate]);

    const login = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        setErrors("Email and password are required.");
        return;
      }
      setLoading(true);

      try {
        const response = await Api.post("/api/login", {
          email: email,
          password: password,
        });

        Cookies.set("token", response.data.token);
        Cookies.set("user", JSON.stringify(response.data.user));
        Cookies.set("permissions", JSON.stringify(response.data.permissions));

        Swal.fire({
          title: "Login Successfully!",
          text: "You have successfully logged in",
          icon: "success",
          button: false,
        });

        const userRole = response.data.roles[0];

        switch (userRole) {
          case "admin":
            navigate("/AdminDashboard");
            break;
          case "user":
            navigate("/UserDashboard");
            break;
          default:
            console.error("Role not recognized:", userRole);
            navigate("/default-dashboard");
        }
      } catch (error) {
        if (error.response) {
          setErrors(error.response.data.message);
        } else if (error.request) {
          setErrors("Network error. Please try again later.");
        } else {
          setErrors("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

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
            <form onSubmit={login}>
              <h3 className="text-center">Sign In</h3>
              <hr />
              <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
              {errors && <div className="text-danger mt-2">{errors}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default Login;
