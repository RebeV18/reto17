import { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

import { Tasks as initialTasks } from "../../data/Tasks/Tasks";

export const TaskList = () => {
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
    <>
      <div className="container">
        {tasks.map((t) => (
          <div key={t.id}>
            <p>{t.text}</p>
            <button onClick={() => handleCompleteTask(t.id)}>
              {t.status ? "Pendiente" : "Completada"}
            </button>
            <button onClick={() => handleDelete(t.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <Link to={'/create'}>Crear tarea</Link>
    </>
  );
};