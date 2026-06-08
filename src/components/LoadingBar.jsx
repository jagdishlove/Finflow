import React from "react";
import { useLoading } from "../context/LoadingContext";
import "./LoadingBar.css";

const LoadingBar = () => {
  const { isLoading } = useLoading();

  return isLoading ? <div className="loading-bar"></div> : null;
};

export default LoadingBar;
