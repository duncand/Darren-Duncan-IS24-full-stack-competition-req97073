import * as React from 'react';
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom';

import './App.css';

const PRODUCTS = [
  {
    "productNumber": "12345x",
    "productName": "The Project With No Name",
    "scrumMasterName": "John Doe",
    "productOwnerName": "Jane Doe",
    "developerNames": [
      "Larry",
      "Curly",
      "Moe"
    ],
    "startDate": "2023/03/31",
    "methodology": "Waterfall"
  },
  {
    "productNumber": "12345",
    "productName": "The Project With No Name",
    "scrumMasterName": "John Doe",
    "productOwnerName": "Jane Doe",
    "developerNames": [
      "Larry",
      "Curly",
      "Moe"
    ],
    "startDate": "2023/03/31",
    "methodology": "Waterfall"
  }
];

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
  const [x1, x2] = React.useState(3);
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
    <tr>
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
      {tableHeading}
      {tableRows}
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
  return (
    <ProductsTable products={PRODUCTS} />
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
