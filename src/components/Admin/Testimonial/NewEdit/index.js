import React, { useState, useEffect, useContext, Fragment } from 'react'
import { DBContext } from '../../../../database';
import { slug } from '../../../../functions';
import { Link, useRouteMatch } from 'react-router-dom'


const initialValue = {
	title: '',
	author: '',
	text: ''
}

function Edit(props) {
	const isEditTestimonial = useRouteMatch('/admin/testimonial/:param').params.param === 'edit'

	const [testimonial, setTestimonial] = useState(initialValue)
	const [message, setMessage] = useState(null);
	const { TESTIMONIAL } = useContext(DBContext)
	const testimonialID = props.location.state ? props.location.state.id : null

	useEffect(() => {
		if (testimonialID) {
			TESTIMONIAL.findOneById(testimonialID).then(result => {
				if (result) {
					setTestimonial(result)
				} else {
					props.history.push('/admin/testimonial/all')
				}
			}).catch(e => console.log(e.message || e))
		} else if (isEditTestimonial) {
			props.history.push('/admin/testimonial/all')
		}else{
			setTestimonial(initialValue);
			setMessage(null);
		}
	}, [TESTIMONIAL, testimonialID, props.history,isEditTestimonial])

	const handleChange = e => {
		setTestimonial({ ...testimonial, [e.target.id]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault();
		TESTIMONIAL.add(testimonial).then(result => {

			!isEditTestimonial && setTestimonial(initialValue);

			setMessage({
				type: 'success',
				msg: 'Your Modifications was registred'
			})
			props.history.push(`/admin/testimonial/edit/${slug(testimonial.title)}`, { id: testimonial.id })

		}).catch(error => {
			setMessage({
				type: 'danger',
				msg: `ERROR: ${error.message || error}`
			})
		})
	}

	const {title, author, text} =testimonial
	const disabled = title === '' || author === '' || text === '';

	return (


		<div className=" py-5 container">
			<div className="d-flex flex-wrap align-items-center">
				{
					isEditTestimonial ? (
						<Fragment>
							<h1 className="h2 mr-3">Edit Testimonial</h1>
							<Link to="/admin/testimonial/new" className="btn btn-outline-info"> Add New </Link>
						</Fragment>
					)
						:
						(
							<h1 className="h2 mb-3">Add New Testimonial</h1>
						)
				}
			</div>
			{
				message && <div className={`alert alert-${message.type}`}>{message.msg}</div>
			}
			<form onSubmit={handleSubmit} className="form container">
				<div className="row bg-light border my-2 ">
					<label htmlFor="title" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Title</div>
						<small>Enter testimonial title</small>
					</label>
					<div className="col-md-10 form-group d-flex align-items-center">
						<input type="text" value={title} onChange={handleChange} id="title" className="form-control" placeholder="" />
					</div>
				</div>
				<div className="row bg-light border my-2 ">
					<label htmlFor="author" className="col-md-2 py-2 ">
						<div className="font-weight-bold">Author</div>
						<small>Enter author name</small>
					</label>
					<div className="col-md-10 form-group d-flex align-items-center">
						<input type="text" value={author} onChange={handleChange} id="author" className="form-control" placeholder="" />
					</div>
				</div>
				<div className="row bg-light border my-2">
					<label htmlFor="text" className="col-md-2 py-2">
						<div className="font-weight-bold d-block">Text</div>
						<small>Enter testimonial text</small>
					</label>
					<div className="col-md-10 form-group d-flex align-items-center pt-3">
						<textarea value={text} onChange={handleChange} id="text" className="form-control" rows="5" />
					</div>
				</div>
				<div className="form-group col">
					<button type="submit" className="btn btn-info" disabled={disabled}>Register Testimonial</button>
				</div>
			</form>
		</div>
	)
}

export default Edit
