import { useState } from "react";
import "./App.css";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  const [id, setId] = useState(1);
  function handleProductDetails(id) {
    console.log(id);
    setId(id);
  }
  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList onDetailsPost={handleProductDetails} />
      <ProductDetails id={id} />
    </div>
  );
}

export default App;
