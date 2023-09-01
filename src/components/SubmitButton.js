import React from 'react';

function SubmitButton({ onSubmit, label, isSuccess }) {
  return (
    <button onClick={onSubmit} disabled={isSuccess}>
      {label}
    </button>
  );
}

export default SubmitButton;
