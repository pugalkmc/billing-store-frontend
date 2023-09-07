import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (

    <div className="container mt-4">
      <div className="row">
      <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">New Sale</h5>
              <p className="card-text">Go to billing page</p>
              <Link to="/sale/add" className="btn btn-primary">
                New Billing
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">New Product</h5>
              <p className="card-text">Add new product for the stock</p>
              <Link to="/product/add" className="btn btn-primary">
                Add stock
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">All Products</h5>
              <p className="card-text">View and manage all products.</p>
              <Link to="/product" className="btn btn-primary">
                Go to Products
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Analytics</h5>
              <p className="card-text">Analyze sales data and trends.</p>
              <Link to="/analytics" className="btn btn-primary">
                Go to Analytics
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">All Sales</h5>
              <p className="card-text">Track and manage all sales.</p>
              <Link to="/sale" className="btn btn-primary">
                Go to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
