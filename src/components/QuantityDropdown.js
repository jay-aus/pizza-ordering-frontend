import React from 'react';

function QuantityDropdown({ quantity, onQuantityChange }) {
  return (
    <select value={quantity} onChange={onQuantityChange}>
      {[1, 2, 3, 4, 5].map(qty => (
        <option key={qty} value={qty}>
          {qty}
        </option>
      ))}
    </select>
  );
}

export default QuantityDropdown;
