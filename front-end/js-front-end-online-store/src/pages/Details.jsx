// import React from 'react';
// import PropTypes from 'prop-types';

// // import * as api from '../services/api';
// import ProductDetails from '../components/ProductDetails';
// import { getProductById } from '../services/api';

// class Details extends React.Component {
//   state = {
//     item: '',
//   };

//   async componentDidMount() {
//     const { match: { params: { id } } } = this.props;
//     const response = await getProductById(id);

//     const { title, thumbnail, price } = product;
//     this.setState({
//       item: { title, thumbnail, price },
//     });

//     this.setState({
//       item: response,
//     });
//   }

//   render() {
//     const { item } = this.state;
//     return (
//       <div>
//         <ProductDetails item={ item } />
//       </div>
//     );
//   }
// }

// Details.propTypes = {
//   id: PropTypes.string.isRequired,
// }.isRequired;

// export default Details;
