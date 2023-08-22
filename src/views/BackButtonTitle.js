import React from "react";
import { ArrowLeftCircle } from "react-feather";
import { useNavigate } from "react-router-dom";

const BackButtonTitle = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className={"d-flex"}>
      <div className={"d-flex align-items-center"}>
        <ArrowLeftCircle
          size={35}
          className="mr-1 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h3 className="mb-0 h1" style={{ marginLeft: "9px" }}>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default BackButtonTitle;
