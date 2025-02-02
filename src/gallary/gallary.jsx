import React, { useEffect, useState } from "react";
import "./gallary.css";

export default function Gallary() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
    setImages(savedImages);
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
    </main>
  );
}
