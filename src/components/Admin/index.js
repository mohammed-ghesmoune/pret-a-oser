import React, { useEffect, useContext } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import AdminSidebar from './AdminSidenav';
import Pages from './Pages';
import Prestations from './Prestations'
import Logos from './Logos'
import Testimonial from './Testimonial'
import User from './User'
import './style.css';
import { AuthContext } from '../../contexts/authContext';


const Admin = (props) => {

	const { auth } = useContext(AuthContext)

	let match = useRouteMatch({
		path: '/admin/:param',
		exact: false,
		strict: false,
	});
	const param = match ? match.params.param : null;

	const switchRoutes = (param) => {
		switch (param) {
			case 'page':
				return <Route path={`${match.url}`} component={Pages} />
			case 'prestation':
				return <Route path={`${match.url}`} component={Prestations} />
			case 'logos':
				return <Route path={`${match.url}`} component={Logos} />
			case 'testimonial':
				return <Route path={`${match.url}`} component={Testimonial} />
			case 'user':
				return <Route path={`${match.url}`} component={User} />
			default:
				// return <Route path="*" render={() => <div>Admin home</div>}></Route>
				return <Route path="*" component={Pages} />

		}
	}

	useEffect(() => {

		if (!auth /*|| (auth && auth.role !== 'admin')*/) {
			props.history.push('/');
		}
	}, [auth, props.history])

	return (
		 
		!auth /*|| (auth && auth.role !== 'admin') */? null :
			<div className="admin-wrapper">
				<div className="admin-sidenav">
					<AdminSidebar />
				</div>
				<div className="admin-content">
					<Switch>
						{switchRoutes(param)}
					</Switch>
				</div>
			</div>

	)
}

export default Admin
