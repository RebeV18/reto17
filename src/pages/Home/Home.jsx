import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import tasksData from "../../data/TasksBase.json";

export const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify(tasksData));
    }

    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(storedTasks);
    } catch (error) {
      console.error("Error parsing tasks from localStorage", error);
      setTasks([]);
    }
  }, []);

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === "pendiente" ? "completada" : "pendiente" } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    alert("Tarea eliminada o no existe");
  };

  return (
    <>
      <div className="tasks-container">
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <div className="tasks-info" key={t.id}>
              <p>{t.text}</p>
              <div className="btnO-container">
                <button
                  className="btnO"
                  onClick={() => handleCompleteTask(t.id)}
                >
                  {t.status === "pendiente" ? "Pendiente" : "Completada"}
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
        <Link className="btn-create" to={"/create"}>
          Crear tarea
        </Link>
      </div>
    </>
  );
};