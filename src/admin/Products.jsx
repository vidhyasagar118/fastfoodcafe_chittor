import { useParams } from "react-router-dom";
import API from "../api";
import { useEffect, useState } from "react";
import "./Products.css";

const Products = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      category,
    }));

    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
const res = await API.get(
  `/products/category/${category}`
);

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async () => {
    try {
      await API.post(
  "/products/add",
  form
);

      alert("Product Added");

      setForm({
        name: "",
        description: "",
        image: "",
        price: "",
        category,
      });

      setShowForm(false);

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async () => {
    try {
await API.put(
  `/products/${editing}`,
  form
);

      alert("Product Updated");

      setEditing(null);

      setShowForm(false);

      setForm({
        name: "",
        description: "",
        image: "",
        price: "",
        category,
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
    await API.delete(
  `/products/${id}`
);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const updateDiscount = async (id) => {
    const discount = prompt(
      "Enter Discount %"
    );

    if (!discount) return;

    try {
     await API.put(
  `/products/discount/${id}`,
  {
    discount,
  }
);

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (item) => {
    setEditing(item._id);

    setForm({
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      category: item.category,
    });

    setShowForm(true);
  };

  return (
    <div className="products-page">
      <h1 className="products-title">
        {category} Products
      </h1>

      <button
        className="add-product-btn"
        onClick={() => {
          setEditing(null);

          setForm({
            name: "",
            description: "",
            image: "",
            price: "",
            category,
          });

          setShowForm(!showForm);
        }}
      >
        + Add Product
      </button>

      {showForm && (
        <div className="product-form">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <button
            onClick={
              editing
                ? updateProduct
                : addProduct
            }
          >
            {editing
              ? "Update Product"
              : "Save Product"}
          </button>
        </div>
      )}

      <div className="products-grid">
        {products.map((item) => {
          const finalPrice =
            item.price -
            (item.price *
              (item.discount || 0)) /
              100;

          return (
            <div
              key={item._id}
              className="product-card"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="product-content">
                <h3>{item.name}</h3>

                <p>
                  {item.description}
                </p>

                {item.discount > 0 ? (
                  <>
                    <p className="price-old">
                      ₹{item.price}
                    </p>

                    <p className="price-new">
                      ₹{finalPrice}
                    </p>

                    <span className="discount-tag">
                      {item.discount}% OFF
                    </span>
                  </>
                ) : (
                  <p className="price-new">
                    ₹{item.price}
                  </p>
                )}

                <div className="product-actions">
                  <button
                    className="discount-btn"
                    onClick={() =>
                      updateDiscount(
                        item._id
                      )
                    }
                  >
                    Discount
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      startEdit(item)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProduct(
                        item._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;