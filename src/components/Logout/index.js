import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { DBContext } from '../../database';


const Logout = props => {

  const { USER } = useContext(DBContext)
  const { setAuth } = useContext(AuthContext)

  useEffect(() => {
    USER.logout();
    setAuth(null);
    props.history.push('/')
  })


  return (
    <div className="container-md contact-form py-5" style={{ backgroundColor: 'var(--light-pink-color)',minHeight:'50vh' }}>
      <div className="row">
        <div className="col-md-6 col-sm-8 mx-auto px-4">
          <h1 className="h2 text-center text-uppercase mb-5"> Deconnexion ... </h1>
        </div>
      </div>
    </div>
  )
}

export default Logout;