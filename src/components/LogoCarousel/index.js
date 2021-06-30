import React, { useEffect, useContext, useState } from 'react'
import { DBContext } from '../../database';
import Slider from 'react-slick'


const logoStyle = {
	maxWidth: '100px',
	height: 'auto',
	margin: '0 auto',
	cursor: 'pointer'
}

function LogoCarousel() {
	const [logos, setLogos] = useState(null)
	const { LOGO } = useContext(DBContext)
	const settings = {
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		dots: false,
		pauseOnHover: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 520,
			settings: {
				slidesToShow: 3
			}
		}]
	}

	useEffect(() => {
		LOGO.findAll().then(result => setLogos(result)).catch(error => console.log(error.message || error))
	}, [LOGO])

	return (
		logos &&
		<div className="container-md pb-3 pt-4">
			<Slider {...settings}>
				{
					logos.map(logo => (
						<div key={logo.id}>
							<a href={logo.link} target="_blank" rel="noreferrer"><img src={logo.image} alt="" style={logoStyle} /></a>
						</div>
					))
				}
			</Slider>
		</div>
	)
}

export default LogoCarousel
