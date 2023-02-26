import React from 'react';
import InputForm from './input';

function Field({ label, children }) {
  return (
    <label className="block  mb-4">
      <span className="block text-sm text-gray-600">{label}</span>
      {children}
    </label>
  );
}

export default Field;
