import React from "react";
import { useEffect } from "react";
import "../../../css/admin/adminModal.css";
import axios from "axios";
import { useHistory } from "react-router-dom";


function AdminCreateUpdateModal(props) {
  const {
    toggle,
    isShowing,
    data,
    state,
    type,
    updatedRow,
    operation,
    categories,
  } = props;
  const history = useHistory();
  const handleInput = (e) => {
    e.persist();
    /* if(e.target.name === 'image'){
      state({ ...data, [e.target.name]: e.target.files[0] });
     
    }else{*/
    state({ ...data, [e.target.name]: e.target.value });

    /*}*/
  };

  const submitModal = (e) => {
    e.preventDefault();

    /*const formData = new FormData();
      formData.append('image',data.image)
      formData.append('category_id',data.category_id)
      formData.append('slug',data.slug)
      formData.append('name',data.name)
      formData.append('description',data.description)
      formData.append('meta_title',data.meta_title)
      formData.append('meta_keyword',data.meta_keyword)
      formData.append('meta_description',data.meta_description)
      formData.append('selling_price',data.selling_price)
      formData.append('original_price',data.original_price)
      formData.append('quantity',data.quantity)
      formData.append('brand',data.brand)
    */

    if (operation === "create") {
      axios.post(`api/admin/${type}/${operation}`, data).then((res) => {
        if (res.data.status === "200") {
          window.location.reload();
          document.getElementById("adminCreateModalForm").reset();
          toggle();
        } else if (res.data.status === "400") {
          state({
            ...data,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    } else if (operation === "update") {
      axios
        .put(`api/admin/${type}/${operation}/${updatedRow.data.id}`, data)
        .then((res) => {
          if (res.data.status === "200") {
            window.location.reload();
            document.getElementById("adminCreateModalForm").reset();
            toggle();
          } else if (res.data.status === "422") {
            state({
              ...data,
              error_list: res.data.validation_errors,
            });
            console.log(res.data.validation_errors);
          } else if (res.data.status === "404") {
            history.push("/404");
          }
        });
    }
  };

  const handleData = (operation) => {
    if (operation === "update") {
      return updatedRow.data;
    } else if (operation === "create") {
      return data;
    }
  };

  

  const inputTypeHandler = (key) => {
    if (key === "status" || key === "featured" || key === "popular") {
      return "checkbox";
    } else if (key === "category_id") {
      return "selectbox";
    } /*else if (key==='image' ){
        return 'file'
      }*/ else {
      return "text";
    }
  };


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
  }, [isShowing, toggle, data]);

  if (!isShowing) {
    return null;
  }
  return (
    <div class="adminCreateModalWrapperBackground">
      <div class="adminCreateModalWrapper">
        <button onClick={toggle} class="adminCreateModalCloseButton">
          x
        </button>
        <form
          encType="multipart/form-data"
          onSubmit={submitModal}
          id="adminCreateModalForm"
          class="adminCreateModalForm"
        >
          {Object.entries(handleData(operation)).map(([key, val]) => {
            if (key === "category_id") {
              return (
                <select onChange={handleInput} key={key} name={key}  value={data.key} >
                  <option>Select Category</option>
                  {categories.map((categories) => (
                    <option  value={categories.id} key={categories.id}>
                      {categories.name}
                    </option>
                  ))}
                </select>
              );
            } else {
              return (
                <input
                  key={key}
                  name={key}
                  value={data.key}  
                  onChange={handleInput}
                  class="adminCreateModalFormSingleInput"
                  type={inputTypeHandler(key)}
                  placeholder={operation==="update" && val != null?val:key}
                />
              );
            }
          })}
          <button class="adminCreateModalFormCreateButton">{operation}</button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateUpdateModal;
