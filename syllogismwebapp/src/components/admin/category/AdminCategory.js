import React from "react";
import AdminSidebar from "../AdminCommon/AdminSidebar";
import AdminHeader from "../AdminCommon/AdminHeader";
import { Fragment } from "react";
import KitchenSinkStory from "react-data-table-component";
import { useState } from "react";
import axios from "axios";
import UseModal from "../../helper/UseModal";
import AdminCreateUpdateModal from "../AdminCommon/AdminCreateUpdateModal";
import { connect } from "react-redux";
import { getCategories } from "../../../redux/actions/categoryActions";
import { useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
function AdminCategory({ categories, getCategories }) {
  const history = useHistory();
  const [isShowingCreateUpdateModal, toggleCreateUpdateModal] = UseModal();
  const [selectedRow, setSelectedRow] = useState({});
  const [operation, setOperation] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [categoryInput, setCategory] = useState({
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    slug: "",
    name: "",
    description: "",
    status: "",
    featured: "",
    image: "",
    error_list: "",
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
  const deleteCategory = (e , data) =>{
    e.preventDefault();
    axios.delete(`api/admin/category/delete/${data.id}`, data).then((res) => {
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
      name: "status",
      selector: row => row.status,
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
      name: "image",
      selector: row => row.image,
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
      cell:row  => <Button onClick={e => deleteCategory(e,row)} color="danger"> Delete </Button>,
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
        data={categoryInput}
        state={setCategory}
        type='category'
        operation={operation}
        updatedRow={selectedRow}
        
      ></AdminCreateUpdateModal>
      <AdminHeader></AdminHeader>
      <div class="row">
        <AdminSidebar></AdminSidebar>
        <div class="adminCrudWrapper">
          <div class="adminCrudWrapperTableInfoWrapper">
            <i class="fa fa-list fa-2x" aria-hidden="true"></i>
            <span class="adminCrudWrapperTableName">
              Categories List - Data Table
            </span>
            <button onClick={handleCreate} class="AdminCrudWrapperCreateButton">
              {" "}
              Add New Category
            </button>
          </div>
          <KitchenSinkStory
            data={categories.category}
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
} else {
  return <Redirect to="/"></Redirect>;
}
}

function mapStateToProps(state) {
  return {
    categories: state.categoryReducers,
  };
}

const mapDispatchToProps = {
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory);


