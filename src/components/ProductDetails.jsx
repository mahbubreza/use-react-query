import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retreiveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  //console.log(response);
  return response.data;
};

export default function ProductDetails({ id }) {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retreiveProduct,
  });
  //console.log(product, error, isLoading);

  if (isLoading) return <div>Fetching Products....</div>;
  if (error) return <div>An error occured: {error.message}</div>;
  return (
    <div className="w-1/5">
      <h1 className="text-3xl my-2">Product Details</h1>
      <div className="border rounded flex flex-col text-md p-1 bg-gray-100">
        <img
          className="h-24 w-24 rounded-full m-auto border object-cover"
          src={product.thumbnail}
          alt={product.title}
        />
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.rating}/5 </p>
      </div>
    </div>
  );
}
