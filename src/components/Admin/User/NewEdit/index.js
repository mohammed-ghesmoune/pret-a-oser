import React, { useState, useContext, useEffect,Fragment } from 'react'
import { DBContext } from '../../../../database'
import { slug } from '../../../../functions';
import { Link, useRouteMatch } from "react-router-dom"


const initialValue = {
	username: '',
	role: 'user',
	email: '',
	password: '',
	confirmPassword: ''
}


const Edit = props => {

	const isEditUser = useRouteMatch('/admin/user/:param').params.param === 'edit'
	const { USER } = useContext(DBContext)
	const [message, setMessage] = useState(null);
	const [user, setUser] = useState(initialValue)
	const { username, email, password, confirmPassword, role } = user;

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
		} else if (isEditUser) {
			props.history.push('/admin/user/all')
		} else {
			setUser(initialValue)
			setMessage(null)
		}
	}, [USER, userID, props.history,isEditUser])

	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value })
	}

	const handleSubmit = e => {

		e.preventDefault();
		if (isEditUser) {
			USER.updateUser(user).then(result => {
				setMessage(result)
				props.history.push(`/admin/user/edit/${slug(user.username)}`, { id: user.id })

			}).catch(error => {
				setMessage({
					type: 'danger',
					msg: `ERROR: ${error.message || error}`
				})
			})
		} else {
			USER.signup(user).then(result => {
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

	}

	const submitBtnDisabled = username === "" || email === "" || password.length < 4 || password !== confirmPassword || role === '';

	return (
		<div className="my-5 container">
			<div className="d-flex flex-wrap align-items-center">
				{
					isEditUser ? (
						<Fragment>
							<h1 className="h2 mr-3">Edit User</h1>
							<Link to="/admin/user/new" className="btn btn-outline-info"> Add New </Link>
						</Fragment>
					)
						:
						(
							<h1 className="h2 mb-3">Add New User</h1>
						)
				}
			</div>

			{
				message && <div className={`alert alert-${message.type}`}>{message.msg}</div>
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
						<select type="text" value={role} onChange={handleChange} id="role" className="form-control" >
							<option value="user"> user </option>
							<option value="admin"> admin </option>
						</select>

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

				<button type="submit" className="btn btn-info mt-3" disabled={submitBtnDisabled}>Register User</button>

			</form>

		</div>
	)
}

export default Edit

