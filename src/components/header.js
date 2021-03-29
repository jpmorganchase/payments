import React from 'react';

const Header = () => {
  return (
    <header className='left-auto top-0 right-0'>
      <div className='h-12 px-6 flex relative items-center justify-end'>
        <button className='flex mx-4 hover:text-gray-200 focus:outline-none'>
          <span className='material-icons'>notifications</span>
        </button>

        <button className='relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none'>
          <img
            className='h-full w-full object-cover'
            src='https://www.w3schools.com/howto/img_avatar.png'
            alt='Avatar'
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
