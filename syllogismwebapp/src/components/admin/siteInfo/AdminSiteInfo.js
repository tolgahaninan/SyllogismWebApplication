import React, { Fragment } from "react";
import "../../../css/admin/admin.css";
import AdminSidebar from "../AdminCommon/AdminSidebar";
import AdminHeader from "../AdminCommon/AdminHeader";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import UseModal from "../../helper/UseModal";
import axios from "axios";
import { getSiteInfo } from "../../../redux/actions/adminActions";
import { Button, Label } from "reactstrap";
import KitchenSinkStory from "react-data-table-component";

function AdminSiteInfo({ siteInfo, getSiteInfo }) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [siteInfoInput, setSiteInfoInput] = useState({
    phone: "",
    email: "",
    locaiton: "",
    error_list:""
  });

  useEffect(() => {
    axios.get("api/authenticationCheck").then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
        getSiteInfo();
      }
      setLoading(false);
    });

    axios.interceptors.response.use(
      undefined,
      function axiosRetryInterceptor(error) {
        if (error.response.status === 401) {
          history.push("/401");
        }
        return Promise.reject(error);
      }
    );
    

  
    
    
  }, []);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 403) {
        //Access Denied
        history.push("/403");
      } else if (error.response.status === 404) {
        //Page Not Found
        history.push("/404");
      }
      return Promise.reject(error);
    }
  );

  const submitUpdate = (e) => {
    console.log(siteInfoInput)
    e.preventDefault();
    axios .put(`api/admin/siteinfo/update`, siteInfoInput)
    .then((res) => {
      if (res.data.status === "200") {
        window.location.reload();
      } else if (res.data.status === "422") {
        setSiteInfoInput({
          ...siteInfoInput,
          error_list: res.data.validation_errors,
        });
        console.log(res.data.validation_errors);
      } else if (res.data.status === "404") {
        history.push("/404");
      }
    });
    
  };

  const handleInput = (e) => {
    e.persist();
    setSiteInfoInput({ ...siteInfoInput, [e.target.name]: e.target.value });
  };

  if(loading){
    return null;
  }
  if (authenticated) {
    return (
      <Fragment>
        <AdminHeader></AdminHeader>
        <div class="row">
          <AdminSidebar></AdminSidebar>
          <div class="adminCrudWrapper">
            <form
              encType="multipart/form-data"
              onSubmit={submitUpdate}
              id="adminSiteInfoForm"
              class="adminSiteInfoForm"
            >
              
              
              <label class="adminSiteInfoSingleInfoLabel">Email</label>
              <input
                onChange={handleInput}
                class="adminSiteInfoSingleInfo"
                type="text"
                placeholder={siteInfo.info?siteInfo.info[0].email:null}
                name="email"
              />
              
              <label class="adminSiteInfoSingleInfoLabel">Location</label>
              <input
                onChange={handleInput}
                class="adminSiteInfoSingleInfo"
                type="text"
                placeholder={siteInfo.info?siteInfo.info[0].location:null}
                name="location"
              />
              
              <label class="adminSiteInfoSingleInfoLabel">Phone</label>
              <input
                onChange={handleInput}
                class="adminSiteInfoSingleInfo"
                type="text"
                placeholder={siteInfo.info?siteInfo.info[0].phone:null}
                name="phone"
              />
             

              <Button color="success" >Update</Button>
            </form>
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
    siteInfo: state.siteInfoReducer,
  };
}

const mapDispatchToProps = {
  getSiteInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSiteInfo);
