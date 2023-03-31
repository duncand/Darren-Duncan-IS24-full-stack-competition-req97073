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

const EMPTY_PRODUCT = {
  "productNumber": "",
  "productName": "",
  "scrumMasterName": "",
  "productOwnerName": "",
  "developerNames": [],
  "startDate": "",
  "methodology": ""
};

interface Product {
  productNumber: string;
  productName: string;
  scrumMasterName: string;
  productOwnerName: string;
  developerNames: Array<string>;
  startDate: string;
  methodology: string;
}

interface ProductProps {
  product: Product;
}

interface ProductsProps {
  products: Array<Product>;
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

function ProductEditForm({ product }: ProductProps) {
  return (
    <>
      <h2>Edit a product</h2>
      <p><Link to={'/'}>Return</Link> to the product listing page.</p>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Product Number:</td>
              <td><input
                type="text"
                id="productNumber"
                name="productNumber"
                value={product.productNumber}
                /></td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td><input
                type="text"
                id="productName"
                name="productName"
                value={product.productName}
                /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  )
}

function ViewAllProductsPage() {
  const [products, assignToProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {
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

function CreateOneProductPage() {
  return (
    <ProductCreateForm />
  );
}

function EditOneProductPage() {
  const [productE, assignToProductE] = useState(EMPTY_PRODUCT);
  const { productNumber } = useParams();
  useEffect(() => {
    fetch('http://localhost:3000/api/products/'+productNumber)
      .then((response) => response.json())
      .then((data) => {
        assignToProductE(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <ProductEditForm product={productE} />
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
