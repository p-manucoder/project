import React, { useState, useEffect } from "react";
import { ComboChart } from "../ComboChart";
import { GeoChart } from "../GeoChart";
import { LineChart } from "../LineChart";
import { PieChart } from "../PieChart";
import Labels from "./Labels";
import { useLocation } from "react-router-dom";
import { postRequest } from "../../serviceCalls";

const HomepageAdmin = ({ props }) => {
  const location = useLocation();
  const [pageData, setPageData] = useState({});
  useEffect(() => {
    if (location?.state?.homepageData)
      setPageData(location?.state?.homepageData);
    else {
      const getData = async () => {
        await postRequest("/admin/get-homepage-data", {
          token: localStorage.getItem("khojAdminToken"),
        }).then((resp) => {
          setPageData(resp?.homepageData);
        });
      };
      getData();
    }
  }, []);
  return (
    <div>
      <div className="  p-3">
        <Labels data={pageData} />
        <div className="d-flex khoj-admin-homepage-divs gap-4">
          <div>
            <GeoChart />
          </div>
          <div>
            <PieChart />{" "}
          </div>
        </div>{" "}
        <div className="d-flex khoj-admin-homepage-divs gap-4">
          <div>
            <LineChart />
          </div>
          <div>
            <ComboChart />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageAdmin;
