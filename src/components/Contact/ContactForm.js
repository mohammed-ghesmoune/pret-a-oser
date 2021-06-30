import React, { useState } from 'react'

const initialValue = {
	username: '',
	email: '',
	phone: '',
	text: ''
}

const ContactForm = () => {

	const [message, setMessage] = useState(null);
	const [user, setUser] = useState(initialValue)

	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()

		setMessage({
			type: 'danger',
			msg: 'Votre message a été envoyé'
		})
	}

	const { username, email, phone, text } = user
	const submitBtnDisabled = username === "" || email === "" || phone === '' || text === "";

	return (
		<div className="contact-form container-sm">
			{
				message && <div className={`message message-${message.type}`} role="alert">{message.msg}</div>
			}
			<form className="form" onSubmit={handleSubmit}>

				<input type="text" value={username} onChange={handleChange} id="username" className="form-control" placeholder="* Votre nom" required/>
				<input type="email" value={email} onChange={handleChange} id="email" className="form-control" placeholder="* Votre email" required />
				<input type="tel" value={phone} onChange={handleChange} id="phone" className="form-control" placeholder="* Votre téléphone" required/>
				<textarea  value={text} onChange={handleChange} id="text" rows="5" className="form-control" placeholder="* Votre message" required/>

				<button type="submit" disabled={submitBtnDisabled}>Envoyer</button>

			</form>
		</div>


	)
}

export default ContactForm
