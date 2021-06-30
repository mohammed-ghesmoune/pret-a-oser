import React, { useState, useContext } from 'react'
import { DBContext } from '../../../../database';


const initialValue = {
  title: '',
  author: '',
  text: ''
}

function New() {

  const [testimonial, setTestimonial] = useState(initialValue)
  const [message, setMessage] = useState(null);
  const { TESTIMONIAL } = useContext(DBContext)

  const handleChange = e => {
    setTestimonial({...testimonial, [e.target.id]: e.target.value })
  }

  const handleSubmit = e => {

    e.preventDefault();

    TESTIMONIAL.add(testimonial).then(result => {
      setTestimonial(initialValue);

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

  const disabled = testimonial.title === '' || testimonial.author === '' || testimonial.text === '' ;
  
  return (

    <div className=" py-5 container">
      <h1 className="h2 mb-3">Add New Testimonial</h1>
       {
        message && <div className={`alert alert-${message.type}`}>{message.msg}</div>
      }
      <form onSubmit={handleSubmit} className="form container" >
        <div className="row bg-light border my-2 ">
          <label htmlFor="title" className="col-md-2 py-2 ">
            <div className="font-weight-bold">Title</div>
            <small>Enter testimonial title</small>
          </label>
          <div className="col-md-10 form-group d-flex align-items-center">
            <input type="text" value={testimonial.title} onChange={handleChange} id="title" className="form-control" placeholder="" required/>
          </div>
        </div>
        <div className="row bg-light border my-2 ">
          <label htmlFor="author" className="col-md-2 py-2 ">
            <div className="font-weight-bold">Author</div>
            <small>Enter author name</small>
          </label>
          <div className="col-md-10 form-group d-flex align-items-center">
            <input type="text" value={testimonial.author} onChange={handleChange} id="author" className="form-control" placeholder="" required/>
          </div>
        </div>
        <div className="row bg-light border my-2">
          <label htmlFor="text" className="col-md-2 py-2">
            <div className="font-weight-bold d-block">Text</div>
            <small>Enter testimonial text</small>
          </label>
          <div className="col-md-10 form-group d-flex align-items-center pt-3">
            <textarea value={testimonial.text} onChange={handleChange} id="text" className="form-control" rows="5" required />
          </div>
        </div>
        <div className="form-group col">
          <button type="submit" className="btn btn-info" disabled={disabled}>Register</button>
        </div>
      </form>
    </div>
  )
}

export default New
