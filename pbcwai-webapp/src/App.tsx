import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

import './App.css';

// Note, for any uses of useEffect(), providing the second "optional" arg
// even if the empty array is necessary to avoid infinite useEffect() calls.

interface Product {
  productNumber: string;
  productName: string;
  scrumMasterName: string;
  productOwnerName: string;
  developerNames: Array<string>;
  startDate: string;
  methodology: string;
}

interface ProductsProps {
  products: Array<Product>;
}

interface ProductEditProps {
  productNumber: string;
  productName: string;
  assignTo_productName: (x: string) => void;
  scrumMasterName: string;
  assignTo_scrumMasterName: (x: string) => void;
  productOwnerName: string;
  assignTo_productOwnerName: (x: string) => void;
  developerNames_1: string;
  assignTo_developerNames_1: (x: string) => void;
  developerNames_2: string;
  assignTo_developerNames_2: (x: string) => void;
  developerNames_3: string;
  assignTo_developerNames_3: (x: string) => void;
  developerNames_4: string;
  assignTo_developerNames_4: (x: string) => void;
  developerNames_5: string;
  assignTo_developerNames_5: (x: string) => void;
  startDate: string;
  assignTo_startDate: (x: string) => void;
  methodology: string;
  assignTo_methodology: (x: string) => void;
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
    <>
      <p>Total of {products.length} products displayed.</p>
      <p><Link to={'/create'}>Add</Link> a new product.</p>
      <table>
        <thead>
          {tableHeading}
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </>
  )
}

function ProductCreateForm() {
  return (
    <>
      <h2>Add a product</h2>
      <p><Link to={'/'}>Return</Link> to the product listing page.</p>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Product Name:</td>
              <td><input
                type="text"
                id="productName"
                name="productName"
                /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  )
}

function ProductEditForm({
      productNumber,
      productName,
      assignTo_productName,
      scrumMasterName,
      assignTo_scrumMasterName,
      productOwnerName,
      assignTo_productOwnerName,
      developerNames_1,
      assignTo_developerNames_1,
      developerNames_2,
      assignTo_developerNames_2,
      developerNames_3,
      assignTo_developerNames_3,
      developerNames_4,
      assignTo_developerNames_4,
      developerNames_5,
      assignTo_developerNames_5,
      startDate,
      assignTo_startDate,
      methodology,
      assignTo_methodology,
    }: ProductEditProps) {
  return (
    <>
      <h2>Edit a product</h2>
      <p><Link to={'/'}>Return</Link> to the product listing page.</p>
      <form onSubmit={handleProductEditFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Product Number:</td>
              <td><input
                type="text"
                id="productNumber"
                name="productNumber"
                value={productNumber}
                readOnly
                /></td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td><input
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => assignTo_productName(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Scrum Master:</td>
              <td><input
                type="text"
                id="scrumMasterName"
                name="scrumMasterName"
                value={scrumMasterName}
                onChange={(e) => assignTo_scrumMasterName(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Product Owner:</td>
              <td><input
                type="text"
                id="productOwnerName"
                name="productOwnerName"
                value={productOwnerName}
                onChange={(e) => assignTo_productOwnerName(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Developer Name 1:</td>
              <td><input
                type="text"
                id="developerNames_1"
                name="developerNames_1"
                value={developerNames_1}
                onChange={(e) => assignTo_developerNames_1(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Developer Name 2:</td>
              <td><input
                type="text"
                id="developerNames_2"
                name="developerNames_2"
                value={developerNames_2}
                onChange={(e) => assignTo_developerNames_2(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Developer Name 3:</td>
              <td><input
                type="text"
                id="developerNames_3"
                name="developerNames_3"
                value={developerNames_3}
                onChange={(e) => assignTo_developerNames_3(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Developer Name 4:</td>
              <td><input
                type="text"
                id="developerNames_4"
                name="developerNames_4"
                value={developerNames_4}
                onChange={(e) => assignTo_developerNames_4(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Developer Name 5:</td>
              <td><input
                type="text"
                id="developerNames_5"
                name="developerNames_5"
                value={developerNames_5}
                onChange={(e) => assignTo_developerNames_5(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Start Date:</td>
              <td><input
                type="text"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => assignTo_startDate(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Methodology:</td>
              <td><input
                type="text"
                id="methodology"
                name="methodology"
                value={methodology}
                onChange={(e) => assignTo_methodology(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">Save Changes</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  )
}

function ViewAllProductsPage() {
  const [products, assignTo_products] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {
        assignTo_products(data);
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

function CreateOneProductPage() {
  return (
    <ProductCreateForm />
  );
}

function EditOneProductPage() {
  const { productNumber } = useParams();
  const [productName, assignTo_productName] = useState('');
  const [scrumMasterName, assignTo_scrumMasterName] = useState('');
  const [productOwnerName, assignTo_productOwnerName] = useState('');
  const [developerNames_1, assignTo_developerNames_1] = useState('');
  const [developerNames_2, assignTo_developerNames_2] = useState('');
  const [developerNames_3, assignTo_developerNames_3] = useState('');
  const [developerNames_4, assignTo_developerNames_4] = useState('');
  const [developerNames_5, assignTo_developerNames_5] = useState('');
  const [startDate, assignTo_startDate] = useState('');
  const [methodology, assignTo_methodology] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/products/'+productNumber)
      .then((response) => response.json())
      .then((data) => {
        assignTo_productName(data.productName);
        assignTo_scrumMasterName(data.scrumMasterName);
        assignTo_productOwnerName(data.productOwnerName);
        assignTo_developerNames_1(data.developerNames.at(0) ?? '');
        assignTo_developerNames_2(data.developerNames.at(1) ?? '');
        assignTo_developerNames_3(data.developerNames.at(2) ?? '');
        assignTo_developerNames_4(data.developerNames.at(3) ?? '');
        assignTo_developerNames_5(data.developerNames.at(4) ?? '');
        assignTo_startDate(data.startDate);
        assignTo_methodology(data.methodology);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <ProductEditForm
      productNumber={productNumber ?? ''}
      productName={productName ?? ''}
      assignTo_productName={assignTo_productName}
      scrumMasterName={scrumMasterName ?? ''}
      assignTo_scrumMasterName={assignTo_scrumMasterName}
      productOwnerName={productOwnerName ?? ''}
      assignTo_productOwnerName={assignTo_productOwnerName}
      developerNames_1={developerNames_1 ?? ''}
      assignTo_developerNames_1={assignTo_developerNames_1}
      developerNames_2={developerNames_2 ?? ''}
      assignTo_developerNames_2={assignTo_developerNames_2}
      developerNames_3={developerNames_3 ?? ''}
      assignTo_developerNames_3={assignTo_developerNames_3}
      developerNames_4={developerNames_4 ?? ''}
      assignTo_developerNames_4={assignTo_developerNames_4}
      developerNames_5={developerNames_5 ?? ''}
      assignTo_developerNames_5={assignTo_developerNames_5}
      startDate={startDate ?? ''}
      assignTo_startDate={assignTo_startDate}
      methodology={methodology ?? ''}
      assignTo_methodology={assignTo_methodology}
    />
  );
}

function handleProductEditFormSubmit(e: React.FormEvent) {
  e.preventDefault();
  console.log('save button clicked');
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
