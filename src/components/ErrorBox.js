import React from 'react';
import '../css/ErrorBox.css'; // Add your own CSS for styling

function ErrorBox({ message }) {
  return <div className="error-box">{message}</div>;
}

export default ErrorBox;
