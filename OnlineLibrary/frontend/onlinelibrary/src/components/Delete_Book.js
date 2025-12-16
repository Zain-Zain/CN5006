import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DeleteBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const url = "http://localhost:3000/";

  useEffect(() => {
    axios.post(url + "deleteBook/" + id)
      .then(() => {
        alert("Design deleted");
        navigate("/display");
      })
      .catch(err => console.log(err));
  }, [id]);

  return <p>Deleting design...</p>;
}