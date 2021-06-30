import React , {useState, useEffect, useContext} from 'react';
import {DBContext} from '../../../../database';
import { slug } from '../../../../functions';
import { Link } from 'react-router-dom'

const All = props => {

  const [prestations, setPrestations] = useState([])

  const { PRESTATION } = useContext(DBContext)

  useEffect(() => {

    PRESTATION.findAll().then(result => {
      setPrestations(result)
    }).catch(e => console.log(e.message || e))

  }, [PRESTATION])

  const handleEdit = prestation => {
    props.history.push(`/admin/prestation/edit/${slug(prestation.title)}`, { id: prestation.id })

  }

  const handleDelete = id => {
    if (window.confirm('Delete this prestation ? ')) {
      PRESTATION.delete(id).then(() => {
        PRESTATION.findAll().then(result => {
          setPrestations(result)
        })
      }).catch(e => console.log(e.message || e))
    }
  }

 return (
  <div className="container py-4">
    <div className="d-flex flex-wrap align-items-center">
      <h1 className="h2 mr-3">Prestations</h1>
      <Link to="/admin/prestation/new" className="btn btn-outline-info"> Add New </Link>
    </div>      
    <small>{prestations.length} Prestation(s)</small>
    <table className="table table-striped table-hover table-bordered mt-2">
      <thead className="thead-dark">
        <tr>
          <th scope="col"> Title </th>
          <th scope="col"> Category </th>
          <th scope="col"> Date </th>
        </tr>
      </thead>
      <tbody>
        {
          prestations.map(prestation => (
            <tr key={prestation.id} id={prestation.id}
              onMouseOver={e => document.querySelector(`#${prestation.id} small`).style.visibility = "visible"}
              onMouseOut={e => document.querySelector(`#${prestation.id} small`).style.visibility = "hidden"}
            >
              <td>
                <span className="prestationTitle" onClick={() => handleEdit(prestation)}>{prestation.title} </span>
                <small style={{ visibility: 'hidden' }}>
                  <span onClick={() => handleEdit(prestation)} className="edit">Edit</span>
                  |
                  <span onClick={() => handleDelete(prestation.id)} className="remove">Delete</span>
                </small>
              </td>
              <td>{prestation.category}</td>
              <td>{prestation.createdAt}</td>
            </tr>
          ))

        }
      </tbody>
    </table>
  </div>
)
}

export default All
