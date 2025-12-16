import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function BookUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const url = "http://localhost:3000/";

  const [state, setState] = useState({
    booktitle: "",
    author: "",
    Topic: "",
    formate: "",
    PubYear: 2024
  });

  useEffect(() => {
    axios.get(url + "getbook/" + id)
      .then(res => setState(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(url + "updatebook/" + id, state)
      .then(() => {
        alert("Design updated");
        navigate("/display");
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Update Design</h3>

      <input name="booktitle"
        value={state.booktitle}
        onChange={handleChange}
        placeholder="Design Name"
      />

      <input name="author"
        value={state.author}
        onChange={handleChange}
        placeholder="Designer"
      />

      <input name="Topic"
        value={state.Topic}
        onChange={handleChange}
        placeholder="Fabric / Theme"
      />

      <input name="formate"
        value={state.formate}
        onChange={handleChange}
        placeholder="Collection Type"
      />

      <input type="number"
        name="PubYear"
        value={state.PubYear}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
}