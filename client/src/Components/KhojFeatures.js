import React from "react";

const KhojFeatures = () => {
  return (
    <div className=" ">
      <img src="images/wave.svg" className="w-100" />
      <div className="fs-2 mx-auto text-center my-5 features-heading">
        Features
      </div>
      <div className="d-flex flex-wrap justify-content-evenly text-center align-items-center mb-3">
        <div>
          <img
            src="/images/map-feature.png"
            className="img img-fluid w-75 mb-3"
          />
          <h5 className=" me-5 ">Global Map </h5>
        </div>
        <div>
          <img
            src="/images/chat-feature.png"
            className="img img-fluid w-75 mb-3"
          />
          <h5 className="mx-auto  ">Chats </h5>
        </div>
        <div>
          {" "}
          <img
            src="/images/report-feature.png"
            className="img img-fluid w-75"
          />
          <h5 className="mx-auto ">Report </h5>
        </div>
      </div>
    </div>
  );
};

export default KhojFeatures;
