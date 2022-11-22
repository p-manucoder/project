import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "./../serviceCalls";
import { toast } from "react-hot-toast";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("khojAdminToken");
    if (token) navigate("/admin");
  }, []);
  const login = async () => {
    const data = postRequest("/admin/login", {
      email,
      password,
    }).then((res) => {
      if (res.status == "fail") {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      localStorage.setItem("khojAdminToken", res.token);
      setTimeout(() => {
        navigate("/admin", {
          state: {
            homepageData: res.homepageData,
          },
        });
      }, 1000);
    });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className=" my-5 admin-login-div">
      <div className=" fw-4">Admin Login</div>
      <div className="mt-3">
        <div>Email:</div>
        <input onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mt-3">
        <div>Password:</div>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </div>
      <button className="btn  mt-3" onClick={(e) => login()}>
        Login
      </button>
    </div>
  );
};

export default AdminLoginPage;
