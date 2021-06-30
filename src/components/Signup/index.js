import React, { useState, useContext, useEffect } from 'react';
import { DBContext } from '../../database';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import brush from '../../backgrounds/brush-4.svg'
import {passwordHash} from '../../functions'



const initialValue = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: 'user'
}


const Signup = props => {

	const { auth } = useContext(AuthContext)
	const [user, setUser] = useState(initialValue)
	const [message, setMessage] = useState('');
	const { USER } = useContext(DBContext)

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
		const data = {...user, password: passwordHash(user.password)}
		delete data.confirmPassword;
		USER.signup(data)
			.then(result => {
				if (result.type === 'success') {
					props.history.push('/login')
				} else {
					setMessage(result)
				}
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

	const { username, email, password, confirmPassword } = user;

	const disabled = username === '' || email === '' || password.length < 6 || password !== confirmPassword;

	return (
		<div className="container-md contact-form pb-5 pt-3" style={{backgroundColor:'var(--light-pink-color)', minHeight:'65vh'}}>
			<div className="row">
				<div className="col-md-5 col-sm-8 mx-auto px-5">
				<h1 className="h2 text-center text-uppercase py-5 page-title" style={{backgroundImage:`url(${brush})`}}> Inscription </h1>
					{
						message && <div className={`message message-${message.type}`} role="alert">{message.msg}</div>
					}
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<input className="form-control" id="username" placeholder="* Votre nom" type="text" value={username} onChange={handleChange} required />
						</div>
						<div className="form-group">
							<input className="form-control" id="email" placeholder="* Email" type="email" value={email} onChange={handleChange} required />
						</div>
						<div className="form-group">
							<input className="form-control mb-0" id="password" placeholder="* Mot de passe" type="password" value={password} onChange={handleChange} required autoComplete="off" />
						<small>* 6 caractères minimum</small>
						</div>
						<div className="form-group">
							<input className="form-control" id="confirmPassword" placeholder="* Confirmer le mot de passe" type="password" value={confirmPassword} onChange={handleChange} required autoComplete="off" />
						</div>
						<input className="btn btn-success" type="submit" value="Valider" disabled={disabled} />
					</form>
					<div className="my-3">
						<Link to="/login"><small> Déja inscrit ? Connectez vous !</small></Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signup;