import { useNavigate } from "react-router-dom";
const navigate = useNavigate;
export const checkUserAuth = () => {
  let isUserLoggedIn = localStorage.getItem("khojUserToken");
  if (!isUserLoggedIn) navigate("/login");
};
