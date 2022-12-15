import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

export default function Task({ id, task, category, date, complete, update }) {
  let d = new Date(date);
  return (
    <div className="task">
      <p>{category}</p>
      <h5>{task}</h5>
      <small>{`${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`}</small>

      <Button variant="danger" onClick={() => complete(id)}>
        Delete
      </Button>
      <Button variant="warning" onClick={() => update(id)}>
        Update
      </Button>
    </div>
  );
}
