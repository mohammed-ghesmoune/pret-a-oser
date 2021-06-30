import React, { useState, useContext, useEffect } from 'react';
import { DBContext } from '../../database';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import brush from '../../backgrounds/brush-4.svg'



const initialValue = {
	email: "",
	password: "",
}

const Login = props => {

	const { auth, setAuth } = useContext(AuthContext)
	const [user, setUser] = useState(initialValue)
	const [message, setMessage] = useState('');
	const { USER } = useContext(DBContext)

	useEffect(() => {

		if (auth) {
			setMessage({
				type: 'success',
				msg: `Vous êtes connecté , vous allez être rediriger vers la page d'accueil`
			})
			props.history.push('/');
		}
		
	}, [auth,props.history])

	const handleSubmit = e => {

		e.preventDefault();

		USER.login(user)
			.then(result => {
				if (result.type === 'success') {
					setAuth(JSON.parse(sessionStorage.getItem('isUserAuth')))
				} 
					setMessage(result);
				
			}).catch(error => {
				setMessage({
					type: 'danger',
					msg: `ERROR: ${error.message || error}`
				})
			})
	}
	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value })
	}

	const { email, password } = user;

	const disabled = email === '' || password.length < 4

	return (
		<div className="container-md contact-form pb-5 pt-3"  style={{backgroundColor:'var(--light-pink-color)', minHeight:'65vh'}}>
			<div className="row">
				<div className="col-md-5 col-sm-8 mx-auto px-5">
					<h1 className="h2 text-center text-uppercase py-5 page-title" style={{backgroundImage:`url(${brush})`}}> Connexion </h1>
					{
						message && <div className={`message message-${message.type}`} role="alert">{message.msg}</div>
					}
					<form onSubmit={handleSubmit}>

						<div className="form-group">
							<input className="form-control" id="email" placeholder="* Email" type="email" value={email} onChange={handleChange} required />
						</div>
						<div className="form-group">
							<input className="form-control" id="password" placeholder="* Mot de passe" type="password" value={password} onChange={handleChange} required autoComplete="off" />
						</div>

						<input className="btn btn-success" type="submit" value="Valider" disabled={disabled} />
					</form>
					<div className="my-3">
						<p><Link to="/signup"> <small>Nouveau sur le site ? Inscrivez vous !</small></Link></p>
						<p><Link to="/forgetpassword"><small> Mot de passe oublié ? récupérez le ici !</small></Link></p>
					</div>
				</div>
			</div>
		</div>
	)

}

export default Login;

