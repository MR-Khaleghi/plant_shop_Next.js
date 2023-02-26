import React from 'react';

function InputForm({ type, required, value, onChange }) {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      className="border px-3 py-1 rounded w-80"
    />
  );
}

export default InputForm;
