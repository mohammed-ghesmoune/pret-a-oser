import React, { useEffect, useContext, useState } from 'react';
import { DBContext } from '../../database';
import TestimonialCarousel from '../TestimonialCarousel'
import PrestationCarousel from '../PrestationCarousel'
import './home.css';
import brush from '../../backgrounds/brush-9.svg'


const initialValue = {
	title: '',
	content: '',
	image:''
}

const Home = _ => {

	const { PAGE } = useContext(DBContext);
	const [page, setPage] = useState(initialValue);
	const { content, image } = page;

	useEffect(() => {
		PAGE.findOneBy('title', 'home').then(result => result && setPage(result))

	}, [PAGE])

	const createMarkup = (text) => ({ __html: text });

	return (
		<div className="front-page">
			<div className="thumbnail" style={{ backgroundImage: `url(${image})` }}>
				<div className="header ">
					<div className="name">Nacera Meziadi</div>
					<div className="description">Consultante en image & personal shopper</div>
				</div>
			</div>
			{
				content &&
				<div className=" container-fluid content py-5"  style={{ backgroundImage: `url(${brush})` }}>
					<div className="row">
						<div className=" col-md-9 col-lg-7 mx-auto px-5" dangerouslySetInnerHTML={createMarkup(content)} />
					</div>
				</div>
			}
			<PrestationCarousel category="service" direction="right" title="services" />
			<TestimonialCarousel />
			<PrestationCarousel category="forfait" direction="left" title="forfaits" />

		</div>
	)
}

export default Home;