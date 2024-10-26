import { url } from "../../utils/utils.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import searchSVG from "../../assets/icons/search-24px.svg";
import editSVG from "../../assets/icons/edit-24px.svg";
import deleteSVG from "../../assets/icons/delete_outline-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import DeleteWarehouse from "../DeleteWarehouse/DeleteWarehouse.jsx";
import "./WarehouseList.scss";

function WarehouseList({ add, edit }) {
  let [warehouses, setWarehouses] = useState([]);
  let [warehouseName, setWarehouseName] = useState("");
  let [deleteID, setDeleteID] = useState(0);
  const [searchKey, setSearchKey] = useState("");

  const deleteHandler = (e) => {
    setWarehouseName(e.target.parentElement.id);
    setDeleteID((deleteID = e.target.id));
    var popup = document.getElementById("deleteModal");
    popup.style.display = "block";
  };

  const searchKeyPress = (e) => {
    setSearchKey(e.target.value);
  };

  const searchClick = () => {
    var searchInput = document.getElementsByTagName("input")[0].value;
    setSearchKey(searchInput);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchKey) {
        await axios
          .get(`${url}/api/warehouses?s=${searchKey}`)
          .then((res) => {
            setWarehouses(res.data);
          })
          .then(() => {
            setSearchKey("");
          });
      }
    };
    fetchSearch();
  }, [searchKey]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      await axios.get(`${url}/api/warehouses`).then((res) => {
        setWarehouses((warehouses = res.data));
      });
    };
    fetchWarehouses();
  }, []);

  return (
    <>
      <DeleteWarehouse name={warehouseName} id={deleteID} />
      <section className="warehouses">
        <article className="warehouses__header">
          <h1>Warehouses</h1>
          <div className="warehouses__header__nav">
            <div className="warehouses__header__nav__search">
              <input
                onKeyDown={searchKeyPress}
                className="searching"
                type="text"
                name="search"
                placeholder="Search..."
              />
              <img
                className="searchIcon"
                src={searchSVG}
                onClick={searchClick}
              />
            </div>

            <button
              className="warehouses__header__nav__add"
              type="button"
              onClick={add}
            >
              + Add New Warehouse
            </button>
          </div>
        </article>

        <table className="warehouses__list">
          <thead>
            <tr>
              <th>
                WAREHOUSE
                <img id="sort" src={sort} />
              </th>
              <th>
                ADDRESS
                <img id="sort" src={sort} />
              </th>
              <th>
                CONTACT NAME
                <img id="sort" src={sort} />
              </th>
              <th>
                CONTACT INFORMATION
                <img id="sort" src={sort} />
              </th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          {warehouses.map((warehouse) => (
            <tbody key={warehouse.id}>
              <tr id={warehouse.id}>
                <td id={warehouse.id} className="table-rows">
                  <div id={warehouse.id} className="warehouses__list__rows">
                    <article className="warehouses__list__rows__top">
                      <div>
                        <h4 id="titles">WAREHOUSE</h4>
                        <Link to={`/warehouses/${warehouse.id}`} id="link">
                          {warehouse.warehouse_name}
                          <img className="chevron" src={chevron} />
                        </Link>
                      </div>
                      <div className="warehouses__list__rows__top__item">
                        <h4 id="titles">ADDRESS</h4>
                        <p id="text">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</p>
                      </div>
                    </article>
                    <article className="warehouses__list__rows__bottom">
                      <div className="warehouses__list__rows__bottom__address">
                        <h4 id="titles">CONTACT NAME</h4>
                        <p id="text">{warehouse.contact_name}</p>
                      </div>
                      <div className="warehouses__list__rows__bottom__contact">
                        <h4 id="titles">CONTACT INFORMATION</h4>
                        <p id="text">{warehouse.contact_phone}</p>
                        <p id="text">{warehouse.contact_email}</p>
                      </div>
                    </article>
                  </div>
                  <div className="warehouses__list__rows__buttons">
                    <button
                      id={warehouse.warehouse_name}
                      type="button"
                      onClick={deleteHandler}
                    >
                      <img id={warehouse.id} src={deleteSVG} />
                    </button>
                    <button id={warehouse.id} type="button" onClick={edit}>
                      <img src={editSVG} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </>
  );
}

export default WarehouseList;
