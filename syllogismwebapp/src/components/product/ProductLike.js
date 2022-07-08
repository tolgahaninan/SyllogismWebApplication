import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getLikesByProduct } from "../../redux/actions/likeActions";
import { useState } from "react";

function ProductLike({ likes, getLikesByProduct }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let { id } = useParams();

  const [like, setLike] = useState({
    like: true,
    product_id: "",
    user_id: "",
    error_list: [],
  });

  useEffect(() => {
    getLikesByProduct(id);
  }, [id]);

  useEffect(() => {
    setLike({ ...like, product_id: id });
    likes.status ? setLoading(false) : setLoading(true);
  }, [likes, loading]);

  const submitLike = (e) => {
    e.preventDefault();
    setLike({ ...like, like: true });

    axios.post(`api/product/like/create`, like).then((res) => {
      if (res.data.status === "200") {
        window.location.reload();
      } else if (res.data.status === "400") {
        setLike({
          ...like,
          error_list: res.data.validation_errors,
        });
        console.log(res.data.validation_errors);
      } else {
        setLike({
          ...like,
          error_list: res.data.message,
        });
        console.log(res.data.message);
      }
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`api/product/like/delete/${id}`, like).then((res) => {
      if (res.data.status === "200") {
        window.location.reload();
      } else if (res.data.status === "404") {
        history.push("/404");
      }
    });
  };
  if (loading) {
    return "Loading";
  }
  return (
    <div>
      {likes.likes ? (
        <Button onClick={(e) => handleDelete(e)} color="danger">
          {" "}
          UNLIKE
        </Button>
      ) : (
        <Button onClick={(e) => submitLike(e)} color="success">
          {" "}
          LIKE
        </Button>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    likes: state.likeReducers,
  };
}

const mapDispatchToProps = {
  getLikesByProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductLike);
