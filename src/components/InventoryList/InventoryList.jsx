import { Link } from "react-router-dom";
import { useState } from "react";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import editBlue from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import sortDefault from "../../assets/icons/sort-24px.svg";
import searchIcon from "../../assets/icons/search-24px.svg";
import DeleteInventory from "../DeleteInventory/DeleteInventory";
import "./InventoryList.scss";

const InventoryList = ({
  inventoryDetails,
  sorting,
  searching,
  searchingIcon,
}) => {
  const [itemName, setItemName] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const deleteItem = (event) => {
    setItemName(event.target.parentElement.id);
    setDeleteId(event.target.id);
    var deletePopup = document.getElementById("deleteInventoryModal");
    deletePopup.style.display = "block";
  };

  return (
    <>
      <DeleteInventory itemName={itemName} id={deleteId} />

      <section className="inventory-list">
        <div className="inventory-list__container">
          <div className="inventory-list__container__top">
            <div className="inventory-list__container__top__box">
              <h1 className="inventory-list__container__top__box--title">
                Inventory
              </h1>
            </div>
            <div className="inventory-list__container__top__box-functionality">
              <div className="inventory-list__container__top__box-functionality--search-bar">
                <img
                  className="inventory-list__container__top__box-functionality--search-bar--icon"
                  src={searchIcon}
                  onClick={searchingIcon}
                />
                <input
                  onKeyDown={searching}
                  className="inventory-list__container__top__box-functionality--search-bar--input p2"
                  type="text"
                  name="search"
                  placeholder="Search..."
                />
              </div>
              <div className="inventory-list__container__top__box-functionality__bottom">
                <button className="inventory-list__container__top__box-functionality__bottom--add-item">
                  + Add New Item
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="inventory-list__wrapper-inventory__labels-tablet">
          {" "}
          {/*Div container exclusively for tablet and desktop only*/}
          <div className="inventory-list__wrapper-inventory__labels-tablet__container-one">
            <div className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--inventory">
              <h4 className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--header">
                INVENTORY ITEM
              </h4>
              <img
                id="item_name"
                className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--icon"
                src={sortDefault}
                onClick={sorting}
              />
            </div>
            <div className="inventory-list__wrapper-inventory__labels-tablet__container-one__box">
              <h4 className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--header">
                CATEGORY
              </h4>
              <img
                id="category"
                className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--icon"
                src={sortDefault}
                onClick={sorting}
              />
            </div>
            <div className="inventory-list__wrapper-inventory__labels-tablet__container-one__box">
              <h4 className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--header">
                STATUS
              </h4>
              <img
                id="status"
                className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--icon"
                src={sortDefault}
                onClick={sorting}
              />
            </div>
          </div>
          <div className="inventory-list__wrapper-inventory__labels-tablet__container-two">
            <div className="inventory-list__wrapper-inventory__labels-tablet__container-two__box--quantity">
              <h4 className="inventory-list__wrapper-inventory__labels-tablet__container-two__box--header">
                QTY
              </h4>
              <img
                id="quantity"
                className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--icon"
                src={sortDefault}
                onClick={sorting}
              />
            </div>
            <div className="inventory-list__wrapper-inventory__labels-tablet__container-two__box--warehouse">
              <h4 className="inventory-list__wrapper-inventory__labels-tablet__container-two__box--header">
                WAREHOUSE
              </h4>
              <img
                id="warehouses.warehouse_name"
                className="inventory-list__wrapper-inventory__labels-tablet__container-one__box--icon"
                src={sortDefault}
                onClick={sorting}
              />
            </div>
            <div className="inventory-list__wrapper-inventory__labels-tablet__container-two__box--actions">
              <h4 className="inventory-list__wrapper-inventory__labels-tablet__container-two__box--header">
                ACTIONS
              </h4>
            </div>
          </div>
        </div>
        {inventoryDetails.map((inventoryList, index) => (
          <li
            className={`inventory-list__wrapper-inventory--${
              index === 0 ? "first-container" : "containers"
            }`}
            key={inventoryList.id}
          >
            <div className="inventory-list__wrapper-inventory__container">
              <div className="inventory-list__wrapper-inventory__container__top">
                <div className="inventory-list__wrapper-inventory__container__top--one">
                  <div className="inventory-list__wrapper-inventory__container__top--one--item">
                    <h4 className="inventory-list__wrapper-inventory__container__top--one--item--header">
                      INVENTORY ITEM
                    </h4>
                    <Link
                      className="inventory-list__wrapper-inventory__container__top--one--item--box"
                      to={`/inventory/${inventoryList.id}`}
                    >
                      <h3 className="inventory-list__wrapper-inventory__container__top--one--item--box--name">
                        {inventoryList.itemName}
                      </h3>
                      <img
                        className="inventory-list__wrapper-inventory__container__top--one--item--box--icon"
                        src={chevron}
                      />
                    </Link>
                  </div>
                  <div className="inventory-list__wrapper-inventory__container__top--one--category">
                    <h4 className="inventory-list__wrapper-inventory__container__top--one--category--header">
                      CATEGORY
                    </h4>
                    <p className="inventory-list__wrapper-inventory__container__top--one--category--text p2">
                      {inventoryList.category}
                    </p>
                  </div>
                  <div className="inventory-list__wrapper-inventory__container__top--one--status-box--tablet">
                    {" "}
                    {/*Div container exclusively for tablet and desktop only*/}
                    <h4
                      className={`inventory-list__wrapper-inventory__container__top--one--status-box--tablet--text${
                        inventoryList.status === "IN STOCK"
                          ? "--instock"
                          : "--outstock"
                      }`}
                    >
                      {inventoryList.status}
                    </h4>
                  </div>
                </div>
                <div className="inventory-list__wrapper-inventory__container__top--two">
                  <div className="inventory-list__wrapper-inventory__container__top--two--status">
                    <h4 className="inventory-list__wrapper-inventory__container__top--two--status--header">
                      STATUS
                    </h4>
                    <div className="inventory-list__wrapper-inventory__container__top--two--status--box">
                      <h4
                        className={`inventory-list__wrapper-inventory__container__top--two--status--box--text${
                          inventoryList.status === "IN STOCK"
                            ? "--instock"
                            : "--outstock"
                        }`}
                      >
                        {inventoryList.status}
                      </h4>
                    </div>
                  </div>
                  <div className="inventory-list__wrapper-inventory__container__top--two--quantity">
                    <h4 className="inventory-list__wrapper-inventory__container__top--two--quantity--header">
                      QTY
                    </h4>
                    <p className="inventory-list__wrapper-inventory__container__top--two--quantity--number p2">
                      {inventoryList.quantity}
                    </p>
                  </div>
                  <div className="inventory-list__wrapper-inventory__container__top--two--warehouse">
                    <h4 className="inventory-list__wrapper-inventory__container__top--two--warehouse--header">
                      WAREHOUSE
                    </h4>
                    <p className="inventory-list__wrapper-inventory__container__top--two--warehouse--name p2">
                      {inventoryList.warehouseName}
                    </p>
                  </div>
                  <div className="inventory-list__wrapper-inventory__container__top--two--actions-tablet">
                    {" "}
                    {/*Div container exclusively for tablet and desktop only*/}
                    <button
                      id={inventoryList.itemName}
                      type="button"
                      onClick={deleteItem}
                    >
                      <img id={inventoryList.id} src={deleteIcon} />
                    </button>
                    <img
                      className="inventory-list__wrapper-inventory__container__top--two--actions-tablet--icon"
                      src={editBlue}
                    />
                  </div>
                </div>
              </div>
              <div className="inventory-list__wrapper-inventory__container__bottom">
                <button
                  id={inventoryList.itemName}
                  type="button"
                  onClick={deleteItem}
                >
                  <img id={inventoryList.id} src={deleteIcon} />
                </button>
                <img src={editBlue} />
              </div>
            </div>
          </li>
        ))}
      </section>
    </>
  );
};

export default InventoryList;
