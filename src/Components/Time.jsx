import React, { useEffect, useState } from "react";
import Sun from "../assets/desktop/icon-sun.svg";
import Moon from "../assets/desktop/icon-moon.svg";
import TimeDetails from "./TimeDetails";

const Time = ({ setBackgroundClass }) => {
  const [time, setTime] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchUserTime = async () => {
      try {
        // Étape 1 : Obtenir l'IP et la localisation
        const locationResponse = await fetch("https://ipapi.co/json/");
        if (!locationResponse.ok) {
          throw new Error(
            `Erreur lors de la récupération de l'IP: ${locationResponse.status}`
          );
        }
        const locationData = await locationResponse.json();
        setLocation(locationData);

        // Étape 2 : Récupérer l'heure locale en fonction du fuseau horaire
        const timezone = locationData.timezone;
        const timeResponse = await fetch(
          `http://worldtimeapi.org/api/timezone/${timezone}`
        );
        if (!timeResponse.ok) {
          throw new Error(
            `Erreur lors de la récupération de l'heure: ${timeResponse.status}`
          );
        }
        const timeData = await timeResponse.json();
        setTime(timeData.datetime);
        setTimezone(timeData.abbreviation);

        // Étape 3 : Définir le fond en fonction de l'heure locale
        const hour = new Date(timeData.datetime).getHours();
        if (hour >= 6 && hour < 18) {
          setBackgroundClass("daytime");
        } else {
          setBackgroundClass("nighttime");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUserTime();
  }, [setBackgroundClass]);

  const formattedTime = time
    ? new Date(time).toLocaleTimeString("fr-FR", {
        hour: "2-digit", // Afficher l'heure en format 2 chiffres
        minute: "2-digit", // Afficher les minutes en format 2 chiffres
        second: undefined,
      })
    : null;

  // Extraire l'heure en nombre
  const hour = time ? new Date(time).getHours() : null;

  return (
    <div className="quote-time-wrapper">
      <div className="quote-time-container">
        {time ? (
          <>
            {hour >= 6 && hour < 18 ? (
              <p
                className="hello"
                style={{ textTransform: "uppercase", letterSpacing: "4px" }}
              >
                <img src={Sun} alt="" /> Good Morning, it's currently
              </p>
            ) : (
              <p
                className="hello"
                style={{ textTransform: "uppercase", letterSpacing: "4px" }}
              >
                <img src={Moon} alt="" /> Good evening, it's currently
              </p>
            )}
            <h1 style={{ fontSize: "10rem", textTransform: "uppercase" }}>
              {formattedTime}{" "}
              {timezone && (
                <span style={{ fontSize: "3rem", fontWeight: "200" }}>
                  {timezone}
                </span>
              )}{" "}
            </h1>
            <p style={{ fontSize: "1.3rem", textTransform: "uppercase" }}>
              In {location?.city}, {location?.country_name}
            </p>
          </>
        ) : (
          <p>Time loading...</p>
        )}
      </div>
      {/* TimeDetails à droite */}
      <div className="time-details-wrapper">
        <TimeDetails
          formattedTime={formattedTime}
          timezone={location?.country_name}
          location={location}
        />
      </div>
    </div>
  );
};

export default Time;