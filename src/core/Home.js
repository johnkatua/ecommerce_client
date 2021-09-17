import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import {getProducts} from './ApiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold')
      .then(data => {
        if(data.error) {
          setError(data.error)
        } else {
          setProductsBySell(data);
        }
      });
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt')
      .then(data => {
        if(data.error) {
          setError(data.error)
        } else {
          setProductsByArrival(data);
        }
      });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  return (
    <div>
      <Layout title='Home page' description='Node react e-commerce app' className='container-fluid'>
        <Search />
        <h2 className="mb-4">Finest E-Bookshop</h2>
        <div className="row">
            {productsBySell.map((product, idx)=> {
              return (
                <div key={idx} className='col-4 mb-3'>
                  <Card product={product} />
                </div>
              )
            })}
        </div>

        <div className="row">
          <h2 className="mb-4">New Arrival in the E-Bookshop</h2>
          {productsByArrival.map((product, idx)=> {
            return (
              <div key={idx} className='col-4 mb-3'>
                <Card product={product} />
              </div>
            )
          })}
        </div>
      </Layout>
    </div>
  )
};

export default Home;