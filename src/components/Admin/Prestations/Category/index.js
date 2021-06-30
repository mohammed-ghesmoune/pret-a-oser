import React, { useState, useContext, useEffect, Fragment} from 'react'
import { DBContext } from '../../../../database'
import { slug } from '../../../../functions'

const initialValue = {
	name: '',
	slug: '',
}
const Category = () => {

	const { CATEGORY, PRESTATION } = useContext(DBContext)
	const [categories, setCategories] = useState([])
	const [prestations, setPrestations] = useState([])
	const [category, setCategory] = useState(initialValue)
	const [isEditCategory, setIsEditCategory] = useState(false)
	const [message, setMessage] = useState(null);


	useEffect(() => {
		CATEGORY.findAll().then(result => {
			setCategories(result)
		}).catch(e => console.log(e.message || e))

		PRESTATION.findAll().then(result => {
			setPrestations(result)
		}).catch(e => console.log(e.message || e))

	}, [CATEGORY, PRESTATION])

	const handleChange = e => {
		setCategory({ ...category, [e.target.id]: e.target.value, slug: slug(e.target.value) })
	}

	const handleEdit = category => {
		setCategory(category)
		setIsEditCategory(true)
		setMessage(null)
	}
	const handleDelete = id => {
		if (window.confirm('Delete this category ? ')) {
			CATEGORY.delete(id).then(() => {
				CATEGORY.findAll().then(result => {
					setCategories(result)
				})
			}).catch(e => console.log(e.message || e))
		}
	}

	const handleSubmit = e => {
		e.preventDefault();
		CATEGORY.add(category).then((result) => {
			!isEditCategory && setCategory(initialValue)
			setMessage({
				type: 'success',
				msg: 'Registred'
			})
			CATEGORY.findAll().then(result => {
				setCategories(result)
			})
		}).catch(error => {
			setMessage({
				type: 'danger',
				msg: `ERROR: ${error.message || error}`
			})
		})
	}
	const getTotal = cat => {
		return prestations.filter(prestation => prestation.category === cat.slug).length
	}

	const submitBtnDisabled = category.name === "";

	return (
		<div className="d-md-flex">
			<div className=" py-5 container">
				<div className="d-flex flex-wrap align-items-center">
					{
						isEditCategory ? (
							<Fragment>
								<h1 className="h2 mr-3">Edit Category</h1>
								<button onClick={() => { setCategory(initialValue); setIsEditCategory(false); setMessage(null) }} className="btn btn-outline-info"> Add New </button>
							</Fragment>
						)
							:
							(
								<h1 className="h2 mb-3">Add New Category</h1>
							)
					}
				</div>
				{
					message && <div className={`alert alert-${message.type}`}>{message.msg}</div>
				}
				<form className="form container" onSubmit={handleSubmit}>
					<div className="row bg-light border py-2 my-2">
						<label htmlFor="name" className="col-md-2 py-2 ">
							<div className="font-weight-bold">Name</div>
						</label>
						<div className="col-md-10  d-flex align-items-center">
							<input type="text" value={category.name} onChange={handleChange} id="name" className="form-control" placeholder="" />
						</div>
					</div>

					<button type="submit" className="btn btn-info" disabled={submitBtnDisabled}>Register Category</button>

				</form>
			</div>

			<div className="container py-5">
				<small>{categories.length} element(s)</small>
				<table className="table table-striped table-hover table-bordered mt-2">
					<thead className="thead-dark">
						<tr>
							<th scope="col"> Name </th>
							<th scope="col"> Slug </th>
							<th scope="col"> Total </th>
						</tr>
					</thead>
					<tbody>
						{
							categories.map(category => (
								<tr key={category.id} id={category.id}
									onMouseOver={e => document.querySelector(`#${category.id} small`).style.visibility = "visible"}
									onMouseOut={e => document.querySelector(`#${category.id} small`).style.visibility = "hidden"}
								>
									<td>
										<span className="categoryTitle" onClick={() => handleEdit(category)}>{category.name} </span>
										<small style={{ visibility: 'hidden' }}>
											<span onClick={() => handleEdit(category)} className="edit">Edit</span>
                  |
                  <span onClick={() => handleDelete(category.id)} className="remove">Delete</span>
										</small>
									</td>
									<td>{category.slug}</td>
									<td>{getTotal(category)}</td>
								</tr>
							))

						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Category
