import React, { useState, useContext, useRef } from 'react'
import TinyMCE from '../../../TinyMCE'
import { DBContext } from '../../../../database'



const initialValue = {
	type: 'prestation',
	title: '',
	category: '',
	price: '',
	duration: '',
	exerpt: '',
	content: '',
	image: ''
}

const imgStyle = {
	display: 'block',
	maxWidth: '300px',
	minHeight: '100px',
	boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
}

const New = () => {

	const imgRef = useRef()
	const { PRESTATION } = useContext(DBContext)
	const [message, setMessage] = useState(null);
	const [prestation, setPrestation] = useState(initialValue)
	const { title, category, price, duration, exerpt, content, image } = prestation;

	const handleChange = e => {
		setPrestation({ ...prestation, [e.target.id]: e.target.value })
	}

	const handleImg = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setPrestation({ ...prestation, image: reader.result })

			}
			reader.readAsDataURL(file)
		} else {
			setPrestation({ ...prestation, image: '' });
		}
	}

	const handleSubmit = e => {

		e.preventDefault();

		PRESTATION.add(prestation).then(() => {
			setPrestation(initialValue);

			setMessage({
				type: 'success',
				msg: 'Your Modifications was registred'
			})

		}).catch(error => {
			setMessage({
				type: 'danger',
				msg: `ERROR: ${error.message || error}`
			})
		})
	}

	const handleRemoveImg = e => {
		e.preventDefault();
		setPrestation({ ...prestation, image: '' });

	}

	const setContent = (content) => {
		setPrestation({ ...prestation, content })
	}
	const submitBtnDisabled = title === "" || image === "" || content === '' || exerpt === '' || price === '' || duration === '' || category === '';

	return (
		<div className="mt-5 container">
			<h1 className="h2 mb-3">Add New Prestation</h1>

			{
				message && <div className={`alert alert-${message.type}`}>{message.msg}</div>
			}
			<form className="form container" onSubmit={handleSubmit}>
				<div className="row bg-light border py-2 my-2">
					<label htmlFor="title" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Title</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="text" value={title} onChange={handleChange} id="title" className="form-control" placeholder="" />
					</div>
				</div>
				<div className="row bg-light border py-2 my-2">
					<label htmlFor="category" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Category</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<select type="text" value={category} onChange={handleChange} id="category" className="form-control">
							<option value=""> -- Select a category --</option>
							<option value="service">Service</option>
							<option value="forfait">Forfait</option>
							<option value="soiree-filles">Soirée Filles</option>
							<option value="bon-cadeau">Bon Cadeau</option>
						</select>
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="price" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Price</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="text" value={price} onChange={handleChange} id="price" className="form-control" placeholder="Exp: 99.99" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="price" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Duration</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input type="text" value={duration} onChange={handleChange} id="duration" className="form-control" placeholder="Exp: 1h30" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="price" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Exerpt</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<textarea value={exerpt} onChange={handleChange} id="exerpt" className="form-control" rows="3" />
					</div>
				</div>

				<div className="row bg-light border py-2 my-2">
					<label htmlFor="price" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Content</div>
					</label>
					<div className="col-md-10  ">
						<TinyMCE setContent={setContent} content={content} />
					</div>
				</div>
				<div className="row bg-light border py-2 my-2">
					<label htmlFor="price" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Image</div>
					</label>
					<div className="col-md-10  d-flex align-items-center">
						<input onChange={handleImg} ref={imgRef} id="image" className="form-control" type='file' accept="image/*" hidden />
						{
							!image ?
								<label htmlFor="image" className="btn btn-info">Upload</label>
								:
								<div className=" position-relative mx-auto my-3" >
									<img src={image} alt={prestation.title} style={imgStyle} onClick={() => imgRef.current.click()} />
									<button onClick={handleRemoveImg} className="btn btn-danger btn-sm position-absolute" title="Remove" style={{ top: '0', right: '0' }}> &times;</button>
								</div>
						}
					</div>
				</div>



				<button type="submit" className="btn btn-primary" disabled={submitBtnDisabled}>Register Prestation</button>

			</form>

		</div>
	)
}

export default New

