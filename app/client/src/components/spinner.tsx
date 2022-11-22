import React from 'react';

function Spinner({ text }: { text?:string }) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className="spinner-border animate-spin-slow inline-block border-dotted w-12 h-12 border-4 rounded-full border-pink-500"
        role="status"
      />
      <span className="text-xl mt-4">{text}</span>
    </div>
  );
}
Spinner.defaultProps = {
  text: 'Retrieving data...',
};

export default Spinner;
