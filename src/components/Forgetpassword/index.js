import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import brush from '../../backgrounds/brush-4.svg'


const Forgetpassword = props => {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState('');
  const { auth } = useContext(AuthContext)

  useEffect(() => {
		if (auth) {
			setMessage({
				type: 'danger',
				msg: `Vous êtes déjà connecté`
			})
			props.history.push('/');
		}
  }, [auth, props.history])
  
  const handleSubmit = e => {
    e.preventDefault();

    setMessage({
      type:'success',
      msg:'Veuillez consulter votre boite mail pour récupérer le nouveau mot de passe'
    })

  }
  const handleChange = e => {
    setEmail(e.target.value)
  }

  const disabled =  email === '' 

  return (
    <div className="container-md contact-form pb-5 pt-3 " style={{ backgroundColor: 'var(--light-pink-color)', minHeight:'60vh' }}>
			<div className="row ">
				<div className="col-md-6 col-sm-8 mx-auto px-5">
				<h1 className="h2 text-center text-uppercase py-5 page-title" style={{backgroundImage:`url(${brush})`}}> Mot de passe oublié ? </h1>
          <p className="text-center mb-3"> Renseigner votre email pour recevoir un noveau mot de passe </p>

					{
						message && <div className={`message message-${message.type}`} role="alert">{message.msg}</div>
					}
					<form onSubmit={handleSubmit}>

						<div className="form-group">
							<input className="form-control" id="email" placeholder="* Email" type="email" value={email} onChange={handleChange} required />
						</div>

						<input className="btn btn-success" type="submit" value="Envoyer" disabled={disabled} />
					</form>
				</div>
			</div>
		</div>
  )
}

export default Forgetpassword;