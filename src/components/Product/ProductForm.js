import React, { useState, useEffect } from "react";
import datas from "../../common";

const ProductForm = ({ match }) => {
  const [formData, setFormData] = useState({
    category: "seed2",
    name: "",
    purchasedPrice: "",
    salesPrice: "",
    quantity: ""
  });

  
  
  const productId = null;

  useEffect(() => {
    if (productId) {
      async function fetchProductDetails() {
        try {
          const response = await fetch(`${datas.domain}/product/${productId}`);
          if (response.ok) {
            const productData = await response.json();
            setFormData(productData);
          } else {
            console.error("Failed to fetch product details");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }

      fetchProductDetails();
    }
  }, [productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestMethod = productId ? "PUT" : "POST";
    const url = productId ? `/product/${productId}` : "/product";

    try {
      const response = await fetch(`${datas.domain}`+url, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Product saved successfully");
        alert("Product updated!")
        setFormData({
          category: "seed",
          name: "",
          purchasedPrice: "",
          salesPrice: "",
          quantity: ""
        })
      } else {
        console.error("Product save failed");
        alert("Failed to add product")
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">
                {productId ? "Edit Product" : "Add Product"}
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={"Seed"}
                    onChange={handleChange}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="purchasedPrice">Purchased Price:</label>
                  <input
                    type="number"
                    id="purchasedPrice"
                    name="purchasedPrice"
                    min="1"
                    value={formData.purchasedPrice}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="salesPrice">Sales Price:</label>
                  <input
                    type="number"
                    id="salesPrice"
                    name="salesPrice"
                    min="1"
                    value={formData.salesPrice}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {productId ? "Update" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
