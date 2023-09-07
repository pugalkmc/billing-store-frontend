import React, { useEffect, useState } from 'react';
import datas from '../../common';

const SaleDetails = ({ match }) => {
  const [sale, setSale] = useState({});
  const saleId = match.params.id; // Extract the sale ID from the route params

  useEffect(() => {
    // Fetch sale details from your API using the sale ID
    async function fetchSaleDetails() {
      try {
        const response = await fetch(`${datas.domain}/sale/${saleId}`);
        if (response.ok) {
          const saleData = await response.json();
          setSale(saleData);
        } else {
          console.error('Failed to fetch sale details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchSaleDetails();
  }, [saleId]);

  return (
    <div className="sale-details">
      <h2>Sale Details</h2>
      <div>
        <strong>Customer Number:</strong> {sale.customerNumber}
      </div>
      <div>
        <strong>Sale ID:</strong> {sale.saleID}
      </div>
      <div>
        <strong>Date:</strong> {new Date(sale.date).toLocaleDateString()}
      </div>
      <div>
        <strong>Time:</strong> {sale.time}
      </div>
      <div>
        <strong>Products:</strong>
        <ul>
          {sale.products &&
            sale.products.map((product) => (
              <li key={product.productID}>
                Product ID: {product.productID}, Quantity: {product.quantity}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SaleDetails;
