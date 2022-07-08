import React from "react";
import "../../../css/admin/admin.css";
import KitchenSinkStory from "react-data-table-component";
import AdminSidebar from "../AdminCommon/AdminSidebar";
import { Fragment } from "react";
import AdminHeader from "../AdminCommon/AdminHeader";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import UseModal from "../../helper/UseModal";
import { connect } from "react-redux";
import { getCategories } from "../../../redux/actions/categoryActions";
import { getProducts } from "../../../redux/actions/productActions";
import axios from "axios";
import { Button } from "reactstrap";
import AdminCreateUpdateModal from "../AdminCommon/AdminCreateUpdateModal";

 function AdminProduct({ categories , getCategories, products , getProducts } ) {
  const history = useHistory();
  const [isShowingCreateUpdateModal, toggleCreateUpdateModal] = UseModal();
  const [selectedRow, setSelectedRow] = useState({});
  const [operation, setOperation] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [productInput, setProduct] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    selling_price: "",
    original_price: "",
    quantity: "",
    brand: "",
    featured: "",
    popular: "",
    status: "",
    image:"",
  });


  useEffect(() => {
    axios.get("api/authenticationCheck").then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
      }
    setLoading(false);
    });

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(error){
      if(error.response.status === 401){
        history.push('/401');
      }
      return Promise.reject(error);
    })
    getProducts();
    getCategories();
    
    console.log(JSON.stringify(selectedRow));

  },[selectedRow])

  axios.interceptors.response.use(function(response){
    return response;
  }, function(error){
    if(error.response.status === 403){ //Access Denied
      history.push('/403');
    }
    else if (error.response.status === 404){ //Page Not Found
      history.push('/404');
    }
    return Promise.reject(error);
  })

  function handleUpdate (data) {
    setOperation('update')
    setSelectedRow({...selectedRow, data })
    toggleCreateUpdateModal();    
  }

 
  function handleCreate () {
    setOperation('create')
    toggleCreateUpdateModal();    
  }

  const deleteProduct = (e , data) =>{
    e.preventDefault();
    axios.delete(`api/admin/product/delete/${data.id}`, data).then((res) => {
      if (res.data.status === '200') {
        window.location.reload();
      } 
      else if (res.data.status === '404'){
        history.push("/404");
      }
    });
  }

  
  const columns = [
  {
      name: "id",
      selector: row => row.id,
    	sortable: true,
      wrap: true,
 
    },
    {
      name: "category_id",
      selector: row => row.category_id,
    	sortable: true,
      wrap: true,
    
    },
    {
      name: "meta_title",
      selector: row => row.meta_title,
    	sortable: true,
      wrap: true,
    
    },
    {
      name: "meta_keyword",
      selector: row => row.meta_keyword,
    	sortable: true,
      wrap: true,
    
    },
    {
      name: "meta_description",
      selector: row => row.meta_description,
    	sortable: true,
      wrap: true,
    },
    {
      name: "slug",
      selector: row => row.slug,
    	sortable: true,
      wrap: true,
    },
    {
      name: "name",
      selector: row => row.name,
    	sortable: true,
      wrap: true,
    },
    {
      name: "description",
      selector: row => row.description,
    	sortable: true,
      wrap: true,
    },
    {
      name: "brand",
      selector: row => row.brand,
    	sortable: true,
      wrap: true,
    },
    {
      name: "selling_price",
      selector: row => row.selling_price,
    	sortable: true,
      wrap: true,
    },
    {
      name: "original_price",
      selector: row => row.original_price,
    	sortable: true,
      wrap: true,
    },
    {
      name: "quantity",
      selector: row => row.quantity,
    	sortable: true,
      wrap: true,
    },
    {
      name: "image",
      selector: row => row.image,
    	sortable: true,
      wrap: true,
    },
    {
      name: "featured",
      selector: row => row.featured,
    	sortable: true,
      wrap: true,
    },
    {
      name: "popular",
      selector: row => row.popular,
    	sortable: true,
      wrap: true,
    },
    {
      name: "status",
      selector: row => row.status,
    	sortable: true,
      wrap: true,
    },
    {
      name: "created_at",
      selector: row => row.created_at,
    	sortable: true,
      wrap: true,
    },
    {
      name: "updated_at",
      selector: row => row.updated_at,
    	sortable: true,
      wrap: true,
    },
    {
      name: 'Update',
      button: true,
      ignoreRowClick: true,
      cell:row  => <Button color="success" onClick={e => handleUpdate(row)}>Update</Button>
      
    },
    {
      name: 'Delete',
      button: true,
      cell:row  => <Button onClick={e => deleteProduct(e,row)} color="danger"> Delete </Button>,
    },
  ];

  if(loading){
    return null;
  }
  if (authenticated) {
    return (
      <Fragment>
        <AdminCreateUpdateModal
       
       isShowing={isShowingCreateUpdateModal}
       toggle={toggleCreateUpdateModal}
       data={productInput}
       state={setProduct}
       type='product'
       operation={operation}
       updatedRow={selectedRow}
       categories={categories.category}
        
      ></AdminCreateUpdateModal>
        <AdminHeader></AdminHeader>
        <div class="row">
          <AdminSidebar></AdminSidebar>

          <div class="adminCrudWrapper">
            <div class="adminCrudWrapperTableInfoWrapper">
              <i class="fa fa-list fa-2x" aria-hidden="true"></i>
              <span class="adminCrudWrapperTableName">
                Product List - Data Table
              </span>
              <button onClick={handleCreate} class="AdminCrudWrapperCreateButton">
                {" "}
                Add New Product 
              </button>
            </div>

            <KitchenSinkStory
              data={products.products}
              columns={columns}
              direction="auto"
              fixedHeaderScrollHeight="300px"
              highlightOnHover
              pagination
              pointerOnHover
              responsive
              selectableRowsRadio="checkbox"
              striped
              subHeaderAlign="right"
              subHeaderWrap
            />
          </div>
        </div>
      </Fragment>
    );
  }
  else {
    return <Redirect to="/"></Redirect>
   }
}

function mapStateToProps(state) {
  return {
    categories: state.categoryReducers,
    products : state.productReducers,
  };
}

const mapDispatchToProps = {
  getCategories,
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);

