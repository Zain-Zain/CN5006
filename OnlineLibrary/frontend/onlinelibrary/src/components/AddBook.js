import React, { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const url = "http://localhost:3000/";

  const [state, setState] = useState({
    booktitle: "",
    author: "",
    Topic: "",
    formate: "",
    PubYear: 2024
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(url + "addbooks", state)
      .then(() => alert("Design added"));
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="booktitle" placeholder="Design Name"
        value={state.booktitle} onChange={handleChange} />

      <input name="author" placeholder="Designer"
        value={state.author} onChange={handleChange} />

      <input name="Topic" placeholder="Fabric / Theme"
        value={state.Topic} onChange={handleChange} />

      <input name="formate" placeholder="Collection Type"
        value={state.formate} onChange={handleChange} />

      <input type="number" name="PubYear"
        value={state.PubYear} onChange={handleChange} />

      <button type="submit">Add Design</button>
    </form>
  );
}