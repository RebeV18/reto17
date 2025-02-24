export const Create = () => {
  return (
    <form id="nuevaTarea" onSubmit={handleCreate}>
      <input
        className="input"
        type="text"
        id="textoTarea"
        placeholder="Escribe la tarea"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="btn" id="submit" type="submit">
        Enviar
      </button>
    </form>
  );
};
