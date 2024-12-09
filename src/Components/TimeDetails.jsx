import React, { useState } from "react";
import Up from "../assets/desktop/icon-arrow-up.svg";
import Down from "../assets/desktop/icon-arrow-down.svg";

const TimeDetails = ({ formattedTime, timezone }) => {
  const [details, showDetails] = useState(false);

  if (!formattedTime) {
    return null;
  }

  // Utiliser la date actuelle avec l'heure passée
  const now = new Date(); // Date actuelle
  const timeParts = formattedTime.split(":");
  
  if (timeParts.length < 2) {
    console.error("formattedTime doit être au format HH:mm");
    return <p>Erreur de format de l'heure</p>;
  }

  // Construire une date complète avec la date actuelle et l'heure passée
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(timeParts[0], 10), // Heure
    parseInt(timeParts[1], 10)  // Minutes
  );

  // Vérifier si la date est valide
  if (isNaN(date.getTime())) {
    console.error("Date invalide :", formattedTime);
    return <p>Erreur de format de l'heure</p>;
  }

  // Calcul du jour de l'année
  const startOfYear = new Date(date.getFullYear(), 0, 1); // Début de l'année
  const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  // Jour de la semaine (1 = Lundi, 7 = Dimanche)
  const dayOfWeek = ((date.getDay() + 6) % 7) + 1;

  // Numéro de la semaine
  const weekNumber = Math.ceil((dayOfYear + startOfYear.getDay() - 1) / 7);

  return (
    <>
      <button className="buttonMenu" onClick={() => showDetails(!details)}>
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
