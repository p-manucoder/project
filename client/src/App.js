import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { checkUserAuth } from "./checkUserAuth";
import HomePage from "./Pages/HomePage";
import ItemPage from "./Pages/ItemPage";
import Navbar from "./Components/Navbar";
import CreatePost from "./Pages/CreatePost";
import LoginPage from "./Pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import SignupForm from "./Components/SignupForm";
import SignupPage from "./Pages/SignupPage";
import Chat from "./Pages/Chat";
import GoogleMapContainer from "./Components/GoogleMap";
import { useEffect } from "react";
import GoogleMaps2 from "./Components/GoogleMaps2";
import GlobalMap from "./Components/GlobalMap";
import AdminHomePage from "./Pages/AdminHomePage";
import KhojFooter from "./Components/KhojFooter";
import Users from "./Components/AdminComponents/Users";
import AdminNavbar from "./Components/AdminComponents/AdminNavbar";
import Posts from "./Components/AdminComponents/Posts";
import Chats from "./Components/AdminComponents/Chats";
import ReportedPosts from "./Components/AdminComponents/ReportedPosts";
import HomepageAdmin from "./Components/AdminComponents/HomepageAdmin";
import AdminLoginPage from "./Pages/AdminLoginPage";
import toast, { Toaster } from "react-hot-toast";
function App() {
  return (
    <Router>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<ItemPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/map" element={<GoogleMapContainer />} />
        <Route path="/global-map" element={<GlobalMap />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminHomePage />}>
          {/* <AdminNavbar /> */}
          <Route path="" element={<HomepageAdmin />} />

          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="chats" element={<Chats />} />
          <Route path="reported-posts" element={<ReportedPosts />} />
        </Route>
      </Routes>
      <KhojFooter />
    </Router>
  );
}

export default App;
