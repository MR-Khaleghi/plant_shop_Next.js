import React from 'react';

function Button({ type, onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-800 text-gray-100 px-4 py-2 my-2 rounded hover:bg-green-700">
      {children}
    </button>
  );
}

export default Button;
