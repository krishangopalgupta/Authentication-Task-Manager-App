import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Tasks.css"
const url = 'http://localhost:3000'


const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}/auth/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (isEditing) {
        const response = await axios.put(
          `${url}/auth/tasks/${currentTask._id}`,
          currentTask,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(
          tasks.map((task) =>
            task._id === currentTask._id ? response.data : task
          )
        );
      } else {
        const response = await axios.post(
            `${url}/auth/tasks`,
          currentTask,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks([...tasks, response.data]);
      }
      setCurrentTask({ title: "", description: "", status: "pending" });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleDelete = async (_id) => {
    const token = localStorage.getItem("token");
    try {
      const updatedTasks = tasks.filter((task) => task._id !== _id);
      setTasks(updatedTasks);

      await axios.delete(`${url}/auth/tasks/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Task deleted successfully");
    } catch (err) {
      console.error("Error in delete task", err);
      // If error occurs, revert the state update
      setTasks(tasks);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={currentTask.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="description"
          value={currentTask.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">{isEditing ? "Update Task" : "Add Task"}</button>
      </form>
      <ul>
        {tasks.map((task) => {
          const { _id, title, description } = task;
          return (
            <li key={_id}>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <div>
                <button className="edit" onClick={() => handleEdit(task)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(_id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tasks;
