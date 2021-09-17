import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import {getCart} from './CartHelpers';
import Card from './Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';


const Cart = () => {
  const [products, setProducts] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setProducts(getCart());
  }, [run]);

  const showProducts = (products) => {
    return (
      <div>
        <h2>Your cart has {`${products.length}`} products</h2>
        <hr />
        {products.map((product, idx) => {
          return (
            <Card key={idx} product={product}  showCartButton={false} cartUpdate={true} showRemoveButton={true} setRun={setRun} run={run} />
          )
        })}
      </div>
    )
  };

  const noProductsMessage = () => {
    return (
      <h2>
        Your cart is empty.
        <br />
        <Link to='/shop'>Continue Shopping</Link>
      </h2>
    )
  }
  return (
    <Layout title='Shopping Cart' description='Manage your shopping cart. Add, remove, checkout or continue shopping.' className='container-fluid'>
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? showProducts(products) : noProductsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={products} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  )
}

export default Cart;