import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState(""); // the is initial state

  const onSubmit = async (event) => {
    // this is the post request to our /posts service
    await axios.post("http://posts.com/posts/create", {
      title,
    });
    setTitle(""); // this would blank out the input after submission
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" style={{ marginTop: 10 }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
