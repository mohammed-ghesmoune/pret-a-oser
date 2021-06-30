import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Button = ({href , text}) => {
  return (
    <Link className="pao-btn " to={href}>
        <span className="pao-btn-text">{text}</span>
        <span className="pao-btn-border-one"></span>
        <span className="pao-btn-border-two"></span>
    </Link>
  )
}

export default Button
