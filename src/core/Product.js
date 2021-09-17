import React, { useEffect, useState } from 'react';
import { getSingleProduct, listRelated } from './ApiCore';
import Card from './Card';
import Layout from './Layout';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProduct = (productId) => {
    getSingleProduct(productId)
      .then(data  => {
        if (data.error) {
          console.log(data.error)
        } else {
          setProduct(data);
          // fetch related products
          listRelated(data._id)
            .then(data => {
              if (data.error) {
                console.log(data.error)
              } else {
                setRelatedProducts(data)
              }
            })
        }
      })
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadProduct(productId);
  }, [props]);
  return (
    <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)}>
      <div className="products">
        <div className='main'>
          {product && product.description && <Card product={product} showViewProductButton={false} />}
        </div>
        <div className='similar-products'>
          <h4>Similar products</h4>
          {relatedProducts.map((product, idx) => {
            return (
              <div className='mb-3' key={idx}>
                <Card product={product} showViewProductButton={true} />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
};

export default Product;