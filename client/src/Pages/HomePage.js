import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import PillTab from "../Components/PillTab";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../serviceCalls";
import citiesData from "../googleMapData/cities.json";
import statesData from "../googleMapData/states.json";

import Select from "react-select";
import CustomModal from "../Components/CustomModal";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <Card post={item} />
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console
      .log
      // `User requested page number ${event.selected}, which is offset ${newOffset}`
      ();
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="d-block ">
        <div className="d-flex flex-wrap ms-no  gap-5 mx-auto ">
          <Items currentItems={currentItems} />
        </div>
      </div>
      <div className="mt-3 w-100 ms-5 flex-wrap">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
const HomePage = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [allPosts, setPosts] = useState([]);
  useEffect(async () => {
    setModalType("loading");
    setTimeout(() => {
      setShowPage(true);
    }, 3000);
    let token = localStorage.getItem("khojUserToken");
    if (!token) navigate("/login");
    const getPosts = async () => {
      const { posts } = await getRequest("/post/get-posts");
      setPosts(posts);
    };
    getPosts();
  }, []);
  const [queryText, setQueryText] = useState("");
  const getPostsByQuery = async (query, location) => {
    let timeOut = 4000;
    if (location == "location") {
      setModalType("search-3");
      timeOut = 6000;
    } else setModalType("search-1");
    setModalopen(true);
    setTimeout(async () => {
      getData();
      setModalopen(false);
    }, timeOut);
    const getData = async () => {
      if (query)
        await getRequest(`/post/get-post?query=${query}`).then((data) => {
          setPosts(data.posts);
        });
      else {
        await getRequest(`/post/get-post?query=${queryText}`).then((data) => {
          setPosts(data?.posts);
        });
      }
    };
  };
  const [modalOpen, setModalopen] = useState(false);
  const [modaltype, setModalType] = useState("");
  return (
    <div>
      {!showPage ? (
        <CustomModal open={!showPage} type={modaltype} />
      ) : (
        <div className="homePage bg-light w-100">
          {/* <PaginatedItems itemsPerPage={1} /> */}
          <div id="homePart1">
            <div>
              <img src="/images/pic2.png" className="homePageImage" />
            </div>

            <div className="sm-block">
              <div id="" className="fs-1 mt-4 ">
                Search For Items{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-search fs-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
              <div>
                <div className="  input-group khoj-search-input2   mt-3  ">
                  <input
                    type="text"
                    class="form-control mx-auto shadow-none px-3 "
                    placeholder="Search Text Here.."
                    aria-label="Input group example"
                    onChange={(e) => setQueryText(e.target.value)}
                    aria-describedby="btnGroupAddon2"
                  />
                  <div
                    class="input-group-text khoj-search-button"
                    id="btnGroupAddon2"
                    role="button"
                    onClick={(e) => getPostsByQuery()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>{" "}
                  </div>
                </div>
              </div>
              <div className="searchInCategories mt-4">
                Search In Categories:-
              </div>
              <div className="greenBoard mt-2 d-flex flex-column justify-content-evenly text-center ">
                <div className="row ">
                  <div className="col" onClick={() => getPostsByQuery("Pets")}>
                    {" "}
                    <img src="/icons/dog-solid.svg" className="img-icons" />
                    Pets
                  </div>
                  <div
                    className="col"
                    onClick={() => getPostsByQuery("Mobiles")}
                  >
                    <img
                      src="/icons/mobile-screen-solid.svg"
                      className="img-icons"
                    />
                    Mobiles
                  </div>
                  <div
                    className="col"
                    onClick={() => getPostsByQuery("Vehicles")}
                  >
                    <img src="/icons/bicycle-solid.svg" className="img-icons" />
                    Vehicles
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col"
                    onClick={() => getPostsByQuery("Object")}
                  >
                    <img src="/icons/key-solid.svg" className="img-icons" />
                    Object
                  </div>
                  <div className="col" onClick={() => getPostsByQuery("Human")}>
                    {" "}
                    <img src="/icons/person-solid.svg" className="img-icons" />
                    Human
                  </div>
                  <div
                    className="col"
                    onClick={() => getPostsByQuery("Others")}
                  >
                    <img
                      src="/icons/wine-bottle-solid.svg"
                      className="img-icons"
                    />
                    Others
                  </div>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
          <CustomModal open={modalOpen} type={modaltype} />

          {/* <hr className="horizontalRuler" /> */}
          <div id="homePart2">
            <div className="homePageFilter">
              <div id="filterTitle">Filters:-</div>
              <div className="filterType mt-3 mb-2">By City</div>
              <div>
                <Select
                  options={citiesData}
                  onChange={(e) => getPostsByQuery(e.value, "location")}
                />
              </div>
              <div className="filterType mt-3 mb-2">By State</div>
              <div>
                <Select
                  options={statesData}
                  onChange={(e) => getPostsByQuery(e.value, "location")}
                />
              </div>
            </div>
            <div className="cardsDivHomePage d-block p-2">
              {
                allPosts.length ? (
                  <PaginatedItems itemsPerPage={5} items={allPosts} />
                ) : (
                  <div className="fw-3 ps-3 fw-bold p-3  ">No Posts Found!</div>
                )
                // allPosts.map((post) => <Card post={post} />)
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
