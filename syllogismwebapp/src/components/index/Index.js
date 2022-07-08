import React, { Fragment } from "react";
import IndexFeaturedCategories from "../index/IndexFeaturedCategories";
import IndexFeaturedProductsSlider from "../index/IndexFeaturedProductsSlider";
import Navi from "../common/Navi";
import Header from "../common/Header";
import "bootstrap/dist/css/bootstrap.css";
import UseModal from "../helper/UseModal";
import ProductCompareModal from "../product/ProductCompareModal";
import { Button } from "reactstrap";
import UseCompareModal from "../helper/UseCompareModal";
import { useEffect, useState } from "react";

function Index() {
  const [isShowingCompareModal, toggleCompareModal] = UseCompareModal();
  const [comparedProducts, setComparedProducts] = useState([]);
  const [comparedProductLength, setComparedProductLength] = useState(0);
 
 
  return (
    <div>
      <ProductCompareModal
        isShowing={isShowingCompareModal}
        toggle={toggleCompareModal}
        comparedProducts={comparedProducts}
        setComparedProducts={setComparedProducts}
        setComparedProductLength={setComparedProductLength}
        comparedProductLength={comparedProductLength}
      ></ProductCompareModal>
      <Header></Header>
      <Navi></Navi>
      <IndexFeaturedCategories></IndexFeaturedCategories>
      <IndexFeaturedProductsSlider
        comparedProducts={comparedProducts}
        setComparedProducts={setComparedProducts}
        isShowingCompareModal={isShowingCompareModal}
        toggleCompareModal={toggleCompareModal}
        setComparedProductLength={setComparedProductLength}
        comparedProductLength={comparedProductLength}
      ></IndexFeaturedProductsSlider>
    </div>
  );
}

export default Index;
