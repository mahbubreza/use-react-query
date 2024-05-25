import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const retreiveProducts = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
  //console.log(response);
  return response.data;
};
const ProductList = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retreiveProducts,
    retry: false,
    staleTime: 5000,
  });
  //console.log(products);

  if (isLoading) return <div>Fetching Products....</div>;
  if (error) return <div>An error occured: {error.message}</div>;
  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>

      <ul className="flex flex-wrap justify-center items-center">
        {products &&
          products.map((product) => (
            <li
              className="flex flex-col items-center m-2 border rounded-sm"
              key={product.id}
            >
              <img
                className="object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />

              <p className="text-xl my-3">{product.title}</p>
            </li>
          ))}
      </ul>
      <img
        className="object-cover h-64 w-96 rounded-sm"
        src="https://cdn.dummyjson.com/product-images/19/thumbnail.jpg"
      />
      <h2>Hello</h2>
    </div>
  );
};
export default ProductList;
