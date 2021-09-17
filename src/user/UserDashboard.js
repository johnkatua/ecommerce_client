import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import { getPurchaseHistory } from './ApiUser';
import moment from 'moment';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {user: {_id, name, email, role}, token} = isAuthenticated();

  const init = (userId, token) => {
    console.log(userId)
    getPurchaseHistory(userId, token)
      .then(data => {
        if(data.error) {
          console.log(data.error)
        } else {
          setHistory(data);
        }
      })
  };

  useEffect(() => {
    init(_id, token)
  },[])
  

  const userLinks = () => {
    return (
      <div className='card mb-5'>
        <h4 className="card-header">User Links</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link className='nav-link' to='/cart'>Shopping Cart</Link>
            </li>
            <li className="list-group-item">
              <Link className='nav-link' to={`/profile/${_id}`}>Update Profile</Link>
            </li>
          </ul>
      </div>
    )
  }

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className="list-group-item">name: {name}</li>
          <li className="list-group-item">name: {_id}</li>
          <li className="list-group-item">email: {email}</li>
          <li className="list-group-item">role: {role === 0 ? 'Regular user' : 'Admin'}</li>
        </ul>
      </div>
    )
  };

  const purchaseHistory = (history) => {
    return (
      <div className='card mb-5'>
      <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className="list-group-item">
            {history.map((orders, idx) => {
              return (
                <div key={idx}>
                  <hr />
                  {orders.products.map((product) => {
                    return (
                      <div key={product._id} className='mb-3'>
                        <h6>Product name: {product.name}</h6>
                        <h6>Product price: ksh{product.price}</h6>
                        <h6>Purchase date: {moment(product.createdAt).fromNow()}</h6>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </li>
        </ul>
      </div>
    )
  }
  return (
    <Layout title='Dashboard' description={`Happy shopping ${name}`} className='container-fluid'>
      <div className='row'>
        <div className='col-3'>
          {userLinks()}
        </div>
        <div className='col-9'>
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  )
};

export default Dashboard;