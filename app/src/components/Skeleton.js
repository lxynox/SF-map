import React from 'react';

const Skeleton = () => {
  return (
    <React.Fragment>
       <header className='header'>
        <div className='header__skeleton' />
       </header>
       <main className='main' />
    </React.Fragment>
  )
};

export default  Skeleton;