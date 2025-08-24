import { useState } from "react";

interface Task {
  text: string;
  completed: boolean;
  createdAt: Date;
}


export default function App() {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTask = () => {
    if (text.trim() !== "") {
      setTasks([...tasks, { text, completed: false, createdAt: new Date() }]);
      setText("");
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const deleteAll = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const allCount = tasks.length;
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="flex h-screen w-screen justify-center bg-gray-100 text-1xl">
      <div className="flex h-full w-full  flex-col items-center gap-4 p-4">
        <h1 className="text-6xl font-bold bg-gradient-to-tl from-purple-400 to-blue-400 bg-clip-text text-transparent">
          My Tasks
        </h1>
        <p className="text-gray-500">Organize your tasks efficiently</p>

        {/* Input */}
        <div className="flex w-full max-w-2xl flex-row items-center gap-4 rounded-lg bg-white p-6">
          <input
            type="text"
            placeholder="Add a new task..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            value={text}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 rounded-lg bg-gradient-to-tl from-purple-400 to-blue-400 text-white text-3xl font-extrabold hover:from-blue-400 hover:to-purple-400 transition-colors"
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons with counters */}
        <div className="flex flex-row gap-4 items-center justify-start bg-white p-4 rounded-lg">
          <span
            onClick={deleteAll}
            className={"w-[150px] px-4 py-2 rounded-lg cursor-pointer flex justify-between items-center bg-gray-100 text-black hover:bg-gray-200"}
          >
            <span>Clear</span>
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
              {allCount}
            </span>
          </span>

          <span
            onClick={() => setFilter("all")}
            className={`w-[150px] px-4 py-2 rounded-lg cursor-pointer flex justify-between items-center ${filter === "all"
                ? "bg-gradient-to-tl from-purple-400 to-blue-400 text-white font-bold"
                : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
          >
            <span>All</span>
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
              {allCount}
            </span>
          </span>

          <span
            onClick={() => setFilter("active")}
            className={`w-[150px] px-4 py-2 rounded-lg cursor-pointer flex justify-between items-center ${filter === "active"
                ? "bg-gradient-to-tl from-purple-400 to-blue-400 text-white font-bold"
                : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
          >
            <span>Active</span>
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
              {activeCount}
            </span>
          </span>

          <span
            onClick={() => setFilter("completed")}
            className={`w-[150px] px-4 py-2 rounded-lg cursor-pointer flex justify-between items-center ${filter === "completed"
                ? "bg-gradient-to-tl from-purple-400 to-blue-400 text-white font-bold"
                : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
          >
            <span>Completed</span>
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
              {completedCount}
            </span>
          </span>
        </div>




        {/* Task List */}
        <div className="flex flex-col w-full max-w-2xl bg-white rounded-lg p-2 overflow-y-auto max-h-[400px]">
          {filteredTasks.length === 0 ? (
            <div className="flex w-full items-center max-w-2xl flex-col gap-2 rounded-lg bg-white p-6.5 text-gray-400 ">
              <p>You don't have any tasks here</p>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <label
                key={index}
                className="flex w-full max-w-2xl items-center justify-between gap-3 p-4 bg-white rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(tasks.indexOf(task))}
                    className="h-6 w-6 rounded-full border-2 border-gray-300 bg-white appearance-none cursor-pointer checked:border-6 checked:border-green-500"
                  />
                  <div className="flex flex-col">
                    <span
                      className={`text-gray-800 ${task.completed ? "line-through !text-gray-500" : ""}`}
                    >
                      {task.text}
                    </span>
                    <span className={`text-gray-700 text-sm ${task.completed ? "line-through !text-gray-500" : ""}`}>{task.createdAt.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(tasks.indexOf(task))}
                  className="px-3 py-1 rounded-md text-white !bg-red-400 hover:!bg-red-500 transition-colors text-sm"
                >
                  Delete
                </button>
              </label>
            ))
          )}
        </div>

        <div className="flex flex-row w-full justify-evenly items-center max-w-2xl rounded-lg bg-white p-4 text-gray-400">
          <p>{activeCount} Active tasks</p>
          <p>{allCount} Total</p>
          <p>{completedCount} Completed</p>
        </div>

      </div>
    </div>
  );
}
