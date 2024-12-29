import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingTile = () => {
  return (
    <>
      <div className="project-tile">
        <div className="project-tile__header project-tile__header--loading">
          <div className="project-tile__header__inner">
            <div style={{ width: "50%" }} className="project-tile__header__inner__left-col">
              <Skeleton width={32} height={32} containerClassName="avatar-skeleton" />
              <h4 style={{ width: "100%" }} className="project-tile__header__inner__left-col__heading">
                <span>
                  <Skeleton width={30} />
                </span>
                <Skeleton width={"100%"} />
              </h4>
            </div>
            <div className="project-tile__header__inner__right-col">
              <div className="project-tile__header__inner__right-col__commit-wrapper">
                <Skeleton width={100} />
              </div>
            </div>
          </div>
          <p>
            <Skeleton width="100%" />
          </p>
        </div>
        <div className="chart-container">
          <Skeleton baseColor="#fff" highlightColor="var(--transparent-orange)" width="100%" height="100%" />
        </div>
      </div>
    </>
  );
};

export default LoadingTile;
