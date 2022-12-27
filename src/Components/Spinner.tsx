import React from 'react';

function Spinner() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="spinner-border animate-spin block w-14 h-14 border-4 border-t-amber-600 rounded-full"
        role="status"
      />
    </div>
  );
}

export default Spinner;
