import React from 'react'
import Header from '../common/Header'
import { Fragment } from 'react'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProductsById } from '../../redux/actions/productActions';
import "../../css/productDetail.css";
import image from "../../assets/laptop.jpg";
import ProductComment from './ProductComment';
import ProductLike from './ProductLike';
import ProductRate from './ProductRate';
import { useState } from 'react';
import Navi from "../common/Navi"

function ProductDetail({ products, getProductsById }) {
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {

      getProductsById(id);
  
  },[id]);

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
      <div class="productDetailGeneralWrapper">
  
        <div class="productDetailProductWrapper">
          <div class="productDetailProductLeftWrapper">
            <img src ={products.product?products.product.image:null} class="productDetailProductImage">
            </img>
            <ProductComment productId={id}></ProductComment>
          </div>
         
          <div class="productDetailProductRightWrapper">
          <ProductLike></ProductLike>
          <ProductRate></ProductRate>
            <span class="productDetailProductBrand"> Brand : {products.product?products.product.brand:null}</span>
            <span class="productDetailProductName"> Name :  {products.product?products.product.name:null}</span>
            <span class="productDetailProductDescription">Description : {products.product?products.product.description:null}</span>
            <span class="productDetailProductSellingPrice"> Price : {products.product?products.product.selling_price:null} TL</span>
            <span class="productDetailProductQuantity">Quantity : {products.product?products.product.quantity:null}</span>
          <div class="productDetailProductFeatures">

          </div>
          </div>

        </div>


      </div>
  

    </Fragment>
  )
  
}


function mapStateToProps(state) {
  return {
    products: state.productReducers,
  };
}

const mapDispatchToProps = {
  getProductsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
