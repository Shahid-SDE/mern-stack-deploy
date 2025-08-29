import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/tasks", { title: newTask });
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Mark task as completed
  const markCompleted = async (id, currentTitle) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        title: currentTitle, // keep old title
        completed: true, // mark as complete
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑️ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ Start editing
  const startEditing = (id, currentTitle) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  // 💾 Save updated task
  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        title: editTitle,
      });
      setEditingId(null);
      setEditTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      {/* Add Task */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center border-b py-2"
            >
              {editingId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => saveEdit(task._id)}
                    className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.title}
                  </span>
                  <div className="flex gap-2">
                    {!task.completed && (
                      <button
                        onClick={() => markCompleted(task._id, task.title)}
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => startEditing(task._id, task.title)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks yet...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
