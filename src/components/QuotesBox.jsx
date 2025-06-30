import { useState, useEffect } from "react";
import "../styles/QuoteBox.css"; // we'll style this

const quotes = [
  "Focus on being productive instead of busy. — Tim Ferriss",
  "Your future is created by what you do today, not tomorrow. — Robert Kiyosaki",
  "Success usually comes to those who are too busy to be looking for it. — Thoreau",
  "You don’t need more time in your day. You need to decide. — Seth Godin",
  "Small daily improvements are the key to staggering long-term results. — Robin Sharma"
];

export default function QuotesBox() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 30000); // change quote every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quotes-box">
      <p className="quote-text">{quotes[index]}</p>
    </div>
  );
}
