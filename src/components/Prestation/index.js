

import React, { Component } from 'react';
import Details from './Details';
import { PRESTATION } from '../../database';
import { slug } from '../../functions';

// const initialValue = {
//   title: '',
//   image: '',
//   content: '',
//   duration: '',
//   price: ''
// }
class Prestation extends Component {

  state = {
    prestations: [],
    prestation: null,
    categorySlug: this.props.match.params.category,
    titleSlug: this.props.match.params.title,
  }
  verification(categorySlug, titleSlug) {
    if (categorySlug) {
      PRESTATION.findBy('category', categorySlug)
        .then(result => {
          if (result.length !== 0) {
            this.setState({ prestations: result });
            return result
          } else {
            this.props.history.push('/notfound')
          }
        }
        ).then(result => {
          const [prestation] = titleSlug ? result.filter(item => slug(item.title) === titleSlug) : []
          prestation ? this.setState({ prestation }) : this.props.history.push('/notfound')
        })
        .catch(error => console.log(error.message || error))
    } else {
      this.props.history.push('/home')
    }
  }
  componentDidMount() {
    this.verification(this.state.categorySlug, this.state.titleSlug)
  }

  componentDidUpdate() {
    const { category, title } = this.props.match.params;
    if (category !== this.state.categorySlug || title !== this.state.titleSlug) {
      this.setState({
        categorySlug: category,
        titleSlug: title
      })
      this.verification(category, title)
    }
  }


  render() {
    const { prestation, prestations } = this.state;
    return (
      <div style={{ minHeight: '60vh' }}>
        {prestation && <Details {...{ prestation, prestations }} />}
      </div>
    )
  }

}

export default Prestation;




// import React, { useEffect, useContext, useState } from 'react';
// import { useParams } from 'react-router-dom';

// //import Category from './Category';
// import Details from './Details';
// import { DBContext } from '../../database';
// import { slug } from '../../functions';
// //import Loader from '../Loader';

// const initialValue = {
//   title: '',
//   image: '',
//   content: '',
//   duration: '',
//   price: ''
// }
// const Prestation = props => {

//   let { category: categorySlug, title: titleSlug } = useParams();
//   const [prestations, setPrestaions] = useState([])
//   const { PRESTATION } = useContext(DBContext)
//   const [prestation, setPrestation] = useState(initialValue)

//   useEffect(() => {
//     if (categorySlug) {
//       PRESTATION.findBy('category', categorySlug)
//         .then(result => result.length !== 0 ? setPrestaions(result) : props.history.push('/notfound'))
//         .then(() => {
//           const [prest] = titleSlug ? prestations.filter(item => slug(item.title) === titleSlug) : []
//           prest && setPrestation(prest) 
//         })
//         .catch(error => console.log(error.message || error))
//     } else {
//       props.history.push('/home')
//     }
//   }, [categorySlug, PRESTATION, props.history,prestations,titleSlug])


//   return (

//    prestation && <Details {...{ prestation, prestations }} />

//   )
// }

// export default Prestation;

