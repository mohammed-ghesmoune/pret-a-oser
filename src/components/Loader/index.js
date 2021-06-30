

import React from 'react'
//import ReactDOM from "react-dom"
import './style.css'
const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>

    // ReactDOM.createPortal(
    //     <div className="spinner-border text-light" role="status">
    //       <span className="sr-only">Loading...</span>
    //     </div>
    //   ,
    //   document.getElementById('loader')
    // )
  )
}

export default Loader

