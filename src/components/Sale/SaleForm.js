import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import datas from "../../common";

const SaleForm = () => {
  const [formData, setFormData] = useState({
    customerNumber: "",
    customerName: "",
    products: [],
    selectedProduct: null,
    quantity: 1,
    totalPrice: 0,
    billingProducts: [],
  });

  const { id: saleId } = useParams();

  // Fetch products from the server using the /product API
  useEffect(() => {
    // Replace this with your actual API fetch logic
    fetch(`${datas.domain}/product`)
      .then((response) => response.json())
      .then((data) =>
        setFormData((prevData) => ({ ...prevData, products: data }))
      )
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle product selection
  const handleProductSelect = (productId) => {
    const selected = formData.products.find(
      (product) => product.productId === productId
    );
    setFormData((prevData) => ({ ...prevData, selectedProduct: selected }));
  };

  // Handle quantity change
  // const handleQuantityChange = (event) => {
  //   const value = event.target.value;
  //   setFormData((prevData) => ({ ...prevData, quantity: value }));
  // };

  // Handle adding a product to the bill
  const handleAddToBill = () => {
    // Check if the product is already in the billing products
    const existingProductIndex = formData.billingProducts.findIndex(
      (product) => product.productId === formData.selectedProduct.productId
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the billing products, update the quantity
      const updatedBillingProducts = [...formData.billingProducts];
      updatedBillingProducts[existingProductIndex].quantity = formData.quantity;
      updatedBillingProducts[existingProductIndex].totalPrice =
        updatedBillingProducts[existingProductIndex].salesPrice *
        formData.quantity;

      setFormData((prevData) => ({
        ...prevData,
        billingProducts: updatedBillingProducts,
      }));
    } else {
      // Otherwise, add the product to the billing products list
      const productTotalPrice =
        formData.selectedProduct.salesPrice * formData.quantity;
      setFormData((prevData) => ({
        ...prevData,
        billingProducts: [
          ...prevData.billingProducts,
          {
            ...prevData.selectedProduct,
            quantity: formData.quantity,
            totalPrice: productTotalPrice,
          },
        ],
      }));
    }

    // Reset the selected product and quantity
    setFormData((prevData) => ({
      ...prevData,
      selectedProduct: null,
      quantity: 1,
    }));
  };

  const handleCompleteSale = async (e) => {
    e.preventDefault();
    const requestMethod = saleId ? "PUT" : "POST";
    const url = saleId ? `/sale/${saleId}` : "/sale";

    const requestFormData = {
      // Add the relevant form data here
    };

    try {
      const response = await fetch(`${datas.domain}` + url, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      });

      if (response.ok) {
        console.log("Product saved successfully");
        alert("Product updated!");
        setFormData({
          customerNumber: "",
          customerName: "",
          products: [],
          selectedProduct: null,
          quantity: 1,
          totalPrice: 0,
          billingProducts: [],
        });
      } else {
        console.error("Product save failed");
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Calculate the total price for billing products
  useEffect(() => {
    const totalPrice = formData.billingProducts.reduce(
      (accumulator, product) => accumulator + product.totalPrice,
      0
    );
    setFormData((prevData) => ({ ...prevData, totalPrice: totalPrice }));
  }, [formData.billingProducts]);

  return (
    <div className="container" style={{ margin: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ marginBottom: '20px', color: 'navy' }}>Billing</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="customerNumber">Customer Number</label>
            <input
              type="text"
              className="form-control"
              id="customerNumber"
              placeholder="Enter customer number"
              value={formData.customerNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customerNumber: e.target.value,
                })
              }
              style={{ margin: '10px 0', padding: '10px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              placeholder="Enter customer Name"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customerName: e.target.value,
                })
              }
              style={{ margin: '10px 0', padding: '10px' }}
            />
          </div>
          <h2 style={{ marginTop: '20px', color: 'navy' }}>Available Products</h2>
          <ul className="list-group" style={{ padding: '10px' }}>
            {formData.products.length > 0 ? (
              formData.products.map((product) => (
                <li
                  key={product.productId}
                  className={`list-group-item ${
                    formData.selectedProduct?.productId === product.productId
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleProductSelect(product.productId)}
                  style={{ cursor: "pointer", margin: '5px 0', padding: '5px' }}
                >
                  {product.name}
                </li>
              ))
            ) : (
              <li className="list-group-item">No products found</li>
            )}
          </ul>
        </div>
        <div className="col-md-6">
          {formData.selectedProduct ? (
            <div>
              <h2 style={{ color: 'navy' }}>Selected Product</h2>
              <p>Name: {formData.selectedProduct.name}</p>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: e.target.value,
                    })
                  }
                  style={{ margin: '10px 0', padding: '10px' }}
                />
              </div>
              <button className="btn btn-primary" onClick={handleAddToBill} style={{ margin: '10px 0' }}>
                Add to Bill
              </button>
            </div>
          ) : (
            <div>
              <h2 style={{ color: 'navy' }}>Selected Product</h2>
              <p>Nothing selected</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h2 style={{ color: 'navy' }}>Billing Products</h2>
        <table className="table" style={{ margin: '10px 0', padding: '10px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {formData.billingProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.salesPrice}/-</td>
                <td>{product.totalPrice}/-</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4 className="mt-3" style={{ color: 'green' }}>
          Total Price: {formData.totalPrice.toFixed(2)}/-
        </h4>
        <button className="btn btn-success mt-2" onClick={handleCompleteSale} style={{ margin: '10px 0' }}>
          Complete Sale
        </button>
      </div>
    </div>
  );
}  

export default SaleForm;
