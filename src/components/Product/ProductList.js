import React, { useEffect, useState } from "react";
import './product.css'
import datas from "../../common";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of products from your API
    async function fetchProductList() {
      try {
        const response = await fetch(`${datas.domain}/product`);
        if (response.ok) {
          const productList = await response.json();
          setProducts(productList);
        } else {
          console.error("Failed to fetch product list");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchProductList();
  }, []);

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <table className="centered-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Product ID</th>
            <th>Date Added</th>
            <th>Purchased Price</th>
            <th>Sales Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.category}</td>
              <td>{product.name}</td>
              <td>{product.productId}</td>
              <td>{new Date(product.dateAdded).toLocaleDateString()}</td>
              <td>{product.purchasedPrice}/-</td>
              <td>{product.salesPrice}/-</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
