import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditInventory.scss";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";

const EditInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "IN STOCK",
    quantity: "",
    warehouse: "",
  });
  console.log(formData)
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/inventories/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching item data", error);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/warehouses`);
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
        const response = await axios.get(`${baseUrl}api/inventories`);
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
        const response = await axios.put(`${baseUrl}api/inventories/${id}`, {
          warehouse_id: formData.warehouse,
          item_name: formData.item_name,
          description: formData.description,
          category: formData.category,
          status: formData.status,
          quantity: formData.quantity,
        });
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
    if (data.status === "IN STOCK" && !data.quantity)
      newErrors.quantity = "Quantity is required";
    if (!data.warehouse) newErrors.warehouse = "Warehouse is required";
    return newErrors;
  };

  const returnToInventory = () => { return( navigate('/inventory') )}

  return (
    <form className="inventory-form2" onSubmit={handleSubmit}>
      <div className="inventory-form2__header">
        <img
          src={arrowBack}
          alt="Go back"
          className="inventory-form2__icon"
          onClick={returnToInventory}
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
                <option value={category.category}>
                  {category.category}
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
                  value="IN STOCK"
                  checked={formData.status === "IN STOCK"}
                  onChange={() =>
                    setFormData({ ...formData, status: "IN STOCK" })
                  }
                />
                In Stock
              </label>
              <label>
                <input
                  type="radio"
                  value="OUT OF STOCK"
                  checked={formData.status === "OUT OF STOCK"}
                  onChange={() =>
                    setFormData({ ...formData, status: "OUT OF STOCK" })
                  }
                />
                Out of Stock
              </label>
            </div>
          </label>

          {formData.status === "IN STOCK" && (
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
                setFormData({ ...formData, warehouse: parseInt(e.target.value) })
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
          onClick={returnToInventory}
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