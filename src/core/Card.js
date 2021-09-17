import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem, removeItem, updateItem} from './CartHelpers';

const Card = ({product, 
              showViewProductButton = true, 
              showCartButton = true, 
              cartUpdate = false,
              showRemoveButton = false,
              setRun = f => f,
              run = undefined
            }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className='mr-2'>
          <button className='btn btn-outline-primary m-2'>
            View Product
          </button>
        </Link> 
      )
    )
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  };

  const redirectUser = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }

  const showAddToCartButton = () => {
    return showCartButton && (
      <button onClick={addToCart} className="btn btn-outline-success mt-2 mb-2">
        Add to cart
      </button>
    )
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // triggers useEffect in the parent cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = (cartUpdate) => {
    return cartUpdate && (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
        </div>
      </div>
    )
  }

  const showRemoveProductButton = (showRemoveButton) => {
    return showRemoveButton && (
      <button className='btn btn-outline-danger mt-2 mb-2' onClick={() =>{ removeItem(product._id); setRun(!run)}}>
        Remove Product
      </button>
    )
  }

  const showQuantity = (quantity) => {
    return (quantity > 0 ? (
       <span className='badge badge-primary badge-pill text-info border m-2'>In Stock</span>
     ) : (
       <span className='badge badge-primary badge-pill text-info border m-2'>Out of Stock</span>
     )
    )}
  return (
      <div className="card mb-2">
        <div className="card-header name">{product.name}</div>
          <div className="card-body">
            {redirectUser(redirect)}
            <ShowImage item={product} url='product' />
              <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
              <p className='product-price'>Ksh{product.price}</p>
              <p className="product-category">
                Category: {product.category && product.category.name}
              </p>
              <p className="product-createdat">
                Added {moment(product.createdAt).fromNow()}
              </p>

              {showQuantity(product.quantity)}
              <br />

              {showViewButton(showViewProductButton)}

              {showAddToCartButton(showCartButton)}

              {showRemoveProductButton(showRemoveButton)}

              {showCartUpdateOptions(cartUpdate)}

          </div>
          
      </div>
  )
};

export default Card;