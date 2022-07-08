import React from "react";
import { useState } from "react";
import { getComments } from "../../redux/actions/commentActions";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ProductComment({ comments, getComments }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let { id } = useParams();

  
  const [comment, setComment] = useState({
    comment: '',
    product_id:'',
    user_id:'',
    error_list: [],
  });

  useEffect(() => {
   getComments(id);
  },[id]);

  useEffect(()=>{
    setComment({ ...comment, product_id: id });
    comments.status?setLoading(false):setLoading(true);
  }, [comments,loading]) 


  const submitComment = (e) => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then((response) => {
    axios.post(`api/product/comment/create`, comment).then((res) => {
        if (res.data.status === "200") {
          window.location.reload();
        } else if (res.data.status === "400") {
          setComment({
            ...comment,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }else {
            setComment({
                ...comment,
                error_list: res.data.message,
              });
              console.log(res.data.message);
        }
      });

  })};
  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`api/product/comment/delete/${id}`, comment).then((res) => {
      if (res.data.status === '200') {
        window.location.reload();
      } 
      else if (res.data.status === '404'){
        history.push("/404");
      }
    });
}


  const handleInput = (e) => {
    e.persist();
    setComment({ ...comment, [e.target.name]: e.target.value } )
  };

  if (loading) {
    return "Loading";
  }
  return (
    <div class="commentGeneralWrapper">
      <div class="commentCreateWrapper">
        <form
          encType="multipart/form-data"
          onSubmit={submitComment}
          id="commentCreateForm"
          class="commentCreateForm"
        >
        <textarea
                  name="comment"
                  onChange={handleInput}
                  class="commentCreateFormSingleInput"
                  type="text"
                  placeholder="Add Comment"
        />
        
        <Button color ="success"> Add Comment</Button>

        </form>
      </div>
      {comments.comments?.map((comment) => (
      <div key={comment.id} class="singleComment">
        <div class="singleCommentTextWrapper">
        <span class="singleCommentCommentOwner">{comment.user.name}</span>
        <span class="singleCommentCommentContent">{comment.comment}</span>
        </div>
        {comment.user.name===localStorage.getItem('auth_name')? <Button color="danger" onClick={e => handleDelete(e)} > Delete</Button>:null}
      </div>
       ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    comments: state.commentReducer,
  };
}

const mapDispatchToProps = {
  getComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComment);
