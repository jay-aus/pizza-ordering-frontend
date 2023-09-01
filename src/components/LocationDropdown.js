import React from 'react';

function LocationDropdown({ locations, selectedLocation, onSelectLocation }) {
  return (
    <div className="form-field">
      <label className="form-label">Select Location:</label>
      <select value={selectedLocation} onChange={onSelectLocation}>
        <option value="">Select Location</option>
        {locations.map(location => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LocationDropdown;
