import React from "react";

function Card({ children, className = "", ...props }) {
  return (
    <div className={`comparison-card ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
