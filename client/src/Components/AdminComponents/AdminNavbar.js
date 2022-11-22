import React from "react";
import { Link } from "react-router-dom";
const AdminNavbar = () => {
  return (
    <div>
      {" "}
      <div className="admin-page-navbar mx-auto">
        <ul>
          <Link to="/admin">
            {" "}
            <li>
              <img src="/icons/house.svg" className="img img-fluid img-icons" />
              Home
            </li>
          </Link>
          <Link to="posts">
            {" "}
            <li>
              <img
                src="/icons/sticky.svg"
                className="img img-fluid img-icons"
              />
              Posts
            </li>
          </Link>
          <Link to="users">
            {" "}
            <li>
              {" "}
              <img
                src="/icons/people.svg"
                className="img img-fluid img-icons"
              />
              Users
            </li>
          </Link>
          <Link to="chats">
            {" "}
            <li>
              {" "}
              <img
                src="/icons/chat-dots.svg"
                className="img img-fluid img-icons"
              />
              Chats
            </li>
          </Link>
          <Link to="reported-posts">
            {" "}
            <li>
              {" "}
              <img src="/icons/flag.svg" className="img img-fluid img-icons" />
              Reported Posts
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
