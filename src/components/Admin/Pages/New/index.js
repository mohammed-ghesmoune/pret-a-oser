import React, { useState, useContext, useRef } from 'react'
import TinyMCE from '../../../TinyMCE'
import { DBContext } from '../../../../database'



const initialValue = {
	type: 'page',
	title: '',
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
  const imgRef = useRef();
	const { PAGE } = useContext(DBContext)
	const [message, setMessage] = useState(null);
	const [page, setPage] = useState(initialValue)
	const { title, content, image } = page;

	const handleChange = e => {
		setPage({ ...page, [e.target.id]: e.target.value })
	}

	const handleImg = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setPage({ ...page, image: reader.result })

			}
			reader.readAsDataURL(file)
		} else {
			setPage({ ...page, image: '' });
		}
	}

	const handleSubmit = e => {

		e.preventDefault();

		PAGE.add(page).then(() => {
			setPage(initialValue);

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
		setPage({ ...page, image: '' });

	}

	const setContent = (content) => {
		setPage({ ...page, content })
	}
	const submitBtnDisabled = title === "" || image === "" || content === '';

	return (
		<div className="my-5 container">
			<h1 className="h2 mb-3">Add New Page</h1>

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
									<img src={image} alt={title} style={imgStyle} onClick={() => imgRef.current.click()}/>
									<button onClick={handleRemoveImg} className="btn btn-danger btn-sm position-absolute" title="Remove" style={{ top: '0', right: '0' }}> &times;</button>
								</div>
						}
					</div>
				</div>



				<button type="submit" className="btn btn-primary mt-3" disabled={submitBtnDisabled}>Register Page</button>

			</form>

		</div>
	)
}

export default New

