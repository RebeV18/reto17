import { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

import { Tasks as initialTasks } from "../../data/Tasks";

export const Home = () => {
  const [tasks, setTasks] = useState(initialTasks);
  console.log(initialTasks);

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("Eliminando tarea");
  };

  return (
    <div className="home-container">
      <div className="tasks_container">
        {tasks.map((t) => (
          <div className="task-container" key={t.id}>
            <p>{t.text}</p>
            <button className="btnO" onClick={() => handleCompleteTask(t.id)}>
              {t.status ? "Pendiente" : "Completada"}
            </button>
            <button className="btnO" onClick={() => handleDelete(t.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <div className="btn-container">
        <Link className="btn-nav" to={"/create"}>
          Crear tarea
        </Link>
        <Link className="btn-nav" to={"/"}>
          Inicio
        </Link>
      </div>
    </div>
  );
};
