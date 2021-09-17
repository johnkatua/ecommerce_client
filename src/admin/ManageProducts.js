import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import { getProducts, deleteProduct } from './ApiAdmin';
import {Link} from 'react-router-dom';


const ManageProducts = () => {
  const [items, setItems] = useState([]);

  const {user, token} = isAuthenticated();

  const loadProducts = () => {
    getProducts()
      .then(data => {
        if(data.error) {
          console.log(data.error)
        } else {
          setItems(data)
        }
      })
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token)
      .then(data => {
        if(data.error) {
          console.log(data.error)
        } else {
          loadProducts()
        }
      })
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout title='Manage Products' description='Perform CRUD on products' className='container fluid'>
      <div className="row mb-5">
        <div className='col-12'>
          <h2 className="text-center">Total {items.length} products</h2>
          <hr />
          <ul className="list-group">
            {items.map((product) => {
              return (
                <li key={product._id} className="list-group-item" style={{display: 'flex', flexDirection: 'column'}}>
                  <strong>{product.name}</strong>
                  <Link to={`/admin/product/update/${product._id}`}>
                    <span className="badge badge-warning badge-pill" style={{backgroundColor: 'blue', marginBottom: '5px'}}>
                      Update
                    </span>
                  </Link>
                  <span onClick={() => destroy(product._id)} className="badge badge-warning badge-pill" style={{backgroundColor: 'red', width: '56px', cursor: 'pointer'}}>
                    delete
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Layout>
  )
};

export default ManageProducts;