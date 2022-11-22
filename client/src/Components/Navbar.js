import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("khojUserToken") ? true : false;
  let isAdmin = localStorage.getItem("khojAdminToken") ? true : false;
  useEffect(() => {
    isAdmin = localStorage.getItem("khojAdminToken") ? true : false;
  }, []);
  const signout = () => {
    localStorage.removeItem("khojAdminToken");
    localStorage.removeItem("khojUserToken");
    toast.success("Logout Successful!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const login = () => {
    isAdmin ? navigate("/admin/login") : navigate("/login");
  };
  const chat = () => {
    navigate("/chat");
  };
  const globalMap = () => {
    navigate("/global-map");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light khoj-navbar fs-5 "
        style={{ fontWeight: "440" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand ms-2" href="/">
            <img src="/images/khojLogo.png" className="h-25 w-25" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse appNavbar navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto gap-5 ">
              <Link
                to={isAdmin ? "/admin" : "/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <li className="nav-item align-middle text-light">Home</li>
              </Link>
              {isLoggedIn && !isAdmin && (
                <>
                  <li
                    class="nav-item align-middle"
                    role="button"
                    onClick={(e) => globalMap()}
                  >
                    Global Map
                  </li>
                  <li
                    class="nav-item align-middle"
                    role="button"
                    onClick={(e) => chat()}
                  >
                    Chats
                  </li>
                  <li class="nav-item align-middle">
                    <Link to="/create-post">
                      <button className=" khoj-button1">
                        Post Your Lost Item
                      </button>
                    </Link>
                  </li>
                </>
              )}
              {!(
                localStorage.getItem("khojUserToken") ||
                localStorage.getItem("khojAdminToken")
              ) && (
                <li class="nav-item align-middle">
                  <a href="/register" class="nav-link text-light">
                    Register
                  </a>
                </li>
              )}
              <li class="nav-item">
                <a class="nav-link" href="#">
                  {/* <img
                    src="/icons/user-circle-solid.svg"
                    className="img-icons"
                  /> */}
                  <button
                    className=" khoj-button2"
                    onClick={(e) =>
                      localStorage.getItem("khojUserToken") ||
                      localStorage.getItem("khojAdminToken")
                        ? signout()
                        : login()
                    }
                  >
                    {localStorage.getItem("khojUserToken") ||
                    localStorage.getItem("khojAdminToken") ? (
                      <> Signout</>
                    ) : (
                      <>Login</>
                    )}
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
