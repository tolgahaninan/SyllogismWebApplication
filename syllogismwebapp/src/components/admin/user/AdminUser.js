import React, { Fragment } from "react";
import "../../../css/admin/admin.css";
import KitchenSinkStory from "react-data-table-component";
import AdminSidebar from "../AdminCommon/AdminSidebar";
import AdminHeader from "../AdminCommon/AdminHeader";
import { connect } from "react-redux";
import { getUsers } from "../../../redux/actions/userActions";
import { useEffect, useState } from "react";
import initialState from "../../../redux/reducers/initialState";
import { Redirect , useHistory } from "react-router-dom";
import axios from "axios";
import { Button } from "reactstrap";
import UseModal from "../../helper/UseModal";
import AdminCreateUpdateModal from "../AdminCommon/AdminCreateUpdateModal";

function AdminUser({ users, getUsers }) {
  const history = useHistory();
  const [isShowingCreateUpdateModal, toggleCreateUpdateModal] = UseModal();
  const [selectedRow, setSelectedRow] = useState({});
  const [operation, setOperation] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password:"",
    authType:"",

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
    getUsers();

   

  }, []);

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

  const deleteUser = (e , data) =>{
    e.preventDefault();
    axios.delete(`api/admin/user/delete/${data.id}`, data).then((res) => {
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
      name: "name",
      selector: row => row.name,
    	sortable: true,
      wrap: true,
    },
    {
      name: "email",
      selector: row => row.email,
    	sortable: true,
      wrap: true,
    },
    {
      name: "password",
      selector: row => row.password,
    	sortable: true,
      wrap: true,
    },
    {
      name: "authType",
      selector: row => row.authType,
    	sortable: true,
      wrap: true,
    },
    {
      name: "email_verified_at",
      selector: row => row.email_verified_at,
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
      cell:row  => <Button onClick={e => deleteUser(e,row)} color="danger"> Delete </Button>,
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
        data={userInput}
        state={setUserInput}
        type='user'
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
                Users List - Data Table
              </span>
              <button onClick={handleCreate} class="AdminCrudWrapperCreateButton">
                {" "}
                Add New User
              </button>
            </div>

            <KitchenSinkStory
              data={users.users}
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
    users: state.userReducers,
  };
}

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
