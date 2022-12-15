import { React, useState, useEffect } from "react";
import Task from "./components/Task";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

function App() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTemp(tasks);
  }, [tasks]);

  useEffect(() => {
    if (filter === "all") {
      setTemp(tasks);
    } else {
      setTemp(tasks.filter((task) => task.category === filter));
    }
  }, [filter]);

  function createTask(task, category) {
    if (!task > 0 || !category) {
      setMessage("Fill in all fields");
      return;
    }
    let rand = Math.round(Math.random() * 100000);

    const newTask = {
      id: `${rand}${task.slice(0, 3)}${category.slice(0, 2)}`,
      task,
      category,
      date: Date.now(),
    };

    console.log(newTask);

    setMessage("Task created");

    setTasks([...tasks, newTask]);

    console.log(tasks);

    setTask("");
    setCategory("");
  }

  function showTasks(arr) {
    return arr.map((task) => (
      <Task
        key={task.id}
        id={task.id}
        task={task.task}
        category={task.category}
        date={task.date}
        complete={complete}
        update={update}
      />
    ));
  }

  function complete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function update(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          let newTask = prompt("Enter new task");
          return { ...task, task: newTask };
        } else {
          return task;
        }
      })
    );
  }

  return (
    <div className="App">
      <h1>to-do list</h1>

      <Form.Control
        as="textarea"
        rows={2}
        className="create-input"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        type="text"
        placeholder="Write new task here"
      ></Form.Control>

      <div className="create-select">
        <Form.Select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="">Select executor</option>
          <option value="frontend developer">Frontend Developer</option>
          <option value="backend developer">Backend Developer</option>
          <option value="graphic designer">Graphic Designer</option>
        </Form.Select>
      </div>
      <button className="btn info" onClick={() => createTask(task, category)}>
        Add task
      </button>
      <div>
        <br />
        <h6
          style={{ color: message === "Fill in all fields" ? "red" : "green" }}
        >
          {message}
        </h6>
      </div>
      <hr />
      <h3>
        {tasks.length > 0
          ? tasks.length + " task(s) in the list"
          : "Tasks list is empty"}
      </h3>

      <Form.Select
        size="sm"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <option value="All">All</option>
        <option value="frontend developer">Frontend Developer</option>
        <option value="backend developer">Backend Developer</option>
        <option value="graphic designer">Graphic Designer</option>
      </Form.Select>

      {showTasks(temp)}
    </div>
  );
}

export default App;
