import { useState } from "react";
import "./Create.css";
import { Tasks } from "../../data/Tasks";

export const Create = () => {
  const [newtask, setnewtask] = useState("");

  const handleChange = (event) => {
    setnewtask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const exist = Tasks.find((t) => t.text.toLowerCase() === newtask.toLowerCase());
    if (exist) {
      alert("La tarea ya existe");
    }
   else {
      Tasks.push({
        id: Tasks.length + 1,
        text: newtask,
        status: false,
      });
      alert("Tarea creada");
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
          onChange={handleChange}
        />
        <button className="btn-submit" type="submit">
          Crear Tarea
        </button>
      </form>
    </div>
  );
};