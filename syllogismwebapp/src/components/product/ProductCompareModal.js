import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../../css/productCompareModal.css";

function ProductCompareModal(props) {
  const {
    toggle,
    isShowing,
    comparedProducts,
    setComparedProducts,
    comparedProductLength,
    setComparedProductLength,
  } = props;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        toggle();
      }
    };

    if (isShowing) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isShowing, toggle]);

  if (!isShowing) {
    return null;
  }
  return (
    <div class="productCompareModalWrapperBackground">
      <div class="productCompareModalWrapper">
        {comparedProducts.map((comparedProduct) => (
          <div class="productCompareModalSingleItem">
            <img src={comparedProduct.image}></img>

            <table>
              <tr>
                <th>Features</th>
              </tr>
              <tr>
                <td>Brand:</td>
                <td>{comparedProduct.brand}</td>
              </tr>
              <tr>
                <td>Name :</td>
                <td>{comparedProduct.name}</td>
              </tr>
              <tr>
                <td>Description :</td>
                <td>{comparedProduct.description}</td>
              </tr>
              <tr>
                <td>Price :</td>
                <td>{comparedProduct.selling_price}</td>
              </tr>
              <tr>
                <td>Quantity :</td>
                <td>{comparedProduct.quantity}</td>
              </tr>
            </table>

          </div>
        ))}

        <button onClick={toggle} class="productCompareModalCloseButton">
          {" "}
          x{" "}
        </button>
      </div>
    </div>
  );
}

export default ProductCompareModal;
