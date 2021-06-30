import React, { useEffect, useState, useContext } from 'react'
import './style.css'
import { DBContext } from '../../database'
import { AuthContext } from '../../contexts/authContext'
import { FaEdit } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import {passwordHash,passwordVerify} from '../../functions'


const initialValue = {
	username: "",
	email: "",
	password: "",
	role: 'user'
}
const Profil = (props) => {
	const { USER } = useContext(DBContext)
	const { auth } = useContext(AuthContext)
	const [user, setUser] = useState(initialValue)
	const [message, setMessage] = useState('');
	const [userData, setUserData] = useState(initialValue)

	useEffect(() => {
		if (auth) {
			USER.findOneById(auth.id).then(result => {
				if (result) {
					setUser(result)
					setUserData(result)
				} else {
					props.history.push('/')
				}
			})
		}
		else{
			props.history.push('/')
		}
	}, [USER, auth, props.history])

	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value })
	}

	const updateUser = data =>{
		USER.updateUser(data)
			.then(result => {
				if (result.type === 'success') {
					setUserData(result.user)
					setUser(result.user)
				}
				setMessage(result)

			}).catch(error => {
				setMessage({
					type: 'danger',
					msg: `ERROR: ${error.message || error}`
				})
			})
	}
	const handleSubmit = e => {
		e.preventDefault()
	    updateUser(user)
	}

	const handlePassword = e =>{
		e.preventDefault()
		const formData = new FormData(e.target)
	    const oldPassword = formData.get('oldPassword')
	    const newPassword = formData.get('newPassword')
		const confirmNewPassword = formData.get('confirmNewPassword')
		if (oldPassword ==='' || newPassword ==='' || confirmNewPassword ===''){
			setMessage({
				type:'danger',
				msg:'Vous devriez remplir tous les champs'
			})
			return
		}
		if(!passwordVerify(oldPassword,user.password)){
			setMessage({
				type:'danger',
				msg:'Ancien mot de passe incorrect'
			})
			return
		}

		if (newPassword.length < 6 ){
			setMessage({
				type:'danger',
				msg:'Le nouveau mot de passe doit contenir minimum 6 caractères'
			})
			return
		}

		if (newPassword !== confirmNewPassword ){
			setMessage({
				type:'danger',
				msg:'Le nouveau mot de passe et le confirme nouveau mot de passe doivent être identiques'
			})
			return
		}

		updateUser({ ...user, password: passwordHash(newPassword)})

	}

	const { username, email } = user;

	const disabled = username === '' || email === '' 
	return (
		!auth ? null : <div className="profil-page" style={{ minHeight: '60vh' }} >
			<div className=" header" >
				<div className=" container py-3">
					<h1 className=" mb-0 h2 py-3 text-uppercase">Profil</h1>
				</div>
			</div>
			<div className="content  container my-3 ">
				
				<Accordion>
					<ul className="list-group list-group-flush py-4 col-md-6 mx-auto px-0">
					{
					message && <div className={`message message-${message.type} `} role="alert">{message.msg}</div>
				}
						<li className="list-group-item mb-3">
							<div className=" d-flex justify-content-between">
								<div><span className="title">username: </span>{userData.username}</div>
								<Accordion.Toggle as={Button} variant="link" eventKey="0">
									<div role='button' title="Mofifier">
										<FaEdit size="1.2rem" color="var(--deep-pink-color)" />
									</div>
								</Accordion.Toggle>
							</div>
							<Accordion.Collapse eventKey="0">
								<form className="p-3 mt-3 bg-light form" onSubmit={handleSubmit}>
									<div className="form-group">
										<input className="form-control" id="username" placeholder="* Votre nom" type="text" value={username} onChange={handleChange} required />
									</div>
									<input className="btn btn-dark" type="submit" value="Valider" disabled={disabled} />
								</form>
							</Accordion.Collapse>
						</li>
						<li className="list-group-item mb-3">
							<div className=" d-flex justify-content-between ">
								<div><span className="title">email: </span>{userData.email}</div>
								<Accordion.Toggle as={Button} variant="link" eventKey="1">
									<div role='button' title="Mofifier">
										<FaEdit size="1.2rem" color="var(--deep-pink-color)" />
									</div>
								</Accordion.Toggle>
							</div>
							<Accordion.Collapse eventKey="1">
								<form className="p-3 mt-3 bg-light form" onSubmit={handleSubmit}>
									<div className="form-group">
										<input className="form-control" id="email" placeholder="* Email" type="email" value={email} onChange={handleChange} required />
									</div>
									<input className="btn btn-dark" type="submit" value="Valider" disabled={disabled} />
								</form>
							</Accordion.Collapse>
						</li>
						<li className="list-group-item  mb-3">
							<div className=" d-flex justify-content-between ">
								<div><span className="title">mot de passe: </span>******</div>
								<Accordion.Toggle as={Button} variant="link" eventKey="2">
									<div role='button' title="Mofifier">
										<FaEdit size="1.2rem" color="var(--deep-pink-color)" />
									</div>
								</Accordion.Toggle>
							</div>
							<Accordion.Collapse eventKey="2">
								<form className="p-3 mt-3 bg-light form"  onSubmit={handlePassword}>
									<div className="form-group">
										<input className="form-control" name="oldPassword" placeholder="* Ancien mot de passe" type="password" autoComplete="off" required/>
									</div>
									<div className="form-group">
										<input className="form-control" name="newPassword" placeholder="* Nouveau mot de passe" type="password" autoComplete="off" required/>
									</div>
									<div className="form-group">
										<input className="form-control" name="confirmNewPassword" placeholder="* Confirmer nouveau mot de passe" type="password" autoComplete="off" required/>
									</div>
									<input className="btn btn-dark" type="submit" value="Valider"  />
								</form>
							</Accordion.Collapse>
						</li>
					</ul>
				</Accordion>

			</div>
		</div>
	)
}

export default Profil
