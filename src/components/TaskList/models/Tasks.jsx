const fs = require("fs");
const path = require("path");
const pathToFile = path.join(__dirname, "data/tasks.json");

class Task {
  constructor() {
    this.tasks = this.getTasks();
  }

  save() {
    fs.writeFileSync(pathToFile, JSON.stringify(this.tasks));
  }

  getTasks() {
    try {
      const tasksBase = fs.readFileSync(pathToFile, "utf-8");
      return tasksBase ? JSON.parse(tasksBase) : [];
    } catch (error) {
      console.error("Error leyendo archivo tasks.json:", error);
      return [];
    }
  }

  getTaskByID(id) {
    const taskFind = this.tasks.find((task) => task.id == id);
    return taskFind;
  }

  createTask(texto) {
    const newTask = {
      id: tasks.length + 1,
      text: texto,
      state: "pendiente"
    };
    this.tasks.push(newTask);
    this.save();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    this.save();
  }

  editTask(id, newData) {
    if (newData.state != "realizada") {
      newData.state = "pendiente";
    }

    this.tasks = this.tasks.map((task) => {
      if (task.id == id) {
        return {
          id,
          ...task,
          ...newData,
        };
      }
      return task;
    });
    this.save();
  }

  completeTask(id) {
    this.tasks = this.tasks.map((task) => {
      if (task.id == id) {
        task.state = "realizada";
      }
      return task;
    });
    this.save();
  }
}

module.exports = Task;
