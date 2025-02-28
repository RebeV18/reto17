import { useState, useEffect } from "react";
import "./Create.css";

export const Create = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(data);
    } catch (error) {
      console.error("Error parsing tasks from localStorage", error);
      setTasks([]);
    }
  }, []);

  const handleCreate = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existe = tasks.find(t => t.text === newTask);
    if (!existe) {
      const newTaskObj = {
        id: tasks[tasks.length-1].id + 1,
        text: newTask,
        status: "pendiente",
      };
      const updatedTasks = [...tasks, newTaskObj];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask(""); // Limpiar el campo de entrada
      alert("Tarea creada");
    } else {
      alert("La tarea ya existe");
    }
  };

  return (
    <div className="card-container">
      <div className="card">
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
