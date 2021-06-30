import React from 'react'
import LogoCarousel from '../LogoCarousel'
import Copyright from '../Copyright'
import { useRouteMatch } from 'react-router-dom'

const Footer = props => {
  const match = useRouteMatch('/admin');

  return (
    <footer>

      {!match &&
        <LogoCarousel />
      }
      <Copyright />

    </footer>
  );
}

export default Footer;