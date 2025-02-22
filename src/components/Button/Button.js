'use client'
import React from 'react';
import styles from './Button.module.css'

export const SceneButton = ({ children, onClick, style }) => {
  const defaultStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <button onClick={onClick} className={styles.Button}>
      {children}
    </button>
  );
};
