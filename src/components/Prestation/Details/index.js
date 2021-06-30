import React, { Fragment } from 'react';
import { /*useHistory,*/ Link } from 'react-router-dom';
import { slug } from '../../../functions'
import './style.css'
import Button from '../../Button'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

import brush from '../../../backgrounds/brush-9.svg'

const Details = ({ prestation, prestations }) => {

	const index = prestations.findIndex(p => p.title === prestation.title)

	const getPrestation = index => {
		const p = prestations[index];
		return {
			path: `/prestation/${slug(p.category)}/${slug(p.title)}`,
			title: p.title
		}
	}
	const previous = index - 1 >= 0 ?
		<Link to={getPrestation(index - 1).path}> <BsChevronDoubleLeft /><span className="pl-2">{`${getPrestation(index - 1).title}`}</span></Link>
		:
		<div></div>;
	const next = index + 1 < prestations.length ?
		<Link to={getPrestation(index + 1).path}><span className="pr-2">{`${getPrestation(index + 1).title}`} </span><BsChevronDoubleRight /></Link>
		:
		<div></div>;

	const createMarkup = (text) => ({ __html: text });

	return (
		<Fragment>
			{/* prestation header */}
			<div className=" prestationHeader container-fluid" >
				<div className=" container py-3">
					<h1 className=" mb-0 h2 py-3 text-uppercase"> {prestation.title}</h1>
				</div>
			</div>
			<div className="prestationThumbnail" style={{ backgroundImage: `url(${prestation.image})` }}>
			</div>
			<div className="prestationContent container-fluid py-5 px-5" style={{ backgroundImage: `url(${brush})` }}>
				<div className="row">
					<div className="col-md-7 mx-auto">
						<div className="mb-5" dangerouslySetInnerHTML={createMarkup(prestation.content)} />
						{
							prestation.duration !== "0" &&
							<div className=" prestationDuration d-flex py-2">
								<div className="mr-2"><svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-clock-history" fill="#c6317b" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
									<path fillRule="evenodd" d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
									<path fillRule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
								</svg>
								</div>
								<div>
									Durée:<span> {prestation.duration} </span>
								</div>
							</div>}
						{
							prestation.price !== "0" &&
							<div className=" prestationPrice d-flex py-2">
								<div className="mr-2"><svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-wallet2" fill="#c6317b" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
								</svg>
								</div>
								<div>
									Tarif: <span> {prestation.price} &euro; </span>
								</div>
							</div>
						}
						<div className="text-center mt-5 my-3">
							<Button href="/contact" text="Prendre RDV" />
						</div>
					</div>
				</div>
			</div>
			{
				(prestations[index - 1] || prestations[index + 1]) &&
				<div className="prestationNavigation">
					<div className="container-sm">
						<div className="row py-4">
							<div className="col text-left">
								{previous}
							</div>
							<div className="col text-right">
								{next}
							</div>
						</div>
					</div>
				</div>

			}
		</Fragment>
	)
}

export default Details;