import React from 'react';

import NavigationBar from './NavigationBar';

const TopNavLayout = ({children}) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default TopNavLayout;