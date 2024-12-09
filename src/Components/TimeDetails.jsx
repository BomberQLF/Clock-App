import React, { useState } from "react";
import Up from "../assets/desktop/icon-arrow-up.svg";
import Down from "../assets/desktop/icon-arrow-down.svg";

const TimeDetails = ({ formattedTime, timezone, location }) => {
  const [details, showDetails] = useState(false);

  if (!formattedTime) {
    return null;
  }

  const date = new Date(formattedTime);
  const dayOfWeek = date.getDay();
  const dayOfYear = Math.ceil(
    (date - new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)
  );
  const weekNumber = Math.ceil(
    ((date - new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24) +
      new Date(date.getFullYear(), 0, 1).getDay() +
      1) /
      7
  );

  return (
    <>
      <button className="buttonMenu" onClick={() => showDetails(!details)}>
        {/* Affiche "More" ou "Less" avec l'icône correspondante */}
        {details ? (
          <>
            Less <img src={Up} alt="Arrow Up" />
          </>
        ) : (
          <>
            More <img src={Down} alt="Arrow Down" />
          </>
        )}
      </button>

      {/* Si details est vrai, on affiche les informations */}
      {details && (
        <div className="details-container">
          <div className="left-side">
            <div className="timezone-wrapper">
              <h2>Current Timezone</h2>
              <p>{timezone}</p>
            </div>
            <div className="dayOfYear-wrapper">
              <h2>Day of the year</h2>
              <p>{dayOfYear}</p>
            </div>
          </div>
          <div className="right-side">
            <div className="dayOfWeek-wrapper">
              <h2>Day of the week</h2>
              <p>{dayOfWeek}</p>
            </div>
            <div className="weekNumber-wrapper">
              <h2>Week number</h2>
              <p>{weekNumber}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TimeDetails;