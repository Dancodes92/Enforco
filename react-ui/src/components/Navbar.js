import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthQuery } from "../store/features/api/apiSlice";
import { useDispatch } from "react-redux";
import { clearState } from "../store/features/auth";

function Navbar(props) {
  const { isSuccess, refetch} = useAuthQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    dispatch(clearState());
    refetch();
    navigate("/");
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      {isSuccess ? (
        <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
          <Link to="/home">
            <h1>Enforco</h1>
          </Link>
          <div className="flex">
            <button
              onClick={() => {
                handleLogout();
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
          <Link to="/">
            <h1>Enforco</h1>
          </Link>
          <div className="flex">
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
