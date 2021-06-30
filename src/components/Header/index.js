import React, { useContext, Fragment, useEffect , useState} from 'react';
import { NavLink, Link, useRouteMatch } from 'react-router-dom';
//import routes from '../../data/routes';
import slugify from 'slugify';
import './style.css'
import { AuthContext } from '../../contexts/authContext';
import {PRESTATION} from '../../database'

const slug = str => slugify(str, { lower: true });

const Header = () => {

	const isAdmin = useRouteMatch('/admin');
	const { auth } = useContext(AuthContext)
	const [routes, setRoutes] =useState([])

	useEffect(()=>{
  PRESTATION.findAll().then(prestations=>{
		let data= prestations.reduce(function (acc, obj) {
			if (acc.length === 0){
				acc.push({category: obj.category, title:[obj.title]})
			}else{
			let index = acc.findIndex((object)=> object.category === obj.category);
			if(index !== -1 ){
				acc[index].title.push(obj.title);
			}else{
				acc.push({category: obj.category, title:[obj.title]})
			}     
		}
			return acc;
		}, []);

		setRoutes(data)
	})
	},[])

	useEffect(() => {

		const handleDropdownToggles = (e, links) => {
			links.forEach(element => {
				element.classList.remove("active")
			})
			e.currentTarget.classList.add("active")
		}

		const dropdownToggles = document.querySelectorAll('.navbar-nav > li> a')
		dropdownToggles.forEach(element => {
			element.addEventListener('click', (e) => handleDropdownToggles(e, dropdownToggles))
		})

		const handleActiveLink = (e, links) => {
			links.forEach(element => {
				element.parentElement.parentElement.previousElementSibling.classList.remove("active")
			})
			e.currentTarget.parentElement.parentElement.previousElementSibling.classList.add("active")

		}
		const linkElements = document.querySelectorAll('.dropdown-menu a')
		linkElements.forEach(element => {
			element.addEventListener('click', (e) => handleActiveLink(e, linkElements))
		})

		return () => {
			linkElements.forEach(element => {
				element.removeEventListener('click', (e) => handleActiveLink(e, linkElements))
			})
		}
	}, [])
	return (
		!isAdmin ?
			<header>
				<nav className="navbar navbar-expand-md navbar-light bg-white pb-3 pt-3">
					<div className="container-fluid d-flex flex-row flex-md-column justify-content-center align-items-center position-relative">
						<NavLink className="navbar-brand" to="/">Prêt à Oser</NavLink>
						<button className="navbar-toggler position-absolute right-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ml-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/about">About</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/contact">contact</NavLink>
								</li>
								{routes.map((route, i) =>
									(
										route.title.length > 1 ?
											<li key={i} className="nav-item dropdown">
												<Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
													{route.category}
												</Link>
												<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
													{route.title.map((title, index) => (<li key={index}><NavLink className="dropdown-item" to={`/prestation/${slug(route.category)}/${slug(title)}`}>{title}</NavLink></li>))}
												</ul>
											</li>
											:
											<li key={i} className="nav-item">
												<NavLink className="nav-link" to={`/prestation/${slug(route.category)}/${slug(route.title[0])}`}>{route.title[0]}</NavLink>
											</li>
									))
								}


								<li className="nav-item dropdown">
									<Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Mon Compte
                                    </Link>
									<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
										{
											!auth ?
												<Fragment>
													<li><NavLink className="dropdown-item" to='/login'>connexion</NavLink></li>
													<li><NavLink className="dropdown-item" to='/signup'>inscription</NavLink></li>
												</Fragment>
												:
												<Fragment>
													<li><NavLink className="dropdown-item" to='/profil'>Mon Profil</NavLink></li>
													<li><NavLink className="dropdown-item" to='/logout'>deconnexion</NavLink></li>
												</Fragment>
										}
									</ul>
								</li>
								{
									auth /*&& auth.role === "admin"*/ &&
									<li className="nav-item">
										<NavLink className="nav-link" to="/admin">admin</NavLink>
									</li>
								}

							</ul>

						</div>
					</div>
				</nav>

			</header>
			: null
	)
}

export default Header;