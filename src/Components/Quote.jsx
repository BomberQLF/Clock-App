import React, { useEffect, useState } from "react";
import RefreshIcon from '../../src/assets/desktop/icon-refresh.svg';

const Quote = () => {
    const [quote, setQuote] = useState(null);

    // Fonction pour appeler l'API
    const quoteFinder = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error(`HTTP Error ! Status: ${response.status}`);
            }
            const data = await response.json();
            setQuote(data);
        } catch (error) {
            console.error('Erreur lors du fetch : ', error);
        }
    };

    // Appel initial lors du montage du composant
    useEffect(() => {
        quoteFinder();
    }, []);

    console.log(quote ? quote : "En attente de la citation...");

    return (
        <div className="quote-container" style={{ width: '30rem', padding: '4rem' }}>
            {quote ? (
                <div>
                    <p className="quote-content">"{quote.content}"</p>
                    <span style={{ fontWeight: 'bold', display: 'flex', gap:'4rem', marginTop: '1rem' }} className="quote-author">{quote.author}
                    <img 
                        onClick={quoteFinder} 
                        src={RefreshIcon} 
                        alt="Refresh quote" 
                        style={{ cursor: "pointer" }}
                    />
                    </span>
                </div>
            ) : (
                <p>Quote loading ...</p>
            )}
        </div>
    );
};

export default Quote;