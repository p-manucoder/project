import React, { useState } from "react";
import axios from "axios";
import { postRequest } from "../serviceCalls";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
  });
  const [showInputAddress, setShowInputAddress] = useState(false);
  const onChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const submitFormData = async () => {
    const data = await postRequest("/user/signup", formData);
    if (data.status == "fail") {
      toast.error(data.message);
      return;
    }
    let token = data.token;
    localStorage.setItem("khojUserToken", token);
    localStorage.setItem("khojUser", data.user._id);

    if (token) {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className=" text-center">
      <div className=" pb-5  ">
        <div className=" text-center pt-5">
          <img src="images/khojLogo.png" className="img img-fluid w-25 h-25" />
        </div>
        <div className=" text-center fw-lighter fs-3 pt-5 ">
          {" "}
          Welcome to Khoj!
        </div>
        <div className="signup-form ms-5  m-5 ">
          {!showInputAddress && (
            <div>
              <div className="name-section">
                <div className="text-start ">Enter Name</div>
                <div className="name-input row gap-3 mt-2">
                  <input
                    className="khoj-input col"
                    placeholder={"Enter First Name"}
                    name="firstName"
                    onChange={(e) => onChangeFormData(e)}
                  />
                  <input
                    className="khoj-input col"
                    placeholder={"Enter Last Name"}
                    name="lastName"
                    onChange={(e) => onChangeFormData(e)}
                  />
                </div>
              </div>
              <div className="email-pwd-section mt-5">
                <div className="text-start ">Enter Email and Password</div>
                <div className="name-input row gap-3 mt-2">
                  <input
                    className="khoj-input col"
                    placeholder={"Enter Email"}
                    name="email"
                    onChange={(e) => onChangeFormData(e)}
                  />
                  <input
                    className="khoj-input col"
                    placeholder={"Enter Password"}
                    name="password"
                    type="password"
                    onChange={(e) => onChangeFormData(e)}
                  />
                </div>
              </div>
              <div className="password-section">
                <div className="mt-5 ">Enter Mobile Number</div>

                <div className="mob-no-input  gap-3 mt-2">
                  <input
                    className="khoj-input w-50"
                    name="mobileNumber"
                    onChange={(e) => onChangeFormData(e)}
                    defaultValue={"+91"}
                  />
                </div>
              </div>
            </div>
          )}
          {/* second half  */}
          {showInputAddress && (
            <div>
              <div className="password-section">
                <div className="text-start mt-5">Enter Address</div>

                <div className="mob-no-input  gap-3 mt-2">
                  <textarea
                    className="khoj-text-area w-100"
                    name="address"
                    onChange={(e) => onChangeFormData(e)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {!showInputAddress && (
          <div
            className="sign-in-btn  text-white ms-5"
            role="button"
            onClick={(e) => setShowInputAddress(true)}
          >
            Next{"->"}
          </div>
        )}
        {showInputAddress && (
          <div
            className="sign-in-btn  text-white "
            role="button"
            onClick={() => submitFormData(formData)}
          >
            Submit
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
