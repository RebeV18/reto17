const fs = require("fs");
const path = require("path");

const tasksPath = path.join(__dirname, "../data/tasks.json");

const readtasks = async () => {
    try {
      const data = await fs.readFileSync(tasksPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error("El archivo tasks.json no existe.");
        return [];
      } else {
        console.error("Error al leer el archivo tasks.json:", error);
        return []; // Devuelve un array vacío en caso de error
      }
    }
  };
  
  const savetasks = async (tasks) => {
    try {
      await fs.writeFileSync(
        tasksPath,
        JSON.stringify(tasks, null, 2),
        "utf8"
      );
      return true; // Indica que la operación fue exitosa
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error("El archivo tasks.json no existe.");
        return false; // <-- Devuelve `false` para mantener consistencia
      } else {
        console.error("Error al salvar el archivo tasks.json:", error);
        return false;
      }
    }
  };
  
  export const gettasks = async (req, res) => {
    try {
      const tasks = await readtasks();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .json("Error ingresando a la base de datos para obtener tareas");
    }
  };
  
  const gettaskPorId = async (id) => {
    try {
      if (isNaN(id)) {
        return res.status(400).json({ mensaje: "ID no válido" });
      }
      const tasks = await readtasks();
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        return res.status(404).json({ mensaje: "Tarea no encontrada" });
      }
      res.json(task);
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .send("Error obteniendo la información de la tarea buscada.");
    }
  };
  
  const createtask = async (text) => {
    try {
      if (!text) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
      }
  
      if (
        typeof text !== "string"
      ) {
        return res.status(400).json({ mensaje: "Tipo de dato no válido" });
      }
  
      const tasks = await readtasks();
      const newTask = {
        id: tasks.length + 1,
        text: text,
        status: "pendiente",
      };
      tasks.push(newTask);
      await savetasks(tasks);
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creando la tarea.");
    }
  };
  
  const deletetask = async (id) => {
    try {
      if (isNaN(id)) {
        return res.status(400).json({ mensaje: "ID no válido" });
      }
      const tasks = await readtasks();
      const index = tasks.findIndex((t) => t.id === id);
      if (index === -1) {
        return res.status(400).json({ mensaje: "Tarea no encontrada" });
      }
      const taskDelete = tasks.splice(index, 1);
      await savetasks(tasks);
      res.json(taskDelete[0]);
    } catch (error) {
      console.error(error);
      res.status(404).send("Error eliminando la tarea.");
    }
  };
  
  const edittask = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ mensaje: "ID no válido" });
      }
      const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, num_huespedes, estado } = req.body;
  
      if (!hotel || !fecha_inicio || !fecha_fin || !tipo_habitacion || !num_huespedes || !estado) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
      }
  
      if (
        isNaN(parseInt(num_huespedes, 10)) ||
        parseInt(num_huespedes, 10) <= 0
      ) {
        return res
          .status(400)
          .json({ mensaje: "num_huespedes debe ser un número entero positivo" });
      }
      if (
        typeof hotel !== "string" ||
        typeof fecha_inicio !== "string" ||
        typeof fecha_fin !== "string" ||
        typeof tipo_habitacion !== "string" ||
        typeof estado !== "string"
      ) {
        return res.status(400).json({ mensaje: "Tipos de datos no válidos" });
      }
  
      const tasks = await readtasks();
      const index = await tasks.findIndex((r) => r.id === id);
      if (index === -1) {
        return res.status(400).json({ mensaje: "task no encontrada" });
      }
      tasks[index] = { ...tasks[index], ...req.body };
      await savetasks(tasks);
      res.json(tasks[index]);
    } catch (error) {
      console.error(error);
      res.status(404).send("Error editando la task.");
    }
  };