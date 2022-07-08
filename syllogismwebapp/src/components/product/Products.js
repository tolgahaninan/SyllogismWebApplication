import React, { Fragment } from "react";
import Navi from "../common/Navi";
import Header from "../common/Header";
import "../../css/product.css";
import image from "../../assets/laptop.jpg";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getProductsByCategory } from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
import { useState } from "react";
function Products({ products, getProductsByCategory }) {
  let { category } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    getProductsByCategory(category);

  },[category]);

  useEffect(()=>{
    products.status?setLoading(false):setLoading(true);
  }, [products,loading]) 


  if (loading) {
    return "Loading";
  }
  return (
    <Fragment>
      <Header></Header>
      <Navi></Navi>
      <div class="productListGeneralWrapper">
         {products.product?.map((product) => (
          <Link id="linkstylesproduct" key={product.id} to={`/products/${product.id}` }>
          <div class="productListSingleProduct">
            <div class="productListSingleProductImageBackground">
              <img src={product.image} class="productListSingleProductImage"></img>
            </div>
            <div class="productListSingleProductBottomWrapper">
              <div class="productListSingleProductBottomWrapperProductInfo">
                <span class="productListSingleProductBottomWrapperProductName">
                  {product.name}
                </span>
                <span class="productListSingleProductBottomWrapperProductDescription">
                 {product.description}
                </span>
              </div>
              <span class="productListSingleProductBottomWrapperProductPrice">
              {product.selling_price} TL
              </span>
            </div>
          </div>
          </Link>
        ))}

 
     
      </div>
    </Fragment>
  );
}


function mapStateToProps(state) {
  return {
    products: state.productReducers,
  };
}

const mapDispatchToProps = {
  getProductsByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
