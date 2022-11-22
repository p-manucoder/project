import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FoundSimilarItemModal from "../Components/FoundSimilarItemModal";
import ImageGalleryComponent from "../Components/ImageGallery";
import ImageGallery from "../Components/ImageGallery";
import { getRequest } from "../serviceCalls";
import jwtDecode from "jwt-decode";

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});
  const [postedBy, setPostedBy] = useState();
  const proceedToChat = () => {
    const data = {
      state: { postedBy },
    };
    // console.log(postedBy);
    // console.log(data["state"]["postedBy"]);
    navigate("/chat", data);
  };
  const [userId, setUserId] = useState();
  useEffect(() => {
    let token = localStorage.getItem("khojUserToken");
    if (!token) navigate("/login");
    const getPost = async () => {
      const { data } = await getRequest(`/post/${id}`);
      // console.log(data);
      setPostData(await data);
      setPostedBy(await data.postedBy);
    };
    const updateViews = async () => {
      await getRequest(`/post/update-view/${id}`);
    };
    updateViews();
    getPost();
    let user = jwtDecode(token);
    setUserId(user.id);
  }, []);
  const [foundSimilarItem, setFoundSimilarItem] = useState(false);
  return (
    <div className="itemPage">
      <div id="itemPage-section1" className="row text-center">
        <div className=" col img-gallery  h-75 w-50 mt-4">
          <ImageGalleryComponent imgs={postData.photos} />
        </div>
        <div className="col  mt-4  itemMainDetails">
          <div className="row bg-light ">
            <div className="col">Name</div>
            <div className="col">{postData.name}</div>
          </div>{" "}
          <div className="row">
            <div className="col">Lost on</div>
            <div className="col">
              {postData.lostOn && postData.lostOn.substr(0, 10)}
            </div>
          </div>{" "}
          <div className="row  bg-light">
            <div className="col">Last Known Location</div>
            <div className="col">{postData?.location?.address || ""}</div>
          </div>{" "}
          <div className="row">
            <div className="col">Type</div>
            <div className="col">{postData?.type}</div>
          </div>{" "}
          {/* <div className="row  bg-light">
            <div className="col">Specifications</div>
            <div className="col">{postData.specifications || ""}</div>
          </div> */}
          <div className="reportAndFindRow text-center ms-1">
            {/* <FoundSimilarItemModal /> */}
            <div
              className={`circular-div ${
                userId != postedBy ? "" : "disabledDiv"
              }`}
              role="button"
              onClick={(e) => proceedToChat()}
            >
              Found Something Similar?
            </div>
            <div className="">
              <div
                className={`circular-div bg-danger ms-5 ${
                  userId != postedBy ? "" : "disabledDiv"
                }`}
                role="button"
              >
                Report{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="row m-2 mt-3 bg-light lostItemDescContainer">
        <div className="lostItemDesc col col-lg-8 text-start  p-3  ">
          <b style={{ fontSize: "24px" }}>Description:-</b>
          <div>{postData.description}</div>
        </div>
        <div className="userProfile col col-lg-4">
          <div className="row">
            <b style={{ fontSize: "24px" }} className=" mt-2">
              User Profile:-
            </b>
            <div className="col col-lg-4">
              <img
                src="/images/branches.png"
                className=" userProfileImg w-75 img img-fluid"
              />
            </div>
            <div className="col col-lg-8  text-start">
              <div className="py-4">
                <div className="row my-2 ">
                  <div className="col">Name</div>
                  <div className="col">
                    {postData.userName ? postData.userName : "Ma** Par***"}
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">Mobile</div>
                  <div className="col">
                    {postData.userMobileNumber
                      ? postData.userMobileNumber.substr(0, 5) + "****"
                      : "+9196*****"}
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">Location</div>
                  <div className="col">
                    {postData.userLocation
                      ? postData.userLocation.substr(0, 10) + "...."
                      : "Jag******"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
