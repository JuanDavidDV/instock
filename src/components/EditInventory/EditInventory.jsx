import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditInventory.scss";

const EditInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "",
    warehouse: "",
  });

  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`/api/inventory/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching item data", error);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await axios.get("/api/warehouses");
        if (Array.isArray(response.data)) {
          setWarehouses(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchItemData();
    fetchWarehouses();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.put(`/api/inventory/${id}`, formData);
        if (response.status === 200) {
          setSuccessMessage("Item updated successfully!");
          navigate("/inventory");
        }
      } catch (error) {
        setErrors({ submit: "Error updating inventory item." });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.item_name) newErrors.item_name = "Item name is required";
    if (!data.description) newErrors.description = "Description is required";
    if (!data.category) newErrors.category = "Category is required";
    if (data.status === "In Stock" && !data.quantity)
      newErrors.quantity = "Quantity is required";
    if (!data.warehouse) newErrors.warehouse = "Warehouse is required";
    return newErrors;
  };

  return (
    <form className="inventory-form2" onSubmit={handleSubmit}>
      <div className="inventory-form2__header">
        <img
          src="/src/assets/icons/arrow_back-24px.svg"
          alt="Go back"
          className="inventory-form2__icon"
        />
        <h2 className="inventory-form2__title">Edit Inventory Item</h2>
      </div>

      <section className="inventory-form2__info">
        <div className="inventory-form2__section1">
          <h2>Item Details</h2>
          <label className="inventory-form2__label">
            <h3 className="inventory-form2__label-text">Item Name</h3>
            <input
              placeholder="Item Name"
              type="text"
              className="inventory-form2__input"
              value={formData.item_name}
              onChange={(e) =>
                setFormData({ ...formData, item_name: e.target.value })
              }
            />
            {errors.item_name && (
              <p className="inventory-form2__error">{errors.item_name}</p>
            )}
          </label>

          <label className="inventory-form2__label">
            <h3 className="inventory-form2__label-text">Description</h3>
            <textarea
              placeholder="Please enter a brief item description..."
              className="inventory-form2__input"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="inventory-form2__error">{errors.description}</p>
            )}
          </label>

          <label className="inventory-form2__label">
            <h3 className="inventory-form2__label-text">Category</h3>
            <select
              className="inventory-form2__input"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Please select</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="inventory-form2__error">{errors.category}</p>
            )}
          </label>
        </div>

        <div className="inventory-form2__section2">
          <h2>Item Availability</h2>
          <label className="inventory-form2__label">
            <h3 className="inventory-form2__label-text">Status</h3>
            <div className="inventory-form2__status-options">
              <label>
                <input
                  type="radio"
                  value="In Stock"
                  checked={formData.status === "In Stock"}
                  onChange={() =>
                    setFormData({ ...formData, status: "In Stock" })
                  }
                />
                In Stock
              </label>
              <label>
                <input
                  type="radio"
                  value="Out of Stock"
                  checked={formData.status === "Out of Stock"}
                  onChange={() =>
                    setFormData({ ...formData, status: "Out of Stock" })
                  }
                />
                Out of Stock
              </label>
            </div>
          </label>

          {formData.status === "In Stock" && (
            <label className="inventory-form2__label">
              <h3 className="inventory-form2__label-text">Quantity</h3>
              <input
                type="number"
                className="inventory-form2__input"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
              {errors.quantity && (
                <p className="inventory-form2__error">{errors.quantity}</p>
              )}
            </label>
          )}

          <label className="inventory-form2__label">
            <h3 className="inventory-form2__label-text">Warehouse</h3>
            <select
              className="inventory-form2__input"
              value={formData.warehouse}
              onChange={(e) =>
                setFormData({ ...formData, warehouse: e.target.value })
              }
            >
              <option value="">Please select</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.warehouse_name}
                </option>
              ))}
            </select>
            {errors.warehouse && (
              <p className="inventory-form2__error">{errors.warehouse}</p>
            )}
          </label>
        </div>
      </section>

      <div className="inventory-form2__actions">
        {errors.submit && (
          <p className="inventory-form2__error">{errors.submit}</p>
        )}
        {successMessage && (
          <p className="inventory-form2__success">{successMessage}</p>
        )}
        <button
          type="button"
          className="inventory-form2__button inventory-form2__button--cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inventory-form2__button inventory-form2__button--submit"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditInventory;
