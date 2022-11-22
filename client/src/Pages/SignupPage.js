import React from "react";
import KhojFeatures from "../Components/KhojFeatures";
import LoginSlider from "../Components/LoginSlider";
import ReactStepper from "../Components/ReactStepper";
import SignupForm from "../Components/SignupForm";

const SignupPage = () => {
  return (
    <div>
      <div className=" d-flex flex-wrap login-page-div">
        <div className="">
          {/* <LoginSlider /> */}
          <ReactStepper />
        </div>
        <div className=" login-form mx-auto">
          <SignupForm />
        </div>
      </div>
      <KhojFeatures />
    </div>
  );
};

export default SignupPage;
