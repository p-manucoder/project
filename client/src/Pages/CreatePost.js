import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import citiesData from "../googleMapData/cities.json";
import statesData from "../googleMapData/states.json";
import axios from "axios";
import { postRequest } from "./../serviceCalls";
import GoogleMapContainer from "../Components/GoogleMap";
import { usePersistentState } from "react-persistent-state";
import CreditCard from "../Components/CreditCard";
import PillTab from "./../Components/PillTab";
import toast, { Toaster } from "react-hot-toast";
const CreatePost = () => {
  const toastSuccess = () => toast.success("Post Created Successfulyy!");
  const toastFailure = () => toast.error("Some Error While Crerating Post");
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("khojUserToken");
    if (!token) navigate("/login");
  }, []);
  const [formData, setFormData, unPersistState] = usePersistentState({
    isPremium: "false",
    action: "lost",
  });
  const onChangeInput = (e) => {
    // e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };
  const uploadFiles = async (files) => {
    let imgURLs = [];
    const uploadFormData = async (formdata) => {
      const resp = await axios
        .post("https://api.cloudinary.com/v1_1/khoj/image/upload", formdata)
        .then((res) => imgURLs.push(res.data.secure_url))
        .catch((err) => {
          // if (err) console.log(err);
        });
      // console.log(resp.data);
    };
    for (let i in files) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "d6idurkd");
      // setTimeout(() => {
      // }, 2000);
      await uploadFormData(formData);
    }
    setFormData({
      ...formData,
      photos: imgURLs,
    });
    // const formData = new FormData();
    // formData.append("file", files[0]);
    // formData.append("upload_preset", "d6idurkd");
    // axios
    //   .post("https://api.cloudinary.com/v1_1/khoj/image/upload", formData)
    //   .then((res) => console.log(res))
    //   .catch((err) => {
    //     if (err) console.log(err);
    //   });
  };
  // need to create post req img urls are set post will be published
  const createPost = async () => {
    // console.log("calling api from frontend");
    // toastSuccess();
    const data = await postRequest("/post/create", formData);
    // console.log(data);
    if (data) {
      // console.log(data);
      if (data.status == "fail") toast.error(data.message);
      if (data.status == "success") {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }

    // if (data) console.log("data response ", data);
  };
  const [showPremium, setShowPremium] = useState(true);
  const typesData = [
    {
      label: "Pets",
      value: "Pets",
    },
    {
      label: "Mobiles",
      value: "Mobiles",
    },
    {
      label: "Vehicles",
      value: "Vehicles",
    },
    {
      label: "Object",
      value: "Object",
    },
    {
      label: "Human",
      value: "Human",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];
  const [selected, setIsSelected] = useState("lost");
  const sethowpremium = () => {
    setTimeout(() => {
      setShowPremium(false);
    }, 2000);
  };
  const [toggle, setToggle] = useState(false);
  return (
    <div className=" p-2 w-100">
      {/* <Toaster /> */}
      <div className="createpost-row1 w-100">
        <div className=" text-center my-auto ">
          <img src="/images/relaxed.png" className="img img-fluid d-block " />
          <div className="bg-light py-3">
            {showPremium ? (
              <div>
                <div>Place and AD on the First Page Only @ 500/- Rs</div>
                <div className="row mt-3 w-75 mx-auto">
                  <div className="col ">Pay 500/-</div>
                  <div className="col">
                    <button
                      class="btn btn-primary"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      onClick={(e) => setToggle(!toggle)}
                    >
                      Pay Now
                    </button>
                  </div>
                  {toggle && (
                    <CreditCard
                      onChangeInput={onChangeInput}
                      setShowPremium={sethowpremium}
                    />
                  )}
                </div>
                <div className="mt-3">
                  <b>Or</b>
                  <button
                    className="btn btn-info text-white mx-3"
                    onClick={(e) => setShowPremium(false)}
                  >
                    Post For Free!
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            <p style={{ fontSize: "12px" }} className="w-75 mx-auto mt-3">
              *We are a non-profit Organization, the Revenue Generated Purely
              Goes into Maintenance and Development of Website Services and
              Remaining Amount is Donated To Charity.
            </p>
          </div>
        </div>
        <div className="col w-75 mx-auto">
          <div className="">
            <div className="row my-3 bg-light  p-2">
              <div className="col">Belonging Name:</div>
              <div className="col">
                <input
                  onChange={(e) => onChangeInput(e)}
                  className="khoj-input w-75"
                  name="name"
                />
              </div>
            </div>{" "}
            <div className="row my-3 bg-light p-2">
              <div className="col">Type</div>
              <div className="col  ">
                <Select
                  options={typesData}
                  onChange={(e) =>
                    onChangeInput({ target: { name: "type", value: e.value } })
                  }
                  name="type"
                  wid
                />
              </div>
            </div>{" "}
            <div className="row my-3 bg-light p-2">
              <div className="col">Last Seen/Lost Date</div>
              <div className="col">
                <input
                  onChange={(e) => onChangeInput(e)}
                  className="khoj-input w-75"
                  name="lostOn"
                  type="date"
                />
              </div>
            </div>{" "}
            <div className="row my-3 bg-light p-2 ">
              <div className="col">Upload Photos</div>
              <div className="col ">
                <input
                  className="khoj-input w-75"
                  type="file"
                  multiple
                  onChange={(e) => uploadFiles(e.target.files)}
                />
              </div>
            </div>{" "}
            <div className="row my-3 bg-light p-2   ">
              <div className="col  d-flex align-items-center">Item was:</div>
              <div className="col  d-flex align-items-center mb-3">
                <div
                  className="d-inline "
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSelected("lost");

                    onChangeInput({
                      target: {
                        name: "action",
                        value: "lost",
                      },
                    });
                  }}
                >
                  <PillTab text="lost" isSelected={selected == "lost"} />
                </div>
                <div
                  className="d-inline"
                  onClick={(e) => {
                    e.preventDefault();

                    setIsSelected("found");

                    onChangeInput({
                      target: {
                        name: "action",
                        value: "found",
                      },
                    });
                  }}
                >
                  <PillTab text="found" isSelected={selected == "found"} />
                </div>
              </div>
            </div>{" "}
            <div className="row my-3 p-2  bg-light">
              <div className="col"> Description:-</div>
              <div className="col ">
                <textarea
                  rows={10}
                  name="description"
                  className=" border-dark rounded w-100"
                  onChange={(e) => onChangeInput(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 ">
          <GoogleMapContainer setFormData={setFormData} formData={formData} />
        </div>
      </div>
      <button
        className="btn btn-primary ms-4 mt-4"
        onClick={() => createPost()}
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;
