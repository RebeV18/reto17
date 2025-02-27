import { useState, useEffect } from "react";
import "./Create.css";

export const Create = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(data);
  }, []);

  const handleCreate = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existe = tasks.find((task) => task.text === newTask);
    if (!existe) {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        status: "pendiente",
      };
      const updatedTasks = [...tasks, newTaskObj];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
      alert("Tarea creada");
    } else {
      alert("La tarea ya existe");
    }
  };

  return (
    <div>
      <div className="container-create">
        <h1>Crear Nueva Tarea</h1>
        <form className="form-cont" onSubmit={handleSubmit}>
          <input
            placeholder="Digite la nueva tarea"
            type="text"
            value={newTask}
            onChange={handleCreate}
          />
          <button className="btn-submit" type="submit">
            Crear Tarea
          </button>
        </form>
      </div>
    </div>
  );
};
