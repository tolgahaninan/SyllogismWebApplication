import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { getRatesByProduct } from "../../redux/actions/rateActions";

function ProductRate({ rates, getRatesByProduct }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let { id } = useParams();

  const [rate, setRate] = useState({
    rate: "",
    product_id: "",
    user_id: "",
    error_list: [],
  });
  const rateOptions = {
    size: 30,
    onChange: (newValue) => {
      setRate({ ...rate, rate: newValue });
    },
  };

  useEffect(() => {
        getRatesByProduct(id);
  }, [id]);

  useEffect(()=>{
    setRate({ ...rate, product_id: id });
    rates.status?setLoading(false):setLoading(true);
  }, [rates,loading]) 

  const submitRate = (e) => {
    e.preventDefault();
    axios.post(`api/product/rate/create`, rate).then((res) => {
      if (res.data.status === "200") {
        window.location.reload();
      } else if (res.data.status === "400") {
        setRate({
          ...rate,
          error_list: res.data.validation_errors,
        });
        console.log(res.data.validation_errors);
      } else {
        setRate({
          ...rate,
          error_list: res.data.message,
        });
        console.log(res.data.message);
      }
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`api/product/rate/delete/${id}`, rate).then((res) => {
      if (res.data.status === "200") {
        window.location.reload();
      } else if (res.data.status === "404") {
        history.push("/404");
      }
    });
    setLoading(false)
  };
  if (loading) {
    return "Loading";
  }
  return (
    <div>
      {rates.rates ? (
        <ReactStars  size= {30} edit={false} value={rates.rates[0]?.rate} />
      ) : (
        <ReactStars {...rateOptions} />
      )}
      <div>
        {rates.rates ? (
          <Button onClick={(e) => handleDelete(e)} color="danger">
            {" "}
            UNRATE
          </Button>
        ) : (
          <Button onClick={(e) => submitRate(e)} color="success">
            {" "}
            RATE{" "}
          </Button>
        )}
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    rates: state.rateReducers,
  };
}

const mapDispatchToProps = {
  getRatesByProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRate);
