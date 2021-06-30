import React, { useState, useContext } from 'react'
import { DBContext } from '../../../../database'
import { passwordHash } from '../../../../functions'



const initialValue = {
	username: '',
	role: 'user',
	email: '',
	password: '',
	confirmPassword: ''
}


const New = () => {
	const { USER } = useContext(DBContext)
	const [message, setMessage] = useState(null);
	const [user, setUser] = useState(initialValue)
	const { username, email, password, confirmPassword, role } = user;



	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value })
	}

	const handleSubmit = e => {

		e.preventDefault();
		const data = { ...user, password: passwordHash(user.password) }
		delete data.confirmPassword;
		USER.signup(data).then(result => {
			if (result.type === "success") {
				setUser(initialValue);
			}
			setMessage(result)

		}).catch(error => {
			setMessage({
				type: 'danger',
				msg: `ERROR: ${error.message || error}`
			})
		})

	}


	const submitBtnDisabled = username === "" || email === "" || password === '' || password.length < 6 || password !== confirmPassword;

	return (
		<div className="my-5 container">
			<h1 className="h2 mb-3">Add New User</h1>

			{
				message && <div className={`message message-${message.type}`} role="alert">{message.msg}</div>
			}
			<form className="form container" onSubmit={handleSubmit}>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="username" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Username</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="text" value={username} onChange={handleChange} id="username" className="form-control" placeholder="" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="username" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Role</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="text" value={role} onChange={handleChange} id="role" className="form-control" placeholder="" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="email" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Email</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="email" value={email} onChange={handleChange} id="email" className="form-control" placeholder="" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="password" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Password</div>
						<small>* 6 caractères minimum</small>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="password" value={password} onChange={handleChange} id="password" className="form-control" placeholder="" required autoComplete="off" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="confirmPassword" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Confirm Password</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="password" value={confirmPassword} onChange={handleChange} id="confirmPassword" className="form-control" placeholder="" required autoComplete="off" />
					</div>
				</div>

				<button type="submit" className="btn btn-primary mt-3" disabled={submitBtnDisabled}>Register User</button>

			</form>

		</div>
	)
}

export default New

