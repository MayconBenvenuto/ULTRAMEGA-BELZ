import React from "react";

function Card({ children, className = "", ...props }) {
  return (
    <div className={`comparison-card ${className}`} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
