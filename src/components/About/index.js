import React, { useEffect, useContext, useState} from 'react'
import { DBContext } from '../../database'
import './style.css'

const initialValue={
	title:'',
	image: '',
	content:''
}
const About = () => {

	const { PAGE } = useContext(DBContext)
	const [page, setPage] = useState(initialValue)

	useEffect(() => {

		PAGE.findOneBy('title', 'about').then(result => result && setPage(result))

	}, [PAGE])

	const createMarkup = (text) => ({ __html: text });

	return (
		
		<div className="about-page" style={{minHeight:'55vh'}}>
			<div className=" header" >
				<div className=" container py-3">
					<h1 className=" mb-0 h2 py-3 text-uppercase">Mon Concept</h1>
				</div>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className=" thumbnail col-md-6 px-0 ">
						<img src={page.image} alt={page.title} />
					</div>
					<div className=" content col-md-6 py-5 px-5  " dangerouslySetInnerHTML={createMarkup(page.content)} />
				
				</div>
			</div>
		</div>

	)
}

export default About
