import React, { useEffect, useState, useContext } from 'react'
import { DBContext } from '../../../../database';
import { slug } from '../../../../functions';
import { Link } from 'react-router-dom'



function All(props) {

	const [testimonials, setTestimonials] = useState([])

	const { TESTIMONIAL } = useContext(DBContext)

	useEffect(() => {

		TESTIMONIAL.findAll().then(result => {
			setTestimonials(result)
		}).catch(e => console.log(e.message || e))

	}, [TESTIMONIAL])

	const handleEdit = testimonial => {
		props.history.push(`/admin/testimonial/edit/${slug(testimonial.title)}`, { id: testimonial.id })

	}

	const handleDelete = id => {
		if (window.confirm('Delete this testimonial ? ')) {
			TESTIMONIAL.delete(id).then(() => {
				TESTIMONIAL.findAll().then(result => {
					setTestimonials(result)
				})
			}).catch(e => console.log(e.message || e))
		}
	}

	return (
		<div className="container py-4">
			<div className="d-flex flex-wrap align-items-center">
				<h1 className="h2 mr-3">Testimonials</h1>
				<Link to="/admin/testimonial/new" className="btn btn-outline-info"> Add New </Link>
			</div>
			<small>{testimonials.length} Testimonial(s)</small>
			<table className="table table-striped table-hover table-bordered mt-2">
				<thead className="thead-dark">
					<tr>
						<th> Title </th>
						<th> Date </th>
					</tr>
				</thead>
				<tbody>
					{
						testimonials.map(testimonial => (
							<tr key={testimonial.id} id={testimonial.id}
								onMouseOver={e => document.querySelector(`#${testimonial.id} small`).style.visibility = "visible"}
								onMouseOut={e => document.querySelector(`#${testimonial.id} small`).style.visibility = "hidden"}
							>
								<td>
									<span className="testimonialTitle" onClick={() => handleEdit(testimonial)}>{testimonial.title} </span>
									<small style={{ visibility: 'hidden' }}>
										<span onClick={() => handleEdit(testimonial)} className="edit">Edit</span>
                    |
                    <span onClick={() => handleDelete(testimonial.id)} className="remove">Delete</span>
									</small>
								</td>
								<td>{testimonial.createdAt}</td>
							</tr>
						))

					}
				</tbody>
			</table>
		</div>
	)
}

export default All
