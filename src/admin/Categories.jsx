import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";
import API from "../api";
const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get("/categories");

    setCategories(res.data);
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return;

  await API.post("/categories", {
  name: newCategory,
});

    setNewCategory("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
await API.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="categories-page">
      <h1>Manage Categories</h1>
<div className="category-input-box">
  <input
    type="text"
    placeholder="Category Name"
    value={newCategory}
    onChange={(e) =>
      setNewCategory(e.target.value)
    }
  />

  <button onClick={addCategory}>
    Add Category
  </button>
</div>

<div className="categories-list">
  {categories.map((cat) => (
    <div
      key={cat._id}
      className="category-card"
    >
      <h3>{cat.name}</h3>

      <div className="category-actions">
        <button
          className="manage-btn"
          onClick={() =>
            navigate(
              `/admin/products/${cat.name}`
            )
          }
        >
          Manage
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            deleteCategory(cat._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Categories;