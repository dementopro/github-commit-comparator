import React from 'react';
import './CommitIcon.css';

const CommitIcon = ({ color, size }) => {
  return (
    <div className="commit-icon-container">
      <svg
        className="feather feather-git-commit commit-icon"
        fill="none"
        height={size}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="1.05" x2="7" y1="12" y2="12" />
        <line x1="17.01" x2="22.96" y1="12" y2="12" />
      </svg>
    </div>
  );
};

export default CommitIcon;
