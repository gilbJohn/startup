import React, { useEffect, useState } from "react";
import "./gallary.css";

export default function Gallary() {
  const [images, setImages] = useState([]);
  const [quote, setQuote] = useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = useState('Unknown');

  useEffect(() => {
    // Load images from localStorage
    const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
    setImages(savedImages);

    // Fetch a random quote from the third-party API
    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch((error) => {
        console.error("Failed to fetch quote:", error);
        setQuote("Failed to load quote.");
      });
  }, []);

  return (
    <main>
      <section className="gallery">
        {images.length > 0 ? (
          images.map((src, index) => (
            <div key={index} className="gallery-item">
              <img src={src} alt={`Drawing ${index + 1}`} />
            </div>
          ))
        ) : (
          <p>No drawings saved yet.</p>
        )}
      </section>
        
        <div className="quote">  
          <p>Random Quote: "{quote}" -- {quoteAuthor}</p>
        </div>
    </main>
  );
}
