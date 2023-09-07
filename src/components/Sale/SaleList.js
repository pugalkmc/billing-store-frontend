import React, { useEffect, useState } from 'react';
import '../Product/product.css'
import datas from '../../common';

const SaleList = ({ productId }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Fetch the list of sales from your API
    async function fetchSaleList() {
      try {
        const response = await fetch(`${datas.domain}/sale`);
        if (response.ok) {
          const saleList = await response.json();
          setSales(saleList);
        } else {
          console.error('Failed to fetch sale list');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchSaleList();
  }, []);

  // Filter sales based on the provided productId
  const filteredSales = productId
    ? sales.filter((sale) =>
        sale.products.some((product) => product.productID === productId)
      )
    : sales;

  return (
    <div className="sale-list">
      <h2>Sale List</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Number</th>
            <th>Sale ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.customerNumber}</td>
              <td>{sale.saleID}</td>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>{sale.time}</td>
              <td>
                <ul>
                  {sale.products.map((product) => (
                    <li key={product.productID}>
                      Product ID: {product.productID}, Quantity: {product.quantity}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleList;
