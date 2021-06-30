import React, { useState, useContext, useEffect } from 'react'
import { DBContext } from '../../../../database'
import { slug } from '../../../../functions';
import {passwordHash,passwordVerify} from '../../../../functions'


const initialValue = {
	username: '',
	role: 'user',
	email: '',
	password: '',
}


const Edit = props => {

	const { USER } = useContext(DBContext)
	const [message, setMessage] = useState(null);
	const [user, setUser] = useState(initialValue)
	const { username, email, role } = user;

	const userID = props.location.state ? props.location.state.id : null

	useEffect(() => {
		if (userID) {
			USER.findOneById(userID).then(result => {
				if (result) {
					setUser(result)
				} else {
					props.history.push('/admin/user/all')
				}
			}).catch(e => console.log(e.message || e))
		} else {
			props.history.push('/admin/user/all')
		}
	}, [USER, userID, props.history])

	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value })
	}

	const handleSubmit = e => {

		e.preventDefault();

		USER.updateUser(user).then(result => {
			setMessage(result)
			props.history.push(`/admin/user/edit/${slug(user.username)}`, { id: user.id })

		}).catch(error => {
			setMessage({
				type: 'danger',
				msg: `ERROR: ${error.message || error}`
			})
		})
	}

	const updateUser = data =>{
		USER.updateUser(data)
			.then(result => {
				if (result.type === 'success') {
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

		if (newPassword !== confirmNewPassword){
			setMessage({
				type:'danger',
				msg:'Le nouveau mot de passe et le confirme nouveau mot de passe doivent être identiques'
			})
			return
		}

		updateUser({ ...user, password: passwordHash(newPassword)})

	}

	const submitBtnDisabled = username === "" || email === "" || role === '';

	return (
		<div className="my-5 container">
			<h1 className="h2 mb-3">Edit User</h1>

			{
				message && <div className={`message message-${message.type}`}>{message.msg}</div>
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
				<button type="submit" className="btn btn-primary mt-3" disabled={submitBtnDisabled}>Register User</button>

			</form>

			<h3 className="mt-4">Change password</h3>

			<form className="form container" onSubmit={handlePassword}>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="password" className="col-md-2 py-2 ">
						<div className="font-weight-bold">old password</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="password"  id="oldPassword"  name="oldPassword" className="form-control" placeholder="" required autoComplete="off" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="password" className="col-md-2 py-2 ">
						<div className="font-weight-bold">New password</div>
						<small>* 6 caractères minimum</small>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="password"  id="newPassword" name="newPassword" className="form-control" placeholder="" required autoComplete="off" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="confirmPassword" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Confirm new password</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="password"  id="confirmNewPassword" name="confirmNewPassword" className="form-control" placeholder="" required autoComplete="off" />
					</div>
				</div>

				<button type="submit" className="btn btn-info mt-3" >Register password</button>
			</form>
		</div>
	)
}

export default Edit

