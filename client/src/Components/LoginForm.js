import React, { useState } from "react";
import { postRequest } from "../serviceCalls";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitLoginForm = async () => {
    const data = await postRequest("/user/login", {
      email,
      password,
    });
    if (data.token) {
      localStorage.setItem("khojUserToken", data.token);
      localStorage.setItem("khojUser", data.user._id);
      toast.success(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="  pb-5 mt-5 khoj-login-form-start ">
      <div className=" text-center  mt-2 ">
        {" "}
        <img src="/images/khojLogo.png" className="h-25 w-25 " />
        <div className=" fw-lighter fs-5 mt-4  my-4 ">Welcome to Khoj! </div>
      </div>
      <div className="login-form  ps-5 text-start ms-5">
        <div className="email-section ">
          <div className=" ">Enter email</div>
          <div className="email-input">
            <input
              className="khoj-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="password-section ">
          <div className=" mt-5">Enter Password</div>
          <div className="password-input">
            <input
              className="khoj-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div
          className="sign-in-btn  mt-5 text-white "
          role="button"
          onClick={() => submitLoginForm()}
        >
          Sign in
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
