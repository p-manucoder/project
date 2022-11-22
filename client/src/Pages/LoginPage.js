import React from "react";
import KhojFeatures from "../Components/KhojFeatures";
import LoginForm from "../Components/LoginForm";
import LoginSlider from "../Components/LoginSlider";
import ReactStepper from "../Components/ReactStepper";

const LoginPage = () => {
  return (
    <div>
      <div
        className=" d-flex flex-wrap login-page-div  "
        style={{ background: "#FDF7FF !important" }}
      >
        <div className="col">
          {/* <LoginSlider /> */}
          <ReactStepper />
        </div>
        <div className="col login-form">
          <LoginForm />
        </div>
      </div>
      <KhojFeatures />
    </div>
  );
};

export default LoginPage;
