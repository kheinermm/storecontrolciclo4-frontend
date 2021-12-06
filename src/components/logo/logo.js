import React from 'react';
import logo from './logo.png'; 

//console.log(logo);

function Logo() {
    
  return( 
  <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />);
}

export default Logo;