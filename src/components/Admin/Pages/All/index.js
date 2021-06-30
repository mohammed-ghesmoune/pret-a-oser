import React, { useState, useEffect, useContext } from 'react';
import { DBContext } from '../../../../database';
import { slug } from '../../../../functions';
import { Link } from 'react-router-dom'

const All = props => {

	const [pages, setPages] = useState([])

	const { PAGE } = useContext(DBContext)

	useEffect(() => {

		PAGE.findAll().then(result => {
			setPages(result)
		}).catch(e => console.log(e.message || e))

	}, [PAGE])

	const handleEdit = page => {
		props.history.push(`/admin/page/edit/${slug(page.title)}`, { id: page.id })

	}

	const handleDelete = id => {
		if (window.confirm('Delete this page ? ')) {
			PAGE.delete(id).then(() => {
				PAGE.findAll().then(result => {
					setPages(result)
				})
			}).catch(e => console.log(e.message || e))
		}
	}

	return (
		<div className="container py-4">
			<div className="d-flex flex-wrap align-items-center">
				<h1 className="h2 mr-3">Pages</h1>
				<Link to="/admin/page/new" className="btn btn-outline-info"> Add New </Link>
			</div>
			<small>{pages.length} Page(s)</small>
			<table className="table table-striped table-hover table-bordered mt-2">
				<thead className="thead-dark">
					<tr>
						<th> Title </th>
						<th> Date </th>
					</tr>
				</thead>
				<tbody>
					{
						pages.map(page => (
							<tr key={page.id} id={page.id}
								onMouseOver={e => document.querySelector(`#${page.id} small`).style.visibility = "visible"}
								onMouseOut={e => document.querySelector(`#${page.id} small`).style.visibility = "hidden"}
							>
								<td>
									<span className="pageTitle" onClick={() => handleEdit(page)}>{page.title} </span>
									<small style={{ visibility: 'hidden' }}>
										<span onClick={() => handleEdit(page)} className="edit">Edit</span>
                  |
                  <span onClick={() => handleDelete(page.id)} className="remove">Delete</span>
									</small>
								</td>
								<td>{page.createdAt}</td>
							</tr>
						))

					}
				</tbody>
			</table>
		</div>
	)
}

export default All
