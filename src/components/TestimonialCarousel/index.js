import React, { useEffect, useContext, useState } from 'react'
import { DBContext } from '../../database'
import Slider from 'react-slick'
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import brush from '../../backgrounds/brush-7.svg'


function TestimonialCarousel() {
	const [testimonials, setTestimonials] = useState(null)
	const { TESTIMONIAL } = useContext(DBContext)
	const settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 6000,
		arrows: false,
		dots: false,
		pauseOnHover: true,
	}

	useEffect(() => {
		TESTIMONIAL.findAll().then(result => setTestimonials(result))
	}, [TESTIMONIAL])

	return (
		testimonials &&
		<div className="container-md my-3 pt-5">
			<h2 className="text-center py-5 h2 text-uppercase page-title" style={{backgroundImage:`url(${brush})`}}> Temoignages ...</h2>
			<div className="row my-5">
				<div className="col-md-9 mx-auto ">
					<Slider {...settings}>
						{
							testimonials.map(testimonial => (
								<div key={testimonial.id} className="container-fluid">

									<div className="testimonialWraper d-flex justify-content-between ">
										<div className=" align-self-start">
											<FaQuoteLeft style={{ color: 'pink', fontSize: '1.5rem', alignSelf: 'start' }} />
										</div>
										<div className="mx-4 align-self-center py-2">
											<div className="testimonial-title font-weight-bold mb-3">
												{testimonial.title}
											</div>
											<div className="testimonial-tesxt mb-3">{testimonial.text} </div>
											<div className=" testimonial-author font-weight-bold text-right">
												{testimonial.author}
											</div>
										</div>
										<div className=" align-self-end">
											<FaQuoteRight style={{ color: 'pink', fontSize: '1.5rem', alignSelf: 'end' }} />
										</div>
									</div>

								</div>

							))
						}
					</Slider>
				</div>
			</div>
		</div>
	)
}

export default TestimonialCarousel
