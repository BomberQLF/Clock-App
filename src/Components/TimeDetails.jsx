import React, { useState } from "react";
import Up from "../assets/desktop/icon-arrow-up.svg";
import Down from "../assets/desktop/icon-arrow-down.svg";

const TimeDetails = ({ formattedTime, timezone, onToggleDetails }) => {
  const [details, setDetails] = useState(false);

  const toggleDetails = () => {
    setDetails(!details);
    onToggleDetails(!details);
  };

  if (!formattedTime) {
    return null;
  }

  const now = new Date();
  const timeParts = formattedTime.split(":");

  if (timeParts.length < 2) {
    console.error("formattedTime doit être au format HH:mm");
    return <p>Erreur de format de l'heure</p>;
  }

  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(timeParts[0], 10),
    parseInt(timeParts[1], 10)
  );

  if (isNaN(date.getTime())) {
    console.error("Date invalide :", formattedTime);
    return <p>Erreur de format de l'heure</p>;
  }

  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  const dayOfWeek = ((date.getDay() + 6) % 7) + 1;
  const weekNumber = Math.ceil((dayOfYear + startOfYear.getDay() - 1) / 7);

  return (
    <>
      <button
        className={`buttonMenu ${details ? "expanded" : "collapsed"}`}
        onClick={toggleDetails}
        style={{
          transform: details ? "translateY(-350px)" : "translateY(-50px)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {details ? (
          <>
            Less <img src={Up} style={{ fill: 'black' }} alt="Arrow Up" />
          </>
        ) : (
          <>
            More <img src={Down} alt="Arrow Down" />
          </>
        )}
      </button>

      <div className={`details-container ${details ? "expanded" : "collapsed"}`}>
        {details && (
          <div className="details-content">
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
      </div>
    </>
  );
};

export default TimeDetails;