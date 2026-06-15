import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await API.get(
      `/products/${id}`
    );

    setProduct(res.data);
  };

  if (!product)
    return <h2>Loading...</h2>;

  return (
    <div>
      <img
        src={product.image}
        width="300"
      />

      <h1>{product.name}</h1>

      <h3>₹{product.price}</h3>

      <p>{product.description}</p>

      <h3>
        ⭐ {product.rating.toFixed(1)}
      </h3>

      <h4>
        Reviews ({product.numReviews})
      </h4>

      {product.reviews?.map((r) => (
        <div key={r._id}>
          <b>{r.userName}</b>
          <p>⭐ {r.rating}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;