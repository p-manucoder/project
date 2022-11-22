import React, { useEffect } from "react";
import Chats from "../Components/AdminComponents/Chats";
import Labels from "../Components/AdminComponents/Labels";
import Posts from "../Components/AdminComponents/Posts";
import ReportedPosts from "../Components/AdminComponents/ReportedPosts";
import Users from "../Components/AdminComponents/Users";
import { BarChart } from "../Components/BarChart";
import { ComboChart } from "../Components/ComboChart";
import { GeoChart } from "../Components/GeoChart";
import { LineChart } from "../Components/LineChart";
import { PieChart } from "../Components/PieChart";
import {
  Link,
  Outlet,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AdminNavbar from "../Components/AdminComponents/AdminNavbar";

const AdminHomePage = () => {
  const isAdmin = localStorage.getItem("khojAdminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) navigate("/admin/login");
  }, []);
  return (
    <div className="d-flex ">
      <AdminNavbar />

      <Outlet data="hey" />
    </div>
  );
};

export default AdminHomePage;
