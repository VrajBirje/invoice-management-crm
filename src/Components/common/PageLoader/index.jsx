import React from "react";
import "./pageLoader.css";
import { InfinitySpin } from "react-loader-spinner";

const PageLoader = ({style1}) => {
  return (
    <>
      <div className="loader-div" style={{ width:"100%", backgroundColor:"rgba(0,0,0,0.1)"}}>
        <div className="page-loader" style={{left:"42%", width: "200px" }}>
          <InfinitySpin
            color="#304FFE"
            ariaLabel="infinity-spin-loading"
            visible={true}
          />
        </div>
      </div>
    </>
  );
};

export default PageLoader;
