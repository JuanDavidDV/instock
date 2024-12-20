import { useNavigate } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editWhite from "../../assets/icons/edit-white-24px.svg";
import './WarehouseDetails.scss';

const WarehouseDetails = ({ warehouseID, warehouseName, warehouseAddress, warehouseCity, warehouseCountry, warehouseContactName, warehouseContactPosition, warehouseContactPhone, warehouseContactEmail }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

    const redirectToEdit = () => {
        navigate(`/warehouses/${warehouseID}/edit`)
    }

    return (
        <section className="warehouse-details">
            <div className="warehouse-details__container">
                <div className="warehouse-details__container__top">
                    <div className="warehouse-details__container__top__box">
                        <img className="warehouse-details__container__top__box--arrow" onClick={handleClick} src={arrowBack}/>
                        <h1 className="warehouse-details__container__top__box--title">{warehouseName}</h1>
                    </div>
                    <button className="warehouse-details__container__top__box-edit">
                        <img className="warehouse-details__container__top__box-edit--icon" src={editWhite} onClick={redirectToEdit}/>
                        <h3 className="warehouse-details__container__top__box-edit--text">Edit</h3>
                    </button>
                </div> 
            </div>
            <div className="warehouse-details__wrapper">
                <div className="warehouse-details__wrapper__container">
                    <div className="warehouse-details__wrapper__container__address">
                        <h4>WAREHOUSE ADDRESS:</h4>
                        <div className="warehouse-details__wrapper__container__address__text">
                        <p className="warehouse-details__wrapper__container__address--text--one p2">
                                {warehouseAddress}, 
                            </p>
                            <p className="warehouse-details__wrapper__container__address--text--two p2"> 
                                {warehouseCity}, {warehouseCountry}
                            </p>
                        </div>        
                    </div>                  
                    <div className="warehouse-details__wrapper__container__bottom">
                        <div className="warehouse-details__wrapper__container__bottom--name">
                            <h4>CONTACT NAME:</h4>
                            <p className="warehouse-details__wrapper__container__bottom--name--text p2">
                                {warehouseContactName} 
                                <br/>{warehouseContactPosition}
                            </p>
                        </div>
                        <div className="warehouse-details__wrapper__container__bottom--information">
                            <h4>CONTACT INFORMATION:</h4>
                            <p className="warehouse-details__wrapper__container__bottom--information--text p2">
                                {warehouseContactPhone}
                                <br/>{warehouseContactEmail}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WarehouseDetails;