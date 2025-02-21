import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QuoteComponent() {
  const [quote, setQuote] = useState('Loading...');
  const [author, setAuthor] = useState('Unknown');

  useEffect(() => {
    fetch('https://quote.cs260.click')
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote);
        setAuthor(data.author);
      })
      .catch(error => {
        console.error("Failed to fetch quote:", error);
        setQuote("Failed to load quote.");
      });
  }, []);

  return (
    <div className="text-center p-3 border rounded bg-light">
      <p className="fs-4 fst-italic">"{quote}"</p>
      <p className="fs-6 fw-bold text-muted">— {author}</p>
    </div>
  );
}
