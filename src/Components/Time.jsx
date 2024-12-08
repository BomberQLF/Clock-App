import React, { useEffect, useState } from "react";

const Time = ({ setBackgroundClass }) => {
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchUserTime = async () => {
      try {
        // Étape 1 : Obtenir l'IP et la localisation
        const locationResponse = await fetch("https://ipapi.co/json/");
        if (!locationResponse.ok) {
          throw new Error(`Erreur lors de la récupération de l'IP: ${locationResponse.status}`);
        }
        const locationData = await locationResponse.json();
        setLocation(locationData);

        // Étape 2 : Récupérer l'heure locale en fonction du fuseau horaire
        const timezone = locationData.timezone;
        const timeResponse = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
        if (!timeResponse.ok) {
          throw new Error(`Erreur lors de la récupération de l'heure: ${timeResponse.status}`);
        }
        const timeData = await timeResponse.json();
        setTime(timeData.datetime);

        // Étape 3 : Définir le fond en fonction de l'heure locale
        const hour = new Date(timeData.datetime).getHours();
        if (hour >= 6 && hour < 18) {
          setBackgroundClass('daytime'); // Classe pour le jour
        } else {
          setBackgroundClass('nighttime'); // Classe pour la nuit
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUserTime(); // Appel de la fonction asynchrone
  }, [setBackgroundClass]);

  const formattedTime = time ? new Date(time).toLocaleTimeString("fr-FR", {
    hour: "2-digit",  // Afficher l'heure en format 2 chiffres
    minute: "2-digit",  // Afficher les minutes en format 2 chiffres
    second: undefined // Ne pas afficher les secondes
  }) : null;

  return (
    <div>
      {time ? (
        <>
          <h1>Time loading : {formattedTime}</h1>
          <p>You are at : {location?.city}, {location?.country_name}</p>
        </>
      ) : (
        <p>Time loading...</p>
      )}
    </div>
  );
};

export default Time;