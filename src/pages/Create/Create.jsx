import { useState } from "react";
import "./Create.css";
import { Tasks } from "../../data/Tasks";

export const Create = () => {
  const [tasks, setTasks] = useState("");
  const [newtask, setnewtask] = useState("");

  const handleCreate = (event) => {
    setnewtask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existe = tasks.find((task) => task.text === newtask);
    if (!existe) {
      const newTask = {
        id: tasks.length + 1,
        text: newtask,
        status: "pendiente",
      };
      setTasks([...tasks, newTask]);
    } else {
      alert("La tarea ya existe");
    }
  };

  return (
    <div className="container-create">
      <h1>Crear Nueva Tarea</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Digite la nueva tarea"
          type="text"
          value={newtask}
          onChange={handleCreate}
        />
        <button className="btn-submit" type="submit">
          Crear Tarea
        </button>
      </form>
    </div>
  );
};