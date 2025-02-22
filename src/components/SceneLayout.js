'use client'
import React from 'react';

const SceneLayout = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        display: "flex",
        gap: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default SceneLayout;
