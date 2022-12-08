import React from 'react';

function Banner({ bannerText, isSuccess }: { bannerText: string, isSuccess: boolean }) {
  return (
    <div className={`flex flex-row gap-2 border border-${isSuccess ? 'green' : 'red'}-300 rounded bg-${isSuccess ? 'green' : 'red'}-200 p-3`}>
      <span className={`material-icons-outlined text-md text-${isSuccess ? 'green' : 'red'}-800`}>{isSuccess ? 'check' : 'info'}</span>

      <p className={`text-xl text-${isSuccess ? 'green' : 'red'}-800`}>{bannerText}</p>
    </div>
  );
}
export default Banner;
