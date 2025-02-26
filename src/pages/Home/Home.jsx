import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log("Eliminando tarea");
  };

  return (
    <div className="home-container">
      <div className="tasks_container">
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <div className="task-container" key={t.id}>
              <p>{t.text}</p>
              <div className="btnO-container">
                <button className="btnO" onClick={() => handleCompleteTask(t.id)}>
                  {t.status ? "Pendiente" : "Completada"}
                </button>
                <button className="btnO" onClick={() => handleDelete(t.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay tareas disponibles</p>
        )}
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