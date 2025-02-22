'use client'
import React from 'react';

export const SceneButton = ({ children, onClick, style }) => {
  const defaultStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <button onClick={onClick} style={{ ...defaultStyle, ...style }}>
      {children}
    </button>
  );
};
