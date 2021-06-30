import React, { Fragment, useEffect } from 'react';
import { MdViewCarousel, MdHome } from "react-icons/md";
import { ImQuotesLeft, ImFilesEmpty } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { GiFiles } from "react-icons/gi";
import { IconContext } from "react-icons";
import { NavLink, Link } from 'react-router-dom';

const AdminSidebar = (props) => {

	useEffect(() => {

		const handleCollapseList = (e, elements) => {
			elements.forEach(element => {
				// element.nextElementSibling.style.display='none'
				element.nextElementSibling.classList.remove("show")
				element.classList.remove("active")
			})
			e.currentTarget.nextElementSibling.classList.add("show")
			e.currentTarget.classList.add("active")

		}
		const elements = document.querySelectorAll(".dropdown-btn")
		elements.forEach(element => {
			element.addEventListener('click', (e) => handleCollapseList(e, elements))
		})

		const handleActiveLink = (e, links) => {
			links.forEach(element => {
				element.parentElement.previousElementSibling.classList.remove("active")
			})
			e.currentTarget.parentElement.previousElementSibling.classList.add("active")

		}
		const linkElements = document.querySelectorAll('.dropdown-content a')
		linkElements.forEach(element => {
			element.addEventListener('click', (e) => handleActiveLink(e, linkElements))
		})

		return () => {
			elements.forEach(element => {
				element.removeEventListener('click', (e) => handleCollapseList(e, elements))
			})

			linkElements.forEach(element => {
				element.removeEventListener('click', (e) => handleActiveLink(e, linkElements))
			})
		}
	}, [])



	return (
		<IconContext.Provider value={{ className: "admin-icon" }}>
			<Fragment>

				<div className="dropdown-wrapper">
					<NavLink to="/" className="dropdown-btn" title="Aller sur le site"><MdHome size="1.4rem" /> <span>Prêt à Oser</span></NavLink>
					<div className="dropdown-content" >
						<NavLink className="" to="/home">Aller sur le site</NavLink>
					</div>
				</div>

				<div className="dropdown-wrapper">
					<Link to="/admin/page/all" className="dropdown-btn"><GiFiles size="1.4rem" /> <span>Pages</span></Link>
					<div className="dropdown-content" >
						<NavLink className="" to="/admin/page/all">All Pages</NavLink>
						<NavLink className="" to="/admin/page/new">New Page</NavLink>
					</div>
				</div>

				<div className="dropdown-wrapper">
					<Link to="/admin/prestation/all" className="dropdown-btn"> <ImFilesEmpty /> <span>Prestations</span> </Link>
					<div className="dropdown-content">
						<NavLink className="" to="/admin/prestation/all">All Prestations</NavLink>
						<NavLink className="" to="/admin/prestation/new">New Prestation</NavLink>
						<NavLink className="" to="/admin/prestation/category">Categories</NavLink>
					</div>
				</div>

				<div className="dropdown-wrapper">
					<Link to="/admin/testimonial/all" className="dropdown-btn"><ImQuotesLeft /> <span>Testimonials</span></Link>
					<div className="dropdown-content" >
						<NavLink className="" to="/admin/testimonial/all">All Testimonials</NavLink>
						<NavLink className="" to="/admin/testimonial/new">New Testimonial</NavLink>
					</div>
				</div>

				<div className="dropdown-wrapper">
					<Link to="/admin/user/all" className="dropdown-btn"><FaUsers /> <span>Users</span></Link>
					<div className="dropdown-content" >
						<NavLink className="" to="/admin/user/all">All Users</NavLink>
						<NavLink className="" to="/admin/user/new">New User</NavLink>
					</div>
				</div>

				<div className="dropdown-wrapper">
					<Link to="/admin/logos" className="dropdown-btn"><MdViewCarousel /> <span>Logos</span></Link>
					<div className="dropdown-content" >
						<NavLink className="" to="/admin/logos">Logos</NavLink>
					</div>
				</div>

			</Fragment>
		</IconContext.Provider>
	)
}

export default AdminSidebar
