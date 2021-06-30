import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Copyright = () => {

	const backToTopRef = useRef()

	useEffect(() => {
		
		// const headerNavHeight = document.querySelector('header').offsetHeight;
		const headerNavHeight = 150;
		function scrollFunction() {
			if (document.body.scrollTop > headerNavHeight || document.documentElement.scrollTop > headerNavHeight) {
				backToTopRef.current.style.visibility = "visible";
				backToTopRef.current.style.opacity = "1";
			} else {
				backToTopRef.current.style.visibility = "hidden";
				backToTopRef.current.style.opacity = "0";
			}
		}
		window.addEventListener('scroll', scrollFunction)

		return () => window.removeEventListener('scroll', scrollFunction)
	}, [])

	const handleClick = _ => {
		// When the user clicks on the button, scroll to the top of the document
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

	return (
		<div className="copyright-section py-3">

			<div className="copyright  container">
				<span>  &copy; {(new Date()).getFullYear()} </span>
				<Link to="/">Prêt à Oser </Link>
			</div>

			<button ref={backToTopRef} className="back-to-top" onClick={handleClick}>
				<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
				</svg>
			</button>
		</div>
	)
}

export default Copyright
