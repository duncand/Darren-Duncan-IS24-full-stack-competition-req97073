import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom';

import './App.css';

interface ProductProps {
  productNumber: string;
  productName: string;
  scrumMasterName: string;
  productOwnerName: string;
  developerNames: Array<string>;
  startDate: string;
  methodology: string;
}

interface ProductsProps {
  products: Array<ProductProps>;
}

function ProductsTable({ products }: ProductsProps) {
  const tableHeading = (
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th>Product Number</th>
      <th>Product Name</th>
      <th>Scrum Master</th>
      <th>Product Owner</th>
      <th>Developer Names</th>
      <th>Start Date</th>
      <th>Methodology</th>
    </tr>
  );
  const tableRows = products.map((product) =>
    <tr key={product.productNumber}>
      <td><Link to={'/view/' + product.productNumber}>View</Link></td>
      <td><Link to={'/edit/' + product.productNumber}>Edit</Link></td>
      <td><Link to={'/delete/' + product.productNumber}>Delete</Link></td>
      <td>{product.productNumber}</td>
      <td>{product.productName}</td>
      <td>{product.scrumMasterName}</td>
      <td>{product.productOwnerName}</td>
      <td>{product.developerNames.join(', ')}</td>
      <td>{product.startDate}</td>
      <td>{product.methodology}</td>
    </tr>
  );
  return (
    <table>
      <thead>
        {tableHeading}
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

function CreateOneProductPage() {
  return (
    <>
    create one product
    </>
  );
}

function ViewAllProductsPage() {
  const [products, assignToProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        assignToProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <ProductsTable products={products} />
  );
}

function ViewOneProductPage() {
  return (
    <>
    view one product
    </>
  );
}

function EditOneProductPage() {
  return (
    <>
    edit one product
    </>
  );
}

function DeleteOneProductPage() {
  return (
    <>
    delete one product
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <h1>Province of British Columbia - Web Application Inventory (PBCWAI)</h1>

      <Routes>
        <Route path="/create" element={<CreateOneProductPage />} />
        <Route path="/" element={<ViewAllProductsPage />} />
        <Route path="/view/:productNumber" element={<ViewOneProductPage />} />
        <Route path="/edit/:productNumber" element={<EditOneProductPage />} />
        <Route path="/delete/:productNumber" element={<DeleteOneProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
