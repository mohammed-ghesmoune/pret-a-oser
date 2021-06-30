import React, { useState, useEffect, useContext } from 'react';
import { DBContext } from '../../../../database';
import { slug } from '../../../../functions';
import { Link } from 'react-router-dom'

const All = props => {

  const [users, setUsers] = useState([])

  const { USER } = useContext(DBContext)

  useEffect(() => {

    USER.findAll().then(result => {
      setUsers(result)
    }).catch(e => console.log(e.message || e))

  }, [USER])

  const handleEdit = user => {
    props.history.push(`/admin/user/edit/${slug(user.username)}`, { id: user.id })

  }

  const handleDelete = id => {
    if (window.confirm('Delete this user ? ')) {
      USER.delete(id).then(() => {
        USER.findAll().then(result => {
          setUsers(result)
        })
      }).catch(e => console.log(e.message || e))
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap align-items-center">
        <h1 className="h2 mr-3">Users</h1>
        <Link to="/admin/user/new" className="btn btn-outline-info"> Add New </Link>
      </div>
      <small>{users.length} User(s)</small>
      <table className="table table-striped table-hover table-bordered mt-2">
        <thead className="thead-dark">
          <tr>
            <th> Username </th>
            <th> Email </th>
            <th> Role </th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id} id={user.id}
                onMouseOver={e => document.querySelector(`#${user.id} small`).style.visibility = "visible"}
                onMouseOut={e => document.querySelector(`#${user.id} small`).style.visibility = "hidden"}
              >
                <td>
                  <span className="pageTitle" onClick={() => handleEdit(user)}>{user.username} </span>
                  <small style={{ visibility: 'hidden' }}>
                    <span onClick={() => handleEdit(user)} className="edit">Edit</span>
                  |
                  <span onClick={() => handleDelete(user.id)} className="remove">Delete</span>
                  </small>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))

          }
        </tbody>
      </table>
    </div>
  )
}

export default All
