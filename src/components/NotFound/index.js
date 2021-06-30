import React from 'react';
import Button from '../Button'

const NotFound = () => {

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:'60vh', backgroundColor:'var(--light-pink-color)'}}>

      <div className=" d-flex flex-column justify-content-center align-items-center p-5 m-4" style={{ backgroundColor: '#ffffff' }}>
        <h1>. 404 .</h1>
        <p className="text-center">La page que vous recherchez est introuvable.</p>
        <div className=" button-wrapper mt-5 mb-3 d-flex justify-content-center">
          <Button href="/" text="page d'accueil" />

        </div>

      </div>
    </div>

  )
}

export default NotFound;