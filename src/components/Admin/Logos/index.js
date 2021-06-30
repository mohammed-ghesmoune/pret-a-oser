import React, { useState, Fragment, useContext, useEffect, useRef } from 'react'
import { DBContext } from '../../../database';

const initialValue={
	title : '',
	link : '',
	image :''
}
const imgStyle = {
	display: 'block',
	maxWidth: '300px',
	minHeight: '100px',
	boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
	cursor: 'pointer',
}

function Logos() {

	const imgRef = useRef()
	const [logo, setLogo] = useState(initialValue)
	const { LOGO } = useContext(DBContext)
	const [logos, setLogos] = useState([]);

	useEffect(() => {
		LOGO.findAll().then(result => setLogos(result)).catch(error => console.log(error.message || error))
	}, [LOGO])

	const handleImg = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setLogo({...logo, image: reader.result })

			}
			reader.readAsDataURL(file)
		} else {
			setLogo(initialValue);
		}
	}

	const handleRemoveImg = e => {
		e.preventDefault();
		setLogo(initialValue);
	}

	const handleChange = e => {
		setLogo({...logo, [e.target.id]: e.target.value })
	}
	
	const handleSubmit = e => {
		e.preventDefault();

		LOGO.add(logo).then(() => {
			LOGO.findAll().then(result => {
				setLogos(result)
				setLogo(initialValue)
			})
		}).catch(error => console.log(error.message || error))
	}

	const removeLogoFromSelection = id => {
		LOGO.delete(id).then(()=> setLogos(logos.filter((item) => item.id !== id))).catch(e => console.log(e.message || e))
		
	}

	return (
		<div className="my-5 container">

			<h1 className="h2 mb-3">Logos</h1>

			<div className="container-fluid">
				<div className="row bg-light border my-2">
					<div className="col-md-2 py-2 ">
						<div className="font-weight-bold">Your selection</div>
					</div>
					<div className=" carousel-img-container col-md-10 d-flex flex-wrap  align-items-center ml-auto ">
						{

							logos.length !== 0 ?
								logos.map(logo => (
									<div className=" m-2 position-relative" key={logo.id}>
										<img onClick={() => setLogo(logo)} className="img-thumbnail" src={logo.image} alt="" style={{ width: '150px', height: '150px', cursor: 'pointer' }} />
										<button onClick={() => removeLogoFromSelection(logo.id)} className="btn btn-danger btn-sm position-absolute" title="Remove" style={{ top: '2px', right: '2px' }}> &times;</button>
									</div>
								)) :
								<p> Your selection is empty !</p>

						}

					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="container-fluid">
					<div className="row bg-light border  my-2">
						<div className="col-md-2 py-2">
							<div className="font-weight-bold">Image</div>
							<small>Upload logo image</small>
						</div>
						<div className="col-md-10 ml-auto ">
							<input onChange={handleImg} ref={imgRef} id="image" className="form-control" type='file' accept="image/*" hidden />
							{
								logo.image ==='' ? (
									<label htmlFor="image" className="btn btn-info mt-md-3">Upload</label>
								) :
									(
										<Fragment>
											<div className="d-flex flex-column flex-md-row my-3 justify-content-around align-items-center">
												<div className="  position-relative" >
													<img src={logo.image} alt="logo" style={imgStyle} onClick={() => imgRef.current.click()} />
													<button onClick={handleRemoveImg} className="btn btn-danger btn-sm position-absolute" title="Remove" style={{ top: '0', right: '0' }}> &times;</button>
												</div>
												<div className="mt-3 mt-md-0">
													<div className="form-group">
														<label htmlFor="title" className="small font-weight-bold">Partner Name</label>
														<input value={logo.title} onChange={handleChange} className="form-control " type="text" id="title" />
													</div>
													<div className="form-group">
														<label htmlFor="link" className="small font-weight-bold">Partner Link</label>
														<input value={logo.link} onChange={handleChange} className="form-control " type="url" id="link" placeholder="Exp: https://www.partner-name.com" />
													</div>
												</div>
											</div>
											<div className="my-2 d-flex justify-content-center">
												<button type="submit" className="btn btn-info" >Add to Selection</button>
											</div>
										</Fragment>
									)
							}
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Logos
