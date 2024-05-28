import axios from "axios";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

const retreiveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
  );

  return response.data;
};

export default function ProductList({ onDetailsPost }) {
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retreiveProducts,
    refetchInterval: 1000,
  });
  function handleDelete(productId) {
    const response = axios.delete(
      `http://localhost:3000/products/${productId}`
    );
    console.log(response.data);
  }

  if (isLoading) return <div>Fetching Products....</div>;
  if (error) return <div>An error occured: {error.message}</div>;
  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>

      <ul className="flex flex-wrap justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <li
              className="flex flex-col items-center m-2 border rounded-sm"
              key={product.id}
            >
              <img
                className="object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="flex">
                <p className="text-xl my-3">{product.title}</p>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-1 mx-1 border bg-red-500 cursor-pointer roundeds-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => onDetailsPost(product.id)}
                  className="p-1 mx-1 border bg-green-500 cursor-pointer roundeds-sm"
                >
                  Details
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex">
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100
            border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100
            border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
