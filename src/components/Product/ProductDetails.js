import React, { useEffect, useState } from 'react';
import SaleList from '../Sale/SaleList';
import { useParams } from 'react-router-dom';
import datas from '../../common';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    // Fetch product details from your API using the product ID
    async function fetchProductDetails() {
      try {
        const response = await fetch(`${datas.domain}/product/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <div className="product-details">
        <h2>Product Details</h2>
        <div>
          <strong>Category:</strong> {product.category}
        </div>
        <div>
          <strong>Name:</strong> {product.name}
        </div>
        <div>
          <strong>Product ID:</strong> {product.productId}
        </div>
        <div>
          <strong>Date Added:</strong> {new Date(product.dateAdded).toLocaleDateString()}
        </div>
        <div>
          <strong>Purchased Price:</strong> {product.purchasedPrice}/-
        </div>
        <div>
          <strong>Sales Price:</strong> {product.salesPrice}/-
        </div>
        <div>
          <strong>Quantity:</strong> {product.quantity}
        </div>
      </div>

      <SaleList productId={productId} />
    </>
  );
};

export default ProductDetails;
